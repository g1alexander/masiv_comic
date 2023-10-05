interface Response<T> {
  status: number
  statusText: string
  data: T
}

export const xkcdApi = () => {
  const get = async <T>(url: string): Promise<Response<T>> => {
    try {
      const response = await fetch(`${process.env.VITE_APP_SERVER}${url}`, {
        method: 'GET'
      }).then(async (res) => ({
        status: res.status,
        statusText: res.statusText,
        data: await res.json()
      }))

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
      const response = await fetch(`${process.env.VITE_APP_SERVER}${url}`, {
        method: 'PUT',
        body: data
      }).then(async (res) => ({
        status: res.status,
        statusText: res.statusText,
        data: await res.json()
      }))

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
      const response = await fetch(`${process.env.VITE_APP_SERVER}${url}`, {
        method: 'POST',
        body: data
      }).then(async (res) => ({
        status: res.status,
        statusText: res.statusText,
        data: await res.json()
      }))

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
      const response = await fetch(`${process.env.VITE_APP_SERVER}${url}`, {
        method: 'DELETE',
        body: data
      }).then(async (res) => ({
        status: res.status,
        statusText: res.statusText,
        data: await res.json()
      }))

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
