<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="container mx-auto px-6 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-3">
            <a href="/landing"><img src="/logo.svg" alt="AI Quiz Builder" class="w-8 h-8"></a>
            <a href="/landing"><h1 class="text-2xl font-bold text-gray-900">Quiz Yöneticisi</h1></a>
          </div>
          <div class="flex items-center gap-4">
            <span class="text-gray-600">
              {{ currentUser ? `Hoş geldiniz, ${currentUser.name}!` : 'Hoş geldiniz!' }}
            </span>
            <button
              @click="handleLogout"
              class="text-blue-600 hover:text-blue-700 font-medium"
            >
              Çıkış
            </button>
          </div>
        </div>
      </div>
    </header>

    <div class="container mx-auto px-6 py-8">
      <!-- Error Message -->
      <div v-if="errorMessage" class="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
        {{ errorMessage }}
      </div>

      <!-- Loading Indicator -->
      <div v-if="isLoading" class="mb-6 p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded-lg">
        Quizler yükleniyor...
      </div>

      <!-- Quiz Creation Section -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Yeni Quiz Oluştur</h2>

        <form @submit.prevent="createQuiz" class="space-y-4">
          <!-- Quiz Title -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Quiz Başlığı</label>
            <input
              v-model="newQuiz.title"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              placeholder="Örn: Matematik Temel Kavramlar"
            />
          </div>

          <!-- AI Prompt -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">AI Prompt (Quiz Konusu)</label>
            <textarea
              v-model="newQuiz.prompt"
              rows="4"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              placeholder="Örn: Lise seviyesinde matematik konularından cebir, geometri ve trigonometri üzerine 10 soruluk bir quiz oluştur..."
            ></textarea>
          </div>

          <!-- Quiz Settings -->
          <div class="grid md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Soru Sayısı</label>
              <select
                v-model="newQuiz.questionCount"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              >
                <option value="5">5 Soru</option>
                <option value="10">10 Soru</option>
                <option value="15">15 Soru</option>
                <option value="20">20 Soru</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Zorluk Seviyesi</label>
              <select
                v-model="newQuiz.difficulty"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              >
                <option value="easy">Kolay</option>
                <option value="medium">Orta</option>
                <option value="hard">Zor</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
              <input
                v-model="newQuiz.category"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                placeholder="Örn: Matematik"
              />
            </div>
          </div>

          <!-- Submit Button -->
          <div class="flex justify-end">
            <div class="flex gap-3">
              <button
                type="submit"
                :disabled="isGenerating"
                class="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2"
              >
                <svg v-if="isGenerating" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ isGenerating ? 'AI Quiz Hazırlıyor... (30-60 saniye sürebilir)' : '🤖 AI ile Quiz Oluştur' }}
              </button>

              <!-- Cancel button -->
              <button
                v-if="isGenerating"
                type="button"
                @click="cancelAllRequests"
                class="bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center gap-2"
                title="İşlemi iptal et"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
                İptal
              </button>
            </div>
          </div>
        </form>
      </div>

      <!-- Quiz List -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 class="text-xl font-semibold text-gray-900">Quizlerim</h2>

          <!-- Refresh Button -->
          <button
            @click="loadQuizzes(true)"
            :disabled="isLoading"
            class="flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:cursor-not-allowed text-gray-700 rounded-lg transition duration-200"
            title="Quiz listesini yenile"
          >
            <svg
              class="w-4 h-4 transition-transform duration-200"
              :class="{ 'animate-spin': isLoading }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            {{ isLoading ? 'Yenileniyor...' : 'Yenile' }}
          </button>
        </div>

        <div v-if="quizzes.length === 0" class="p-6 text-center text-gray-500">
          <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
          </svg>
          <p class="text-lg font-medium">Henüz quiz oluşturmadınız</p>
          <p>Yukarıdaki formu kullanarak ilk quizinizi oluşturun</p>
        </div>

        <div v-else class="divide-y divide-gray-200">
          <div
            v-for="quiz in quizzes"
            :key="quiz.id"
            class="p-6 hover:bg-gray-50 transition duration-200"
          >
            <div class="flex justify-between items-start">
              <div class="flex-1">
                <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ quiz.title }}</h3>
                <div class="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                  <span class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    {{ quiz.question_count || 0 }} Soru
                  </span>
                  <span class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                    </svg>
                    {{ quiz.category }}
                  </span>
                  <span class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                    </svg>
                    {{ getDifficultyText(quiz.difficulty) }}
                  </span>
                  <span class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    {{ formatDate(quiz.created_at) }}
                  </span>
                </div>
                <p class="text-gray-600 text-sm">{{ quiz.prompt }}</p>
              </div>

              <div class="flex items-center gap-2 ml-4">
                <button
                  @click="editQuiz(quiz)"
                  :disabled="isLoadingQuizDetails"
                  class="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200 flex items-center gap-1"
                >
                  <svg v-if="isLoadingQuizDetails" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {{ isLoadingQuizDetails ? 'Yükleniyor...' : 'Düzenle' }}
                </button>
                <button
                  @click="deleteQuiz(quiz.id)"
                  class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200"
                >
                  Sil
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Quiz Modal -->
    <div
      v-if="editingQuiz"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click.self="closeEditModal"
    >
      <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <!-- Modal Header -->
        <div class="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 class="text-xl font-semibold text-gray-900">Quiz Düzenle: {{ editingQuiz.title }}</h3>
          <button
            @click="closeEditModal"
            class="text-gray-400 hover:text-gray-600"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Modal Content -->
        <div class="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <!-- Loading State -->
          <div v-if="isLoadingQuizDetails" class="flex items-center justify-center py-12">
            <div class="text-center">
              <svg class="animate-spin w-8 h-8 text-blue-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p class="text-gray-600">Quiz detayları yükleniyor...</p>
            </div>
          </div>

          <div v-else class="space-y-6">
            <!-- Quiz Info -->
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Quiz Başlığı</label>
                <input
                  v-model="editingQuiz.title"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                <input
                  v-model="editingQuiz.category"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>
            </div>

            <!-- Questions -->
            <div>
              <div class="flex justify-between items-center mb-4">
                <h4 class="text-lg font-semibold text-gray-900">Sorular</h4>
                <button
                  @click="addQuestion"
                  class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition duration-200"
                >
                  + Yeni Soru
                </button>
              </div>

              <div class="space-y-6">
                <div
                  v-for="(question, qIndex) in editingQuiz.questions"
                  :key="qIndex"
                  class="border border-gray-200 rounded-lg p-4"
                >
                  <div class="flex justify-between items-start mb-3">
                    <h5 class="font-medium text-gray-900">Soru {{ qIndex + 1 }}</h5>
                    <button
                      @click="removeQuestion(qIndex)"
                      class="text-red-600 hover:text-red-700"
                    >
                      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                    </button>
                  </div>

                  <div class="space-y-3">
                    <!-- Question Text -->
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1">Soru Metni</label>
                      <textarea
                        v-model="question.text"
                        rows="2"
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                      ></textarea>
                    </div>

                    <!-- Options -->
                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-2">Şıklar</label>
                      <div class="space-y-2">
                        <div
                          v-for="(option, oIndex) in question.options"
                          :key="oIndex"
                          class="flex items-center gap-3"
                        >
                          <input
                            type="radio"
                            :name="`correct-${qIndex}`"
                            :checked="question.correct === oIndex"
                            @change="question.correct = oIndex"
                            class="text-blue-600"
                          />
                          <input
                            v-model="question.options[oIndex]"
                            type="text"
                            class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                            :placeholder="`Şık ${String.fromCharCode(65 + oIndex)}`"
                          />
                          <button
                            v-if="question.options.length > 2"
                            @click="removeOption(qIndex, oIndex)"
                            class="text-red-600 hover:text-red-700"
                          >
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                          </button>
                        </div>
                        <button
                          v-if="question.options.length < 6"
                          @click="addOption(qIndex)"
                          class="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          + Şık Ekle
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>

        <!-- Modal Footer -->
        <div class="flex justify-end gap-3 p-6 border-t border-gray-200">
          <button
            @click="closeEditModal"
            class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition duration-200"
          >
            İptal
          </button>
          <button
            @click="saveQuiz"
            class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition duration-200"
          >
            Kaydet
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '../services/authService.js'
import { quizService } from '../services/quizService.js'
import { createCancelToken } from '../services/api.js'
import axios from 'axios'

