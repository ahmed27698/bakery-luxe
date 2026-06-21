<template>
  <div class="pt-24 min-h-screen bg-warm-white">
    <div class="bg-amber/10 border-b border-amber-200 py-24 px-6 relative overflow-hidden">
      <div class="absolute inset-0 opacity-10 float-slow" style="background: radial-gradient(circle at 80% 50%, #D4A853 0%, transparent 50%)"></div>
      <div class="max-w-350 mx-auto">
        <p class="font-accent text-amber text-sm tracking-[0.35em] uppercase mb-5 flex items-center gap-2">
          <AppIcon name="leaf" :size="14" /> Summer 2026
        </p>
        <h1 class="font-display text-6xl md:text-7xl font-bold text-chocolate leading-tight">Seasonal <em class="gradient-text">Collection</em></h1>
        <p class="font-body text-chocolate/60 mt-5 max-w-xl text-lg leading-relaxed">Limited-edition creations inspired by the finest seasonal produce. Available while ingredients last.</p>
      </div>
    </div>
    <div class="max-w-350 mx-auto px-6 py-20">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <ProductCard v-for="p in seasonal" :key="p.id" :product="p" />
      </div>
    </div>
  </div>
</template>

<script setup>
import ProductCard from '@/components/ui/ProductCard.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { products } from '@/data/products'
import { computed } from 'vue'
const seasonal = computed(() => products.filter(p => p.isSeasonal))
</script>
