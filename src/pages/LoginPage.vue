<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center px-6">
    <div class="max-w-sm w-full">
      <!-- Header -->
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-2">Giriş Yap</h2>
        <p class="text-gray-600">Hesabınıza giriş yapın</p>
      </div>

      <!-- Form -->
      <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <!-- Error Message -->
        <div v-if="errorMessage" class="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {{ errorMessage }}
        </div>

        <form @submit.prevent="handleLogin" class="space-y-4">
          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              E-mail
            </label>
            <input
              v-model="email"
              type="email"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              placeholder="ornek@email.com"
            />
          </div>

          <!-- Password -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Şifre
            </label>
            <input
              v-model="password"
              type="password"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
              placeholder="••••••••"
            />
          </div>

          <!-- Login Button -->
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white font-medium py-2.5 px-4 rounded-lg transition duration-200"
          >
            <span v-if="isLoading">Giriş yapılıyor...</span>
            <span v-else>Giriş Yap</span>
          </button>
        </form>

        <!-- Divider -->
        <div class="relative my-6">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-300"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">veya</span>
          </div>
        </div>

        <!-- Google Button -->
        <button
          @click="handleGoogleLogin"
          class="w-full border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-2.5 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2"
        >
          <svg class="w-4 h-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Google ile Giriş
        </button>
      </div>

      <!-- Links -->
      <div class="text-center mt-6 space-y-2">
        <p class="text-sm text-gray-600">
          Hesabınız yok mu?
          <router-link to="/register" class="text-blue-600 hover:text-blue-700 font-medium">
            Kayıt olun
          </router-link>
        </p>
        <router-link to="/landing" class="block text-sm text-gray-500 hover:text-gray-700">
          ← Ana sayfaya dön
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '../services/authService.js'

const router = useRouter()

const email = ref('')
const password = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  if (!email.value || !password.value) {
    errorMessage.value = 'Email ve şifre gereklidir'
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    const result = await authService.login({
      email: email.value,
      password: password.value
    })

    if (result.success) {
      console.log('Giriş başarılı:', result.user)
      router.push('/quiz-manager')
    } else {
      errorMessage.value = result.error
    }
  } catch (error) {
    console.error('Login error:', error)
    errorMessage.value = 'Giriş işlemi sırasında bir hata oluştu'
  } finally {
    isLoading.value = false
  }
}

const handleGoogleLogin = async () => {
  // Google OAuth implementation için placeholder
  alert('Google OAuth entegrasyonu yakında eklenecek!')
}
</script>