const router = useRouter()

// Reactive data
const newQuiz = ref({
  title: '',
  prompt: '',
  questionCount: 10,
  difficulty: 'medium',
  category: ''
})

const quizzes = ref([])
const editingQuiz = ref(null)
const isGenerating = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')
const currentUser = ref(null)

// Request cancellation
const cancelTokens = ref([])
const isComponentMounted = ref(true)

// Debouncing and rate limiting
const lastRequestTime = ref(0)
const MIN_REQUEST_INTERVAL = 2000 // 2 saniye minimum aralık

// Edit modal loading
const isLoadingQuizDetails = ref(false)



// Methods
const loadQuizzes = async (force = false) => {
  // Component unmount kontrolü
  if (!isComponentMounted.value) {
    console.log('Component unmounted, skipping loadQuizzes')
    return
  }

  console.log('Loading quizzes...', force ? '(forced reload)' : '')
  isLoading.value = true
  errorMessage.value = ''

  try {
    const result = await quizService.getUserQuizzes()
    console.log('LoadQuizzes result:', result)

    if (result.success) {
      console.log('Quizzes loaded successfully:', result.data.quizzes?.length || 0, 'quizzes')
      quizzes.value = result.data.quizzes || []
    } else {
      console.error('Failed to load quizzes:', result.error)
      errorMessage.value = result.error || 'Quizler yüklenemedi'
    }
  } catch (error) {
    console.error('Load quizzes error:', error)

    // Component unmount kontrolü tekrar
    if (!isComponentMounted.value) {
      console.log('Component unmounted during request, ignoring error')
      return
    }

    errorMessage.value = 'Quizler yüklenirken bir hata oluştu: ' + (error.message || 'Bilinmeyen hata')
  } finally {
    // Component hala mount'lanmışsa state'i temizle
    if (isComponentMounted.value) {
      isLoading.value = false
      console.log('Quiz loading completed')
    }
  }
}

