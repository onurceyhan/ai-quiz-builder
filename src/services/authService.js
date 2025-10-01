import apiClient from './api.js'

export const authService = {
  // Kullanıcı kaydı
  async register(userData) {
    try {
      const response = await apiClient.post('/auth/register', userData)
      const { access_token } = response.data

      // Token'ı localStorage'a kaydet
      localStorage.setItem('auth_token', access_token)

      // Kullanıcı bilgilerini al ve kaydet
      const userInfo = await this.getCurrentUser()

      return {
        success: true,
        token: access_token,
        user: userInfo
      }
    } catch (error) {
      console.error('Registration error:', error)
      return {
        success: false,
        error: error.response?.data?.detail || 'Kayıt işlemi başarısız'
      }
    }
  },

  // Kullanıcı girişi
  async login(credentials) {
    try {
      const response = await apiClient.post('/auth/login', credentials)
      const { access_token } = response.data

      // Token'ı localStorage'a kaydet
      localStorage.setItem('auth_token', access_token)

      // Kullanıcı bilgilerini al ve kaydet
      const userInfo = await this.getCurrentUser()

      return {
        success: true,
        token: access_token,
        user: userInfo
      }
    } catch (error) {
      console.error('Login error:', error)
      return {
        success: false,
        error: error.response?.data?.detail || 'Giriş işlemi başarısız'
      }
    }
  },

  // Google OAuth girişi (gelecekte implementasyonu)
  async googleAuth(token) {
    try {
      const response = await apiClient.post('/auth/google', { token })
      const { access_token } = response.data

      localStorage.setItem('auth_token', access_token)
      const userInfo = await this.getCurrentUser()

      return {
        success: true,
        token: access_token,
        user: userInfo
      }
    } catch (error) {
      console.error('Google auth error:', error)
      return {
        success: false,
        error: error.response?.data?.detail || 'Google girişi başarısız'
      }
    }
  },

  // Mevcut kullanıcı bilgilerini al
  async getCurrentUser() {
    try {
      const response = await apiClient.get('/auth/me')
      const userData = response.data

      // Kullanıcı verilerini localStorage'a kaydet
      localStorage.setItem('user_data', JSON.stringify(userData))

      return userData
    } catch (error) {
      console.error('Get current user error:', error)
      throw error
    }
  },

  // Çıkış yap
  async logout() {
    try {
      await apiClient.post('/auth/logout')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      // Her durumda local storage'ı temizle
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_data')
    }
  },

  // Kullanıcının giriş yapıp yapmadığını kontrol et
  isAuthenticated() {
    const token = localStorage.getItem('auth_token')
    const userData = localStorage.getItem('user_data')
    return !!(token && userData)
  },

  // Saklanan kullanıcı verilerini al
  getStoredUser() {
    const userData = localStorage.getItem('user_data')
    return userData ? JSON.parse(userData) : null
  },

  // Token'ı al
  getToken() {
    return localStorage.getItem('auth_token')
  }
}
