import { APIFunction } from 'types'
import { getLocalStorageItem } from 'utils'
export const BASE_URL = `https://api.prizen.in/api`
// export const BASE_URL = `http://192.168.29.62:8080/api`
const authToken = getLocalStorageItem('CghRefreshToken')
const accessToken = getLocalStorageItem('CghAccessToken')

export const post: APIFunction = async ({
  path,
  body = {},
  method = 'POST',
  options = {},
  headers = {},
  token = '',
  isImage,
}) => {
  if (!isImage) {
    headers['Content-Type'] = 'application/json'
  }
  headers.Authorization = `Bearer ${accessToken}`
  try {
    const API_OPTIONS = {
      method,
      headers,
      body,
      ...options,
    }

    const response = await fetch(`${BASE_URL}/${path}`, API_OPTIONS)
    const json = await response.json()
    if (response?.status === 401) {
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

      headers.Authorization = `$Bearer ${getResponseData?.ACCESS_TOKEN}`
      const response = await fetch(`${BASE_URL}/${path}`, API_OPTIONS)

      const json = await response.json()
      return {
        ...json,
        data: json?.data,
        status: response?.status,
        error: json?.error,
      }
    }

    return {
      ...json,
      data: json?.data,
      status: response.status,
      error: json?.error,
    }
  } catch (error: any) {
    return { error }
  }
}
export const put: APIFunction = async ({
  path,
  body = JSON.stringify({}),
  method = 'PUT',
  options = {},
  headers = {},
  token = '',
  isImage,
}) => {
  headers.Authorization = `Bearer ${accessToken}`
  if (!isImage) {
    headers['Content-Type'] = 'application/json'
  }
  try {
    const API_OPTIONS = {
      method,
      headers,
      body,
      ...options,
    }
    //
    const response = await fetch(`${BASE_URL}/${path}`, API_OPTIONS)
    const json = await response.json()
    if (response?.status === 401) {
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
      if (token)
        headers.Authorization = `$Bearer ${getResponseData?.ACCESS_TOKEN}`
      const response = await fetch(`${BASE_URL}/${path}`, API_OPTIONS)
      const json = await response.json()

      return {
        ...json,
        data: json?.data,
        status: response?.status,
        error: json?.error,
      }
    }

    return {
      ...json,
      data: json?.data,
      status: response.status,
      error: json?.error,
    }
  } catch (error: any) {
    return { error }
  }
}
export const remove: APIFunction = async ({
  path,
  body = JSON.stringify({}),
  method = 'DELETE',
  options = {},
  headers = { 'Content-Type': 'application/json' },
  token = '',
  isImage,
}) => {
  headers.Authorization = `Bearer ${accessToken}`
  if (!isImage) {
    headers['Content-Type'] = 'application/json'
  }
  try {
    const API_OPTIONS = {
      method,
      headers,
      body,
      ...options,
    }
    const response = await fetch(`${BASE_URL}/${path}`, API_OPTIONS)
    const json = await response.json()
    if (response?.status === 401) {
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

      if (token)
        headers.Authorization = `$Bearer ${getResponseData?.ACCESS_TOKEN}`
      const response = await fetch(`${BASE_URL}/${path}`, API_OPTIONS)

      const json = await response.json()

      return {
        ...json,
        data: json?.data,
        status: response?.status,
        error: json?.error,
      }
    }

    return {
      ...json,
      data: json?.data,
      status: response.status,
      error: json?.error,
    }
  } catch (error: any) {
    return { error }
  }
}
export { default as END_POINTS } from './end-points'