// Request management
const cancelAllRequests = () => {
  console.log('Cancelling all requests...')
  cancelTokens.value.forEach(token => {
    if (token && token.cancel) {
      token.cancel('User cancelled or new request started')
    }
  })
  cancelTokens.value = []

  // Loading state'i temizle
  if (isComponentMounted.value) {
    isGenerating.value = false
    errorMessage.value = ''
  }
}

const checkAuthentication = () => {
  if (!authService.isAuthenticated()) {
    router.push('/login')
    return false
  }

  currentUser.value = authService.getStoredUser()
  return true
}

const handleLogout = async () => {
  // Logout öncesi tüm istekleri iptal et
  cancelAllRequests()

  try {
    await authService.logout()
    router.push('/landing')
  } catch (error) {
    console.error('Logout error:', error)
    // Logout işlemi başarısız olsa bile kullanıcıyı ana sayfaya yönlendir
    router.push('/landing')
  }
}

const createQuiz = async () => {
  if (!newQuiz.value.title || !newQuiz.value.prompt) {
    errorMessage.value = 'Başlık ve prompt gereklidir'
    return
  }

  // Rate limiting - çok hızlı tıklamalara karşı koruma
  const now = Date.now()
  if (now - lastRequestTime.value < MIN_REQUEST_INTERVAL) {
    errorMessage.value = `Lütfen ${Math.ceil((MIN_REQUEST_INTERVAL - (now - lastRequestTime.value)) / 1000)} saniye bekleyin`
    return
  }
  lastRequestTime.value = now

  // Önceki işlemleri iptal et
  cancelAllRequests()

  isGenerating.value = true
  errorMessage.value = ''

  // Yeni cancel token oluştur
  const cancelToken = createCancelToken()
  cancelTokens.value.push(cancelToken)

  try {
    console.log('Quiz oluşturma başladı...', {
      title: newQuiz.value.title,
      prompt: newQuiz.value.prompt,
      category: newQuiz.value.category || 'Genel',
      difficulty: newQuiz.value.difficulty,
      question_count: newQuiz.value.questionCount
    })

    const result = await quizService.createQuiz({
      title: newQuiz.value.title,
      prompt: newQuiz.value.prompt,
      category: newQuiz.value.category || 'Genel',
      difficulty: newQuiz.value.difficulty,
      question_count: newQuiz.value.questionCount
    }, cancelToken)

    console.log('Quiz oluşturma sonucu:', result)

    if (result.success) {
      console.log('Quiz created successfully, refreshing list...')

      // Quiz başarıyla oluşturuldu - listeyi force reload yap
      setTimeout(async () => {
        if (isComponentMounted.value) {
          await loadQuizzes(true)
        }
      }, 500) // 500ms bekle, backend'in commit etmesi için

      // Reset form
      newQuiz.value = {
        title: '',
        prompt: '',
        questionCount: 10,
        difficulty: 'medium',
        category: ''
      }

      alert('✅ Quiz başarıyla oluşturuldu! Liste yenileniyor...')
    } else {
      console.error('Quiz oluşturma başarısız:', result.error)
      errorMessage.value = result.error || 'Quiz oluşturulamadı'
    }
    } catch (error) {
    console.error('Quiz creation error:', error)

    // Component unmount kontrolü
    if (!isComponentMounted.value) {
      console.log('Component unmounted, ignoring error')
      return
    }

    // İptal edilmiş istek kontrolü
    if (axios.isCancel && axios.isCancel(error)) {
      console.log('Request was cancelled')
      errorMessage.value = 'İşlem iptal edildi'
      return
    }

    // Timeout hatası kontrol et
    if (error.code === 'ECONNABORTED') {
      errorMessage.value = '⏱️ Quiz oluşturma çok uzun sürdü. Lütfen tekrar deneyin.'
    } else if (error.response) {
      // Backend'den gelen hata
      const status = error.response.status
      const detail = error.response.data?.detail || error.response.statusText

      if (status === 401) {
        errorMessage.value = '🔐 Oturum süresi dolmuş. Lütfen tekrar giriş yapın.'
        setTimeout(() => router.push('/login'), 2000)
      } else if (status >= 500) {
        errorMessage.value = '🔧 Sunucu hatası. Lütfen daha sonra tekrar deneyin.'
      } else {
        errorMessage.value = `❌ Hata: ${detail}`
      }
    } else if (error.request) {
      // Network hatası
      errorMessage.value = '🌐 Bağlantı hatası. İnternet bağlantınızı kontrol edin.'
    } else {
      // Diğer hatalar
      errorMessage.value = `⚠️ Quiz oluşturulurken hata: ${error.message}`
    }

    // Error'u 10 saniye sonra temizle
    setTimeout(() => {
      if (isComponentMounted.value) {
        errorMessage.value = ''
      }
    }, 10000)
  } finally {
    if (isComponentMounted.value) {
      isGenerating.value = false
    }
  }
}



