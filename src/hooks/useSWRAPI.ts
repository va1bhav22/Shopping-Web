import { BASE_URL } from 'api'
import useSWR from 'swr'
import { getLocalStorageItem } from 'utils'
const authToken = getLocalStorageItem('CghRefreshToken')
const accessToken = getLocalStorageItem('CghAccessToken')
const useSWRAPI = (url: string | null, options?: any) => {
  const fetcher = async (url: string, options?: any) => {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
    if (res?.status === 401) {
      const getResponse = await fetch(`${BASE_URL}/auth/get-access-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          refresh_token: authToken,
        }),
      })
      const getResponseData = await getResponse.json()
      const res = await fetch(`${url}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getResponseData?.ACCESS_TOKEN}`,
        },
      })
      const data = await res.json()
      return { data, res }
    }
    const data = await res.json()
    return { data, res }
  }

  const { data, error, mutate, isValidating } = useSWR(
    url ? [`${BASE_URL}/${url}`, options] : null,
    fetcher,
    {
      ...options,
      errorRetryCount: options?.errorRetryCount || 1,
      revalidateOnFocus: options?.revalidateOnFocus || false,
    }
  )
  return {
    data,
    error,
    isValidating,
    mutate,
  }
}
export default useSWRAPI
