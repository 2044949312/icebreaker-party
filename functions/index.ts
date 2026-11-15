// Sites Edge Function 入口。_qoder/backend.mjs 由平台在部署时注入，本地不要创建这个目录。
import { createDatabaseClient, createSiteContext, errorResponse, BackendError } from './_qoder/backend.mjs'
import { application } from './application.mjs'

const handle = application({ db: createDatabaseClient(), BackendError })

Deno.serve(async (request) => {
  let context
  try {
    context = createSiteContext(request)
    return await handle(context)
  } catch (error) {
    return errorResponse(error, context?.requestId)
  }
})
