<template>
  <div class="pt-24 min-h-screen bg-warm-white">
    <div class="bg-amber/10 border-b border-amber-200 py-24 px-6">
      <div class="max-w-350 mx-auto">
        <p class="font-accent text-amber text-sm tracking-[0.35em] uppercase mb-4">— Most Loved —</p>
        <h1 class="font-display text-6xl md:text-7xl font-bold text-chocolate leading-tight">Our <em class="gradient-text">Best Sellers</em></h1>
        <p class="font-body text-chocolate/55 mt-5 max-w-xl text-lg leading-relaxed">The items our customers come back for, time and time again. Tried, tested, and adored.</p>
      </div>
    </div>
    <div class="max-w-350 mx-auto px-6 py-20">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <ProductCard v-for="p in bestSellers" :key="p.id" :product="p" />
      </div>
    </div>
  </div>
</template>

<script setup>
import ProductCard from '@/components/ui/ProductCard.vue'
import { products } from '@/data/products'
import { computed } from 'vue'
const bestSellers = computed(() => products.filter(p => p.reviews > 150 || p.badge === 'Best Seller'))
</script>
