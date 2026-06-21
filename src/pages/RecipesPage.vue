<template>
  <div class="pt-24 min-h-screen bg-warm-white">
    <!-- Hero -->
    <div class="bg-cream border-b border-amber-100 py-24 px-6">
      <div class="max-w-350 mx-auto">
        <p class="font-accent text-amber text-sm tracking-[0.35em] uppercase mb-4">— From Our Kitchen —</p>
        <h1 class="font-display text-6xl md:text-7xl font-bold text-chocolate leading-tight">
          Recipes <em class="text-amber">&amp; Guides</em>
        </h1>
        <p class="font-body text-chocolate/55 mt-5 max-w-xl text-lg leading-relaxed">
          Bake like a professional. Our team shares the secrets behind our most beloved creations.
        </p>
      </div>
    </div>

    <div class="max-w-350 mx-auto px-6 py-20">
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="recipe in allRecipes" :key="recipe.id"
          class="bg-cream rounded-3xl overflow-hidden border border-amber-100 hover:shadow-2xl hover:border-amber/40 transition-all duration-500 group flex flex-col">
          <!-- Image -->
          <div class="aspect-video overflow-hidden shrink-0">
            <img :src="recipe.image" :alt="recipe.title" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          </div>
          <!-- Content -->
          <div class="p-8 flex flex-col flex-1">
            <!-- Meta badges -->
            <div class="flex items-center gap-3 mb-5 flex-wrap">
              <span class="font-body text-xs px-3 py-1.5 rounded-full border font-medium" :class="difficultyClass(recipe.difficulty)">
                {{ recipe.difficulty }}
              </span>
              <span class="font-body text-xs text-chocolate/40 flex items-center gap-1.5">
                <AppIcon name="clock" :size="13" />
                {{ recipe.time }}
              </span>
              <span class="font-body text-xs text-chocolate/40 flex items-center gap-1.5">
                <AppIcon name="users" :size="13" />
                {{ recipe.servings }} servings
              </span>
            </div>

            <h3 class="font-display text-xl font-bold text-chocolate group-hover:text-amber transition-colors duration-300 leading-snug">
              {{ recipe.title }}
            </h3>
            <p class="font-body text-base text-chocolate/60 mt-3 leading-relaxed line-clamp-3 flex-1">
              {{ recipe.description }}
            </p>

            <div class="flex items-center justify-between mt-7 pt-5 border-t border-amber-100">
              <p class="font-body text-sm text-chocolate/40">
                By <span class="text-chocolate/70 font-medium">{{ recipe.chef }}</span>
              </p>
              <button class="px-5 py-2.5 bg-chocolate text-cream rounded-xl text-sm font-body font-semibold hover:bg-chocolate-light transition-all duration-300 hover:shadow-md hover:scale-105">
                View Recipe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppIcon from '@/components/ui/AppIcon.vue'
import { recipes } from '@/data/products'
import { computed } from 'vue'
const allRecipes = computed(() => recipes)
function difficultyClass(d) {
  return {
    Easy: 'bg-green-50 text-green-700 border-green-200',
    Advanced: 'bg-amber/10 text-amber border-amber/30',
    Expert: 'bg-red-50 text-red-600 border-red-200',
  }[d] || 'bg-cream text-chocolate border-amber-200'
}
</script>
