// lib/api.js
import axios from "axios";
import { getSession } from "next-auth/react";

// Browser-only API client with session interceptor
export const apiBrowser = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
});

// Request interceptor for browser client only
apiBrowser.interceptors.request.use(
  async (config) => {
    // Only run getSession on the client
    if (typeof window !== "undefined") {
      const session = await getSession();
      if (session?.accessToken) {
        config.headers.Authorization = `Bearer ${session.accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiBrowser.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.error("Unauthorized request:", error.response.data);
    }
    return Promise.reject(error);
  }
);

// Server API factory function - creates instance with token
export function createServerApi(accessToken) {
  const serverApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL,
    timeout: 10000,
  });

  if (accessToken) {
    serverApi.interceptors.request.use((config) => {
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    });
  }

  return {
    get: (url, config = {}) => serverApi.get(url, config),
    post: (url, data = {}, config = {}) => serverApi.post(url, data, config),
    put: (url, data = {}, config = {}) => serverApi.put(url, data, config),
    patch: (url, data = {}, config = {}) => serverApi.patch(url, data, config),
    delete: (url, config = {}) => serverApi.delete(url, config),
  };
}

// Browser API helper functions
export const api = {
  get: (url, config = {}) => apiBrowser.get(url, config),
  post: (url, data = {}, config = {}) => apiBrowser.post(url, data, config),
  put: (url, data = {}, config = {}) => apiBrowser.put(url, data, config),
  patch: (url, data = {}, config = {}) => apiBrowser.patch(url, data, config),
  delete: (url, config = {}) => apiBrowser.delete(url, config),
};

// Export browser client as default for backward compatibility
export default apiBrowser;
