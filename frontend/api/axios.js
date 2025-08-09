// lib/api.js
import axios from 'axios'
import { getSession } from "next-auth/react"

// Create axios instance
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
})

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  async (config) => {
    const session = await getSession()
    
    if (session?.accessToken) {
      config.headers.Authorization = `Bearer ${session.accessToken}`
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token might be expired, you could trigger a refresh here
      console.error('Unauthorized request:', error.response.data)
    }
    
    return Promise.reject(error)
  }
)

// API helper functions
export const api = {
  get: (url, config = {}) => 
    apiClient.get(url, config),
  
  post: (url, data = {}, config = {}) =>
    apiClient.post(url, data, config),
    
  put: (url, data = {}, config = {}) =>
    apiClient.put(url, data, config),
    
  patch: (url, data = {}, config = {}) =>
    apiClient.patch(url, data, config),
    
  delete: (url, config = {}) =>
    apiClient.delete(url, config),
}

export default apiClient