const editQuiz = async (quiz) => {
  console.log('Opening edit modal for quiz:', quiz.id)
  isLoadingQuizDetails.value = true

  try {
    // Backend'den quiz detaylarını sorularla birlikte al
    const result = await quizService.getQuiz(quiz.id)

    if (result.success) {
      console.log('Quiz details loaded for editing:', result.data)
      editingQuiz.value = JSON.parse(JSON.stringify(result.data)) // Deep copy

      // Sorular varsa kontrol et
      if (editingQuiz.value.questions && editingQuiz.value.questions.length > 0) {
        console.log(`Quiz has ${editingQuiz.value.questions.length} questions loaded`)
      } else {
        console.warn('No questions found in quiz details')
        // Eğer sorular yoksa boş array oluştur
        editingQuiz.value.questions = []
      }
    } else {
      console.error('Failed to load quiz details:', result.error)
      errorMessage.value = 'Quiz detayları yüklenemedi: ' + result.error

      // Fallback: Liste verisini kullan ama boş sorular ekle
      editingQuiz.value = JSON.parse(JSON.stringify(quiz))
      editingQuiz.value.questions = []
    }
  } catch (error) {
    console.error('Error loading quiz for editing:', error)
    errorMessage.value = 'Quiz yüklenirken hata oluştu'

    // Fallback: Liste verisini kullan
    editingQuiz.value = JSON.parse(JSON.stringify(quiz))
    editingQuiz.value.questions = []
  } finally {
    isLoadingQuizDetails.value = false
  }
}

