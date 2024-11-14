import authFetch, { fetchURLProps } from 'api/authFetch'
import { useEffect, useRef, useState } from 'react'

export default (
  PropsOne?: fetchURLProps,
  PropsTwo?: { isAutoFetch?: boolean }
) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [data, setData] = useState<any>(null)
  const IsMounted = useRef(true)
  const mutate = async ({
    path,
    method,
    body,
    isFormData,
  }: fetchURLProps): Promise<{
    data: any
    message: string
    error?: string
  }> => {
    try {
      setIsLoading(true)
      setData(null)
      const resData = await authFetch({
        path,
        method,
        body,
        isFormData,
      })
      if (resData.error) {
        IsMounted.current && setError(resData.error)
      }
      if (resData.data) {
        IsMounted.current && setData(resData.data)
      }
      return resData
    } catch (error) {
      const err = error as Error
      IsMounted.current && setError(err.message)
      return {
        error: err.message,
        data: null,
        message: err.message,
      }
    } finally {
      IsMounted.current && setIsLoading(false)
    }
  }
  useEffect(() => {
    IsMounted.current = true
    if (PropsTwo?.isAutoFetch && IsMounted.current && PropsOne?.path) {
      setIsLoading(true)
      setData(null)
      mutate({
        path: PropsOne?.path as string,
        method: PropsOne?.method,
        body: PropsOne?.body,
        isFormData: PropsOne?.isFormData,
      })
    }
    return () => {
      IsMounted.current = false
    }
  }),
    [PropsOne?.path, PropsOne?.method, PropsOne?.body, PropsOne?.isFormData]

  return { isLoading, error, data, mutate }
}
