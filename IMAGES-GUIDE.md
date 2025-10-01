# Görsel Dosyaları Rehberi

## Template Görseller

Bu projede kullanılan template görseller kolayca değiştirilebilir:

### 📁 Ana Görsel Dosyaları

#### `/public/logo.svg`
- **Kullanım:** Ana logo 
- **Boyut:** 120x120px
- **Format:** SVG (önerilen) veya PNG
- **Açıklama:** Sayfanın sol üst köşesinde ve favicon olarak kullanılır

#### `/public/template-hero-bg.svg`
- **Kullanım:** Hero section arka plan görseli
- **Boyut:** 800x600px  
- **Format:** SVG, PNG veya JPG
- **Açıklama:** Ana sayfanın büyük görsel alanında arka plan olarak kullanılır

### 🔄 Görselleri Değiştirme

1. **Logo Değiştirmek için:**
   ```bash
   # Yeni logo dosyanızı public klasörüne koyun
   # Dosya adını logo.svg olarak bırakın VEYA
   # src/pages/LandingPage.vue dosyasında src="/logo.svg" kısmını güncelleyin
   ```

2. **Hero Background Değiştirmek için:**
   ```bash
   # Yeni arka plan görselinizi public klasörüne koyun
   # Dosya adını template-hero-bg.svg olarak bırakın VEYA  
   # src/pages/LandingPage.vue dosyasında src="/template-hero-bg.svg" kısmını güncelleyin
   ```

### 🎨 Önerilen Görsel Spesifikasyonları

#### Logo
- **Boyut:** 120x120px (minimum)
- **Format:** SVG (scalable), PNG (şeffaf arka plan)
- **Stil:** Minimal, modern, tek renkli veya gradient

#### Hero Background
- **Boyut:** 800x600px (minimum)
- **Format:** SVG (küçük dosya), PNG, JPG
- **Stil:** Hafif, subtle, ana içeriği maskelemeyen

### 🛠️ Gelişmiş Özelleştirme

Daha fazla görsel eklemek istiyorsanız:

1. **Yeni section görselleri:** `public/` klasörüne ekleyin
2. **Vue componentinde kullanmak için:**
   ```vue
   <img src="/yeni-gorsel.png" alt="Açıklama" class="w-full h-auto">
   ```

3. **Responsive görseller için:**
   ```vue
   <picture>
     <source media="(min-width: 1024px)" srcset="/desktop-gorsel.png">
     <source media="(min-width: 768px)" srcset="/tablet-gorsel.png">
     <img src="/mobile-gorsel.png" alt="Açıklama" class="w-full h-auto">
   </picture>
   ```

### ⚠️ Önemli Notlar

- Görsel dosyaları `/public/` klasörüne konulmalı
- Dosya adlarında Türkçe karakter kullanmayın
- Büyük dosyalar (>1MB) performansı etkileyebilir
- SVG formatı genellikle en iyi seçenektir (küçük dosya, scalable)

### 🚀 Production İçin

- Görselleri optimize edin (TinyPNG, SVGOMG)
- WebP formatını destekleyen tarayıcılar için WebP versiyonları ekleyin
- Lazy loading kullanmayı düşünün büyük görseller için 