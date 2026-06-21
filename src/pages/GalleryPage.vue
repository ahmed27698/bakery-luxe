<template>
  <div class="pt-24 min-h-screen bg-chocolate">
    <div class="py-24 px-6 text-center">
      <p class="font-accent text-amber text-sm tracking-[0.35em] uppercase mb-5">— Visual Stories —</p>
      <h1 class="font-display text-7xl font-bold text-cream leading-tight">The <em class="gradient-text">Gallery</em></h1>
      <p class="font-body text-cream/50 mt-5 text-lg max-w-md mx-auto">A visual diary of our craft, our people, and our creations.</p>
    </div>

    <!-- Masonry grid -->
    <div class="max-w-350 mx-auto px-6 pb-20">
      <!-- Filter tabs -->
      <div class="flex gap-2 flex-wrap justify-center mb-10">
        <button v-for="cat in ['All', 'Cakes', 'Bread', 'Pastries', 'Behind the Scenes']" :key="cat"
          @click="activeFilter = cat"
          class="px-4 py-2 rounded-full font-body text-sm transition-all duration-300"
          :class="activeFilter === cat ? 'bg-amber text-chocolate font-semibold' : 'border border-white/20 text-white/60 hover:border-white/40 hover:text-white'">
          {{ cat }}
        </button>
      </div>

      <!-- Grid -->
      <div class="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        <div v-for="(item, i) in galleryItems" :key="i"
          class="break-inside-avoid rounded-2xl overflow-hidden group relative cursor-pointer"
          @click="openLightbox(item)">
          <img :src="item.src" :alt="item.label"
            class="w-full object-cover group-hover:scale-110 transition-transform duration-700"
            loading="lazy" />
          <div class="absolute inset-0 bg-chocolate/50 opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-end p-5">
            <span class="font-body text-white text-sm font-medium translate-y-4 group-hover:translate-y-0 transition-transform duration-400">{{ item.label }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <Transition name="fade">
      <div v-if="lightboxOpen" class="fixed inset-0 bg-black/95 z-900 flex items-center justify-center p-6" @click="lightboxOpen = false">
        <button class="absolute top-6 right-6 text-white/60 hover:text-white transition-colors p-2">
          <AppIcon name="x" :size="28" />
        </button>
        <img :src="lightboxItem?.src" :alt="lightboxItem?.label" class="max-w-full max-h-[85vh] rounded-2xl object-contain" @click.stop />
        <p class="absolute bottom-8 text-white/60 font-body text-sm">{{ lightboxItem?.label }}</p>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AppIcon from '@/components/ui/AppIcon.vue'

const activeFilter = ref('All')
const lightboxOpen = ref(false)
const lightboxItem = ref(null)

const galleryItems = [
  { src: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&q=90', label: 'Velvet Rose Cake', cat: 'Cakes' },
  { src: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=600&q=90', label: 'Honey Wheat Sourdough', cat: 'Bread' },
  { src: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=90', label: 'Almond Croissant', cat: 'Pastries' },
  { src: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=90', label: 'Layered Chocolate Cake', cat: 'Cakes' },
  { src: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&q=90', label: 'Brown Butter Cookies', cat: 'Pastries' },
  { src: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=600&q=90', label: 'Matcha Macarons', cat: 'Pastries' },
  { src: 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=600&q=90', label: 'Chef Isabelle at Work', cat: 'Behind the Scenes' },
  { src: 'https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?w=600&q=90', label: 'Marcus Shaping Dough', cat: 'Behind the Scenes' },
  { src: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=600&q=90', label: 'Earl Grey Tart', cat: 'Pastries' },
  { src: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=90', label: 'Raspberry Tart', cat: 'Pastries' },
  { src: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=90', label: 'Artisan Loaves', cat: 'Bread' },
  { src: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=600&q=90', label: 'Blueberry Muffins', cat: 'Pastries' },
]

function openLightbox(item) {
  lightboxItem.value = item
  lightboxOpen.value = true
}
</script>
