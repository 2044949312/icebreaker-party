import { useEffect, useState } from 'react'
import { fetchShareBase } from '../api'

/** 服务端算出来的「别的设备真能打开的地址」，null 表示沿用当前来源 */
export function useShareBase(): string | null {
  const [base, setBase] = useState<string | null>(null)
  useEffect(() => {
    let alive = true
    void fetchShareBase().then((b) => {
      if (alive && b) setBase(b)
    })
    return () => {
      alive = false
    }
  }, [])
  return base
}