const closeEditModal = () => {
  editingQuiz.value = null
}

const saveQuiz = async () => {
  if (!editingQuiz.value) return

  try {
    const result = await quizService.updateQuiz(editingQuiz.value.id, {
      title: editingQuiz.value.title,
      prompt: editingQuiz.value.prompt,
      category: editingQuiz.value.category,
      difficulty: editingQuiz.value.difficulty,
      questions: editingQuiz.value.questions
    })

    if (result.success) {
      // Quiz listesini yenile
      await loadQuizzes()
      closeEditModal()
      alert('Quiz başarıyla güncellendi!')
    } else {
      alert('Quiz güncellenirken hata oluştu: ' + result.error)
    }
  } catch (error) {
    console.error('Save quiz error:', error)
    alert('Quiz güncellenirken bir hata oluştu')
  }
}

const deleteQuiz = async (id) => {
  if (confirm('Bu quizi silmek istediğinizden emin misiniz?')) {
    try {
      const result = await quizService.deleteQuiz(id)

      if (result.success) {
        // Quiz listesini yenile
        await loadQuizzes()
        alert('Quiz silindi!')
      } else {
        alert('Quiz silinirken hata oluştu: ' + result.error)
      }
    } catch (error) {
      console.error('Delete quiz error:', error)
      alert('Quiz silinirken bir hata oluştu')
    }
  }
}

const addQuestion = () => {
  editingQuiz.value.questions.push({
    text: 'Yeni soru metni...',
    options: ['Seçenek A', 'Seçenek B', 'Seçenek C', 'Seçenek D'],
    correct: 0
  })
}

const removeQuestion = (index) => {
  if (editingQuiz.value.questions.length > 1) {
    editingQuiz.value.questions.splice(index, 1)
  }
}

const addOption = (qIndex) => {
  const question = editingQuiz.value.questions[qIndex]
  if (question.options.length < 6) {
    question.options.push('Yeni seçenek')
  }
}

const removeOption = (qIndex, oIndex) => {
  const question = editingQuiz.value.questions[qIndex]
  if (question.options.length > 2) {
    question.options.splice(oIndex, 1)
    // Adjust correct answer if needed
    if (question.correct >= oIndex && question.correct > 0) {
      question.correct--
    }
  }
}

const getDifficultyText = (difficulty) => {
  const map = { easy: 'Kolay', medium: 'Orta', hard: 'Zor' }
  return map[difficulty] || difficulty
}

const formatDate = (dateString) => {
  // API'den gelen ISO string'i Date'e çevir
  const date = new Date(dateString)
  return date.toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Initialize with authentication check and load quizzes
onMounted(async () => {
  console.log('QuizManager component mounted')
  isComponentMounted.value = true

  try {
    if (checkAuthentication()) {
      console.log('Authentication successful, loading initial quizzes...')
      await loadQuizzes()
    } else {
      console.log('Authentication failed, redirecting to login')
    }
  } catch (error) {
    console.error('Error during component initialization:', error)
    if (isComponentMounted.value) {
      errorMessage.value = 'Sayfa yüklenirken hata oluştu'
      isLoading.value = false
    }
  }
})

// Cleanup on component unmount
onUnmounted(() => {
  isComponentMounted.value = false
  cancelAllRequests()
  console.log('QuizManager component unmounted, all requests cancelled')
})
</script>
