<template>
  <div class="pt-24 min-h-screen bg-chocolate noise relative overflow-hidden flex items-center justify-center px-6">
    <div class="absolute inset-0 opacity-15">
      <img src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=1400&q=50" alt="" class="w-full h-full object-cover" />
    </div>

    <!-- Floating elements -->
    <div class="absolute top-1/4 left-[10%] float-1 opacity-15 text-amber">
      <AppIcon name="croissant" :size="100" :stroke-width="0.75" />
    </div>
    <div class="absolute bottom-1/4 right-[10%] float-2 opacity-15 text-amber">
      <AppIcon name="cake" :size="100" :stroke-width="0.75" />
    </div>
    <div class="absolute top-1/3 right-[20%] float-3 opacity-15 text-amber">
      <AppIcon name="wheat" :size="72" :stroke-width="0.75" />
    </div>

    <div ref="el" class="relative z-10 text-center max-w-2xl">
      <p class="font-display text-[160px] md:text-[220px] font-black leading-none gradient-text opacity-20">404</p>
      <div class="-mt-16">
        <h1 class="font-display text-5xl md:text-6xl font-bold text-cream mb-6">Crumbs.<br/>Page Not Found.</h1>
        <p class="font-body text-cream/60 text-lg mb-10 leading-relaxed">
          Looks like this page went the way of yesterday's baguette. Let's get you back to something fresh.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <RouterLink to="/" class="px-8 py-4 bg-amber text-chocolate rounded-2xl font-body font-bold hover:bg-amber-light transition-all duration-300 hover:scale-105 shadow-xl shadow-amber/30">
            Back to Home
          </RouterLink>
          <RouterLink to="/shop" class="px-8 py-4 border border-white/30 text-cream rounded-2xl font-body font-medium hover:bg-white/10 hover:border-white/50 transition-all duration-300">
            Browse the Shop
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import AppIcon from '@/components/ui/AppIcon.vue'

const el = ref(null)
onMounted(() => {
  gsap.from(el.value?.children, { opacity: 0, y: 40, stagger: 0.15, duration: 0.8, ease: 'power3.out' })
})
</script>
