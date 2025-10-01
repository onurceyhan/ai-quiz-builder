import apiClient from './api.js'
import axios from 'axios'

export const quizService = {
  // Kullanıcının tüm quizlerini al
  async getUserQuizzes() {
    try {
      console.log('QuizService: Fetching user quizzes...')
      const response = await apiClient.get('/quizzes/')
      console.log('QuizService: Raw response:', response.data)

      // Backend response format kontrolü
      const data = response.data
      let quizzes = []

      if (data && Array.isArray(data.quizzes)) {
        quizzes = data.quizzes
      } else if (Array.isArray(data)) {
        // Eğer response direkt array ise
        quizzes = data
      } else {
        console.warn('Unexpected response format:', data)
        quizzes = []
      }

      console.log('QuizService: Processed quizzes:', quizzes.length, 'items')

      return {
        success: true,
        data: {
          quizzes: quizzes,
          total: data?.total || quizzes.length
        }
      }
    } catch (error) {
      console.error('QuizService: Get quizzes error:', error)

      // Detaylı hata analizi
      if (error.response) {
        console.error('Response error:', error.response.status, error.response.data)
        return {
          success: false,
          error: `HTTP ${error.response.status}: ${error.response.data?.detail || error.response.statusText}`
        }
      } else if (error.request) {
        console.error('Network error:', error.request)
        return {
          success: false,
          error: 'Ağ bağlantısı hatası'
        }
      } else {
        console.error('Unknown error:', error.message)
        return {
          success: false,
          error: error.message || 'Bilinmeyen hata'
        }
      }
    }
  },

  // Belirli bir quiz'i al (detaylarıyla birlikte)
  async getQuiz(quizId) {
    try {
      const response = await apiClient.get(`/quizzes/${quizId}`)
      return {
        success: true,
        data: response.data
      }
    } catch (error) {
      console.error('Get quiz error:', error)
      return {
        success: false,
        error: error.response?.data?.detail || 'Quiz bulunamadı'
      }
    }
  },

  // Yeni quiz oluştur (AI ile)
  async createQuiz(quizData, cancelToken = null) {
    try {
      console.log('QuizService: Quiz oluşturma isteği gönderiliyor...', quizData)
      const response = await apiClient.post('/quizzes/', quizData, {
        cancelToken: cancelToken?.token
      })
      console.log('QuizService: Backend yanıtı alındı:', response.data)

      return {
        success: true,
        data: response.data
      }
          } catch (error) {
        console.error('QuizService: Create quiz error:', error)

        // İptal edilmiş istek kontrolü
        if (axios.isCancel(error)) {
          return {
            success: false,
            error: 'İşlem iptal edildi'
          }
        }

        // Detaylı hata analizi
        if (error.code === 'ECONNABORTED') {
          return {
            success: false,
            error: 'Zaman aşımı: Quiz oluşturma çok uzun sürdü. Lütfen tekrar deneyin.'
          }
        } else if (error.response) {
        // Backend hatası
        const errorMsg = error.response.data?.detail || `HTTP ${error.response.status}: ${error.response.statusText}`
        return {
          success: false,
          error: errorMsg
        }
      } else if (error.request) {
        // Network hatası
        return {
          success: false,
          error: 'Bağlantı hatası: Backend sunucusuna ulaşılamadı'
        }
      } else {
        return {
          success: false,
          error: `Quiz oluşturma hatası: ${error.message}`
        }
      }
    }
  },

  // AI ile quiz oluştur (özel endpoint)
  async generateQuiz(generationData) {
    try {
      const response = await apiClient.post('/quizzes/generate', generationData)
      return {
        success: true,
        data: response.data
      }
    } catch (error) {
      console.error('Generate quiz error:', error)
      return {
        success: false,
        error: error.response?.data?.detail || 'Quiz oluşturulamadı'
      }
    }
  },

  // Quiz güncelle
  async updateQuiz(quizId, quizData) {
    try {
      const response = await apiClient.put(`/quizzes/${quizId}`, quizData)
      return {
        success: true,
        data: response.data
      }
    } catch (error) {
      console.error('Update quiz error:', error)
      return {
        success: false,
        error: error.response?.data?.detail || 'Quiz güncellenemedi'
      }
    }
  },

  // Quiz sil
  async deleteQuiz(quizId) {
    try {
      const response = await apiClient.delete(`/quizzes/${quizId}`)
      return {
        success: true,
        data: response.data
      }
    } catch (error) {
      console.error('Delete quiz error:', error)
      return {
        success: false,
        error: error.response?.data?.detail || 'Quiz silinemedi'
      }
    }
  }
}
