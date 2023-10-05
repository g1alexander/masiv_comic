export interface Response<T> {
  status: number
  statusText: string
  data: T
}

interface Payload {
  url: string
  method: string
  body?: BodyInit
}

export async function fetchApi<T>(payload: Payload): Promise<Response<T>> {
  const init: RequestInit = {
    method: payload.method
  }

  if (payload.body) {
    init.body = payload.body
  }

  const response = await fetch(payload.url, init).then(async (res) => ({
    status: res.status,
    statusText: res.statusText,
    data: await res.json()
  }))

  return response
}
