import { BASE_URL, END_POINTS } from 'api'
import { useCallback, useEffect, useState } from 'react'
import useAuth from './useAuth'
import useIsMounted from './useIsMounted'

type GetPaths = keyof ReturnType<typeof END_POINTS.get>

type GetType = {
  path: GetPaths
  headers?: { [key: string]: string }
  options?: RequestInit
  token?: string
}

export default <TResponse>(path?: GetPaths) => {
  const [isLoading, setIsLoading] = useState(false)
  const isMounted = useIsMounted()
  const [data, setData] = useState<{
    results: TResponse
    [key: string]: any
  }>()
  const [fetchAgain, setFetchAgain] = useState(true)
  const { user } = useAuth((state) => state)

  const get = useCallback(
    async ({
      path,
      options = {},
      headers = { 'Content-Type': 'application/json' },
      token = user?.token || '',
    }: GetType) => {
      if (token) headers.Authorization = `Bearer ${token}`
      try {
        isMounted.current && setIsLoading(true)
        const API_OPTIONS = { headers, ...options }
        const response = await fetch(
          `${BASE_URL}/${END_POINTS.get(user)[path]}`,
          API_OPTIONS
        )
        const json = await response.json()
        return {
          ...json,
          data: json?.success?.data?.results || json?.success?.data,
          status: response.status,
          error: json?.error,
        }
      } catch (error: any) {
        return { error }
      } finally {
        isMounted.current && setIsLoading(false)
      }
    },
    [isMounted]
  )

  const fetchData = useCallback(async () => {
    if (!path) return
    try {
      const result = await get({ path })
      const updatedData = {
        ...result,
        results: result?.data as TResponse,
      }
      isMounted.current && setData(updatedData)
      isMounted.current && setFetchAgain(false)
    } catch (error) {
      console.log(error)
    }
  }, [path, get, isMounted])

  const refetch = useCallback(() => {
    isMounted.current && setFetchAgain(true)
  }, [isMounted])

  useEffect(() => {
    fetchAgain && fetchData()
  }, [fetchData, fetchAgain])

  return { isLoading, get, data, refetch }
}
