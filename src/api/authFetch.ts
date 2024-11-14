import { BASE_URL } from 'api'

export interface fetchURLProps {
  path: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  body?: BodyInit
  isFormData?: boolean
}

export default async function authFetch({
  path,
  method = 'GET',
  body,
  isFormData = false,
}: fetchURLProps): Promise<{
  data: any
  message: string
  error?: string
}> {
  try {
    const ACCESS_TOKEN = localStorage?.getItem('CghAccessToken')
    const REFRESH_TOKEN = localStorage?.getItem('CghRefreshToken')
    const options: RequestInit = {
      method: method,
      headers: isFormData
        ? {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          }
        : {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
      body: body,
    }
    !body && delete options?.body
    const response = await fetch(`${BASE_URL}/${path}`, options)
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
        localStorage?.clear()
        window.location.reload()
        return {
          error: 'logging out',
          data: null,
          message: 'logging out',
        }
      }
      const getAccessTokenResData = await getAccessTokenRes.json()
      getAccessTokenResData?.ACCESS_TOKEN &&
        localStorage?.setItem(
          'CghAccessToken',
          getAccessTokenResData?.ACCESS_TOKEN
        )
      getAccessTokenResData?.REFRESH_TOKEN &&
        localStorage?.setItem(
          'CghRefreshToken',
          getAccessTokenResData?.REFRESH_TOKEN
        )
      return await authFetch({ path, method, body, isFormData })
    }
    const responseData = await response.json()
    responseData?.ACCESS_TOKEN &&
      localStorage?.setItem('CghAccessToken', responseData?.ACCESS_TOKEN)
    responseData?.REFRESH_TOKEN &&
      localStorage?.setItem('CghRefreshToken', responseData?.REFRESH_TOKEN)
    return responseData
  } catch (error) {
    const err = error as Error
    return { error: err?.message, data: null, message: '' }
  }
}

export async function authFetchServer({
  path,
  method = 'GET',
  body,
  isFormData = false,
}: fetchURLProps): Promise<{
  data: any
  message: string
  error?: string
}> {
  try {
    const options: RequestInit = {
      method: method,
      headers: {
        'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
      },
      body: body,
    }
    !body && delete options?.body
    const response = await fetch(`${BASE_URL}/${path}`, options)
    const responseData = await response.json()
    return responseData
  } catch (error) {
    const err = error as Error
    return { error: err?.message, data: null, message: '' }
  }
}
