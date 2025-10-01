<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
    <!-- Hero Section -->
    <div class="container mx-auto px-6 py-16">
      <div class="flex flex-col lg:flex-row items-center justify-between">
        <!-- Left Content -->
        <div class="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
          <!-- Logo -->
          <div class="flex justify-center lg:justify-start mb-6">
            <img src="/logo.svg" alt="AI Quiz Builder Logo" class="w-16 h-16">
          </div>
          
          <h1 class="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            AI Quiz
            <span class="text-blue-600">Builder</span>
          </h1>
          <p class="text-xl text-gray-600 mb-8 leading-relaxed">
            Yapay zeka ile saniyeler içinde profesyonel quizler oluşturun. 
            Öğrencilerinizin performansını takip edin.
          </p>
          
          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <router-link 
              to="/register" 
              class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition duration-300 transform hover:scale-105 shadow-lg"
            >
              Ücretsiz Başlayın
            </router-link>
            <router-link 
              to="/login" 
              class="border-2 border-gray-300 hover:border-blue-600 text-gray-700 hover:text-blue-600 font-semibold py-4 px-8 rounded-xl transition duration-300"
            >
              Giriş Yap
            </router-link>
          </div>
        </div>

        <!-- Right Image -->
        <div class="lg:w-1/2 flex justify-center">
          <div class="relative">
                         <!-- Main Hero Image -->
             <div class="w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl shadow-2xl flex items-center justify-center overflow-hidden relative">
               <!-- Background Pattern -->
               <div class="absolute inset-0">
                 <img src="/template-hero-bg.svg" alt="Hero Background" class="w-full h-full object-cover opacity-30">
               </div>
               
               <!-- Main Icon -->
               <div class="relative z-10">
                 <svg class="w-48 h-48 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                 </svg>
               </div>
             </div>
            
            <!-- Floating Elements -->
            <div class="absolute -top-6 -right-6 w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center shadow-lg">
              <svg class="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            
            <div class="absolute -bottom-6 -left-6 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center shadow-lg">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="bg-white py-20">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-900 mb-4">
            Neden AI Quiz Builder?
          </h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Modern eğitimin ihtiyaçları için tasarlanmış güçlü araçlar
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="text-center group">
            <div class="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition duration-300">
              <svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">Hızlı Oluşturma</h3>
            <p class="text-gray-600">AI ile saniyeler içinde quiz sorularını otomatik oluşturun</p>
          </div>

          <!-- Feature 2 -->
          <div class="text-center group">
            <div class="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-green-200 transition duration-300">
              <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">Detaylı Analiz</h3>
            <p class="text-gray-600">Öğrenci performansını grafik ve raporlarla takip edin</p>
          </div>

          <!-- Feature 3 -->
          <div class="text-center group">
            <div class="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-200 transition duration-300">
              <svg class="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-3">Özelleştirilebilir</h3>
            <p class="text-gray-600">Quiz türlerini ve zorluklarını ihtiyaçlarınıza göre ayarlayın</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Demo Section -->
    <div class="bg-gray-50 py-20">
      <div class="container mx-auto px-6">
        <div class="flex flex-col lg:flex-row items-center">
          <!-- Left Image -->
          <div class="lg:w-1/2 mb-12 lg:mb-0">
            <div class="relative">
              <div class="w-full h-80 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl shadow-lg flex items-center justify-center">
                <div class="text-center">
                  <div class="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"/>
                    </svg>
                  </div>
                  <p class="text-gray-600 font-medium">Quiz Demo Interface</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Content -->
          <div class="lg:w-1/2 lg:pl-12">
            <h2 class="text-3xl font-bold text-gray-900 mb-6">
              Kolay Kullanım
            </h2>
            <p class="text-lg text-gray-600 mb-6">
              Sezgisel arayüzümüz sayesinde hiçbir teknik bilgi gerektirmeden 
              profesyonel quizler oluşturabilirsiniz.
            </p>
            <ul class="space-y-3">
              <li class="flex items-center">
                <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span class="text-gray-700">Drag & drop ile soru ekleme</span>
              </li>
              <li class="flex items-center">
                <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span class="text-gray-700">Otomatik soru önerileri</span>
              </li>
              <li class="flex items-center">
                <svg class="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span class="text-gray-700">Tek tıkla paylaşım</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="bg-blue-600 py-16">
      <div class="container mx-auto px-6 text-center">
        <h2 class="text-3xl font-bold text-white mb-4">
          Hemen Başlayın
        </h2>
        <p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          İlk quizinizi oluşturmak için yalnızca birkaç dakika gerekiyor
        </p>
        <router-link 
          to="/register" 
          class="bg-white hover:bg-gray-100 text-blue-600 font-semibold py-4 px-8 rounded-xl transition duration-300 transform hover:scale-105 shadow-lg inline-block"
        >
          Ücretsiz Hesap Oluştur
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
// Modern landing page with visual elements
</script>
