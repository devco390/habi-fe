import axios from 'axios'

const contentAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setConfig = (config: any) => {
  config.headers = {
    ...config.headers,
    'Content-Type': 'application/json'
  }
  return config
}

contentAPI.interceptors.request.use(setConfig)

export default contentAPI
