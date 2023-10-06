import { fetchApi, type Response } from './fetch/fetchApi'

export const xkcdApi = () => {
  const get = async <T>(url: string): Promise<Response<T>> => {
    try {
      const response = await fetchApi<T>({
        url: `${process.env.VITE_APP_SERVER}${url}`,
        method: 'GET'
      })

      return response
    } catch (error) {
      const err = error as { message: string }
      return {
        status: 400,
        statusText: err.message,
        data: err.message as T
      }
    }
  }

  const put = async <T>(url: string, data: string): Promise<Response<T>> => {
    try {
      const response = await fetchApi<T>({
        url: `${process.env.VITE_APP_SERVER}${url}`,
        method: 'PUT',
        body: data
      })

      return response
    } catch (error) {
      const err = error as { message: string }
      return {
        status: 400,
        statusText: err.message,
        data: err.message as T
      }
    }
  }

  const post = async <T>(url: string, data: string): Promise<Response<T>> => {
    try {
      const response = await fetchApi<T>({
        url: `${process.env.VITE_APP_SERVER}${url}`,
        method: 'POST',
        body: data
      })

      return response
    } catch (error) {
      const err = error as { message: string }
      return {
        status: 400,
        statusText: err.message,
        data: err.message as T
      }
    }
  }

  const remove = async <T>(url: string, data: string): Promise<Response<T>> => {
    try {
      const response = await fetchApi<T>({
        url: `${process.env.VITE_APP_SERVER}${url}`,
        method: 'DELETE',
        body: data
      })

      return response
    } catch (error) {
      const err = error as { message: string }
      return {
        status: 400,
        statusText: err.message,
        data: err.message as T
      }
    }
  }

  return {
    get,
    put,
    post,
    remove
  }
}
