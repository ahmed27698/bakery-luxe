<template>
  <div class="pt-24 min-h-screen bg-warm-white">
    <div class="bg-cream py-24 px-6 border-b border-amber-100">
      <div class="max-w-350 mx-auto">
        <p class="font-accent text-amber text-sm tracking-[0.35em] uppercase mb-4">— Browse —</p>
        <h1 class="font-display text-6xl md:text-7xl font-bold text-chocolate leading-tight">All <em class="text-amber">Categories</em></h1>
        <p class="font-body text-chocolate/55 mt-5 max-w-xl text-lg">Browse our full range by category, from sourdough to celebration cakes.</p>
      </div>
    </div>
    <div class="max-w-350 mx-auto px-6 py-20">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <RouterLink v-for="cat in categories" :key="cat.id" :to="`/shop?category=${cat.slug}`"
          class="group relative rounded-3xl overflow-hidden aspect-square cursor-pointer bg-cream border border-amber-100 hover:border-amber/40 hover:shadow-2xl transition-all duration-500">
          <div class="absolute inset-0 transition-all duration-500" :style="`background: linear-gradient(135deg, ${cat.color}15, ${cat.color}35)`"></div>
          <div class="absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
            <span class="text-7xl group-hover:scale-125 transition-transform duration-500 block">{{ cat.icon }}</span>
            <div>
              <h3 class="font-display font-bold text-chocolate text-2xl">{{ cat.name }}</h3>
              <p class="font-body text-sm text-chocolate/55 mt-2">{{ cat.description }}</p>
            </div>
            <div class="mt-2 px-5 py-2 bg-chocolate text-cream rounded-xl text-sm font-body font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
              Shop {{ cat.name }} →
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { categories } from '@/data/products'
</script>
