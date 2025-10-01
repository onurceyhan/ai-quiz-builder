import axios from 'axios'

// API Base URL - Backend'imiz 8000 portunda çalışıyor
const API_BASE_URL = 'http://localhost:8000/api'

// Axios instance oluşturuyoruz
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, // 60 saniye - AI quiz oluşturma için uzun timeout
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request cancellation helper
export const createCancelToken = () => {
  return axios.CancelToken.source()
}

// Request interceptor - Her istekte token eklemek için
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor - Token süresi dolmuşsa otomatik logout
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token geçersiz veya süresi dolmuş
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_data')
      // Ana sayfaya yönlendir
      if (window.location.pathname !== '/') {
        window.location.href = '/'
      }
    }
    return Promise.reject(error)
  }
)

export default apiClient
