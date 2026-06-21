<template>
  <div class="pt-24 min-h-screen bg-warm-white flex flex-col items-center justify-center px-6 py-20">
    <div ref="celebrateEl" class="text-center max-w-lg">
      <!-- Animated checkmark -->
      <div class="relative w-32 h-32 mx-auto mb-8">
        <svg class="w-full h-full" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="56" fill="none" stroke="#D4A853" stroke-width="2"
            :stroke-dasharray="352" :stroke-dashoffset="circleProgress" style="transition: stroke-dashoffset 1.5s ease; transform: rotate(-90deg); transform-origin: 50% 50%;" />
          <path d="M35 60 L52 77 L85 44" stroke="#3D1F0B" stroke-width="4" fill="none"
            stroke-linecap="round" stroke-linejoin="round"
            :stroke-dasharray="60" :stroke-dashoffset="checkProgress" style="transition: stroke-dashoffset 0.8s ease 1.2s;" />
        </svg>
        <div class="absolute inset-0 flex items-center justify-center animate-bounce text-amber" style="animation-delay: 2s">
          <AppIcon name="croissant" :size="40" />
        </div>
      </div>

      <h1 class="font-display text-5xl font-bold text-chocolate mb-4">Order Confirmed!</h1>
      <p class="font-body text-chocolate/65 text-lg leading-relaxed mb-8">
        Your order is in our bakers' hands now. You'll receive a confirmation email shortly with tracking information.
      </p>

      <!-- Order summary card -->
      <div class="bg-cream rounded-3xl border border-amber-200 p-7 mb-8 text-left">
        <div class="flex justify-between items-center mb-4">
          <span class="font-body text-sm text-chocolate/50">Order Number</span>
          <span class="font-body font-bold text-chocolate">#MD-{{ orderNumber }}</span>
        </div>
        <div class="flex justify-between items-center mb-4">
          <span class="font-body text-sm text-chocolate/50">Estimated Delivery</span>
          <span class="font-body font-semibold text-chocolate">Today, 2pm - 4pm</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="font-body text-sm text-chocolate/50">Status</span>
          <span class="flex items-center gap-2 font-body text-sm text-green-600 font-medium">
            <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Preparing your order
          </span>
        </div>
      </div>

      <!-- Confetti-style decorations -->
      <div class="flex flex-wrap justify-center gap-4 mb-8">
        <span v-for="(e, i) in celebrationIcons" :key="i" class="text-amber/60"
          :style="`animation: float-1 ${3 + i * 0.4}s ease-in-out ${i * 0.2}s infinite`">
          <AppIcon :name="e" :size="24" :stroke-width="1.25" />
        </span>
      </div>

      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <RouterLink to="/shop" class="px-8 py-4 bg-chocolate text-cream rounded-2xl font-body font-semibold hover:bg-chocolate-light transition-all duration-300 hover:shadow-xl">Continue Shopping</RouterLink>
        <RouterLink to="/" class="px-8 py-4 border border-amber text-amber rounded-2xl font-body font-medium hover:bg-amber/10 transition-all duration-300">Back to Home</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import AppIcon from '@/components/ui/AppIcon.vue'

const circleProgress = ref(352)
const checkProgress = ref(60)
const celebrateEl = ref(null)

const orderNumber = Math.floor(Math.random() * 90000) + 10000
const celebrationIcons = ['cake', 'croissant', 'wheat', 'cookie', 'sparkles', 'gift', 'star', 'layers']

onMounted(() => {
  setTimeout(() => { circleProgress.value = 0 }, 300)
  setTimeout(() => { checkProgress.value = 0 }, 1200)

  gsap.from(celebrateEl.value, { opacity: 0, y: 40, duration: 0.8, ease: 'power3.out' })

  gsap.fromTo('.confetti', { y: -20, opacity: 0 }, {
    y: 0, opacity: 1, stagger: 0.1, duration: 0.5, delay: 2
  })
})
</script>
