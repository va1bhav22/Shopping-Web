import { BASE_URL } from 'api'

export default async function getInvoice(Id: string): Promise<string> {
  try {
    const ACCESS_TOKEN = localStorage.getItem('CghAccessToken')
    const REFRESH_TOKEN = localStorage.getItem('CghRefreshToken')
    const options: RequestInit = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }
    const response = await fetch(`${BASE_URL}/invoice/${Id}`, options)
    if (response?.status === 401) {
      const getAccessTokenRes = await fetch(
        BASE_URL + '/auth/get-access-token',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ refresh_token: REFRESH_TOKEN }),
        }
      )
      console.log('GET-TOKEN-STATUS', getAccessTokenRes.status)
      if (getAccessTokenRes.status === 401) {
        localStorage.clear()
        window.location.reload()
        return 'logging out'
      }
      const getAccessTokenResData = await getAccessTokenRes.json()
      getAccessTokenResData?.ACCESS_TOKEN &&
        localStorage.setItem(
          'CghAccessToken',
          getAccessTokenResData?.ACCESS_TOKEN
        )
      getAccessTokenResData?.REFRESH_TOKEN &&
        localStorage.setItem(
          'CghRefreshToken',
          getAccessTokenResData?.REFRESH_TOKEN
        )
      return await getInvoice(Id)
    }
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    return url
  } catch (error) {
    const err = error as Error
    console.log({ err })
    return err?.message
  }
}
