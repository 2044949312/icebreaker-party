/**
 * 本地假数据库：只实现 dbStore 用到的那几个查询，行为尽量贴近 PostgREST。
 * 每次读写都 JSON 往返一次，模拟 jsonb 列没有对象引用的语义。
 */
const clone = (x) => JSON.parse(JSON.stringify(x ?? null))

export class FakeBackendError extends Error {
  constructor(code, status) {
    super(code)
    this.code = code
    this.status = status
  }
}

export function fakeDb() {
  const tables = new Map()
  const rowsOf = (name) => {
    if (!tables.has(name)) tables.set(name, [])
    return tables.get(name)
  }

  const project = (row, cols) => {
    if (!cols || cols === '*') return clone(row)
    const out = {}
    for (const key of cols.split(',').map((c) => c.trim())) out[key] = clone(row[key])
    return out
  }

  const matches = (row, filters) =>
    filters.every(([col, op, value]) =>
      op === 'eq' ? row[col] === value : op === 'lt' ? String(row[col]) < String(value) : true,
    )

  function run(state) {
    const rows = rowsOf(state.table)
    if (state.op === 'insert' || state.op === 'insertIfAbsent') {
      const pk = state.onConflict?.split(',')[0]?.trim() ?? ('code' in (state.patch ?? {}) ? 'code' : 'id')
      if (rows.some((r) => r[pk] === state.patch[pk])) {
        // 真 SDK：insertIfAbsent 撞唯一键返回空数组，insert 撞唯一键报 database_conflict
        if (state.op === 'insertIfAbsent') return { data: [], error: null }
        return { data: [], error: { code: 'database_conflict', status: 409, message: 'duplicate key' } }
      }
      const row = clone(state.patch)
      rows.push(row)
      return { data: [project(row, state.cols)], error: null }
    }
    const hit = rows.filter((r) => matches(r, state.filters))
    if (state.op === 'delete') {
      for (const r of hit) rows.splice(rows.indexOf(r), 1)
      return { data: hit.map((r) => project(r, state.cols)), error: null }
    }
    if (state.op === 'update') {
      if (!state.filters.length) return { data: [], error: { code: 'no_filter', message: 'refusing to update all rows' } }
      for (const r of hit) Object.assign(r, clone(state.patch))
      return { data: hit.map((r) => project(r, state.cols)), error: null }
    }
    let data = hit.map((r) => project(r, state.cols))
    if (state.maxRows !== undefined) data = data.slice(0, state.maxRows)
    if (state.wantsCount) return { data, count: hit.length, error: null }
    return { data, error: null }
  }

  const query = (table, op, patch, onConflict) => {
    const state = { table, op, patch, onConflict, filters: [], cols: '', wantsCount: false, maxRows: undefined }
    const api = {
      select(cols, opts) {
        state.cols = cols
        if (opts?.count === 'exact') state.wantsCount = true
        return api
      },
      eq(col, value) {
        state.filters.push([col, 'eq', value])
        return api
      },
      lt(col, value) {
        state.filters.push([col, 'lt', value])
        return api
      },
      limit(n) {
        state.maxRows = n
        return api
      },
      then: (resolve, reject) => Promise.resolve(run(state)).then(resolve, reject),
      catch: (fn) => Promise.resolve(run(state)).catch(fn),
    }
    return api
  }

  return {
    from(name) {
      return {
        select: (cols, opts) => query(name, 'select').select(cols, opts),
        insert: (row) => query(name, 'insert', row),
        insertIfAbsent: (row, opts) => query(name, 'insertIfAbsent', row, String(opts?.onConflict ?? '')),
        update: (patch) => query(name, 'update', patch),
        delete: () => query(name, 'delete'),
      }
    },
    /** 测试用：直接看表里的原始行 */
    dump: (name) => rowsOf(name),
  }
}
