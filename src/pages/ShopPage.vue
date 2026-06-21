<template>
  <div class="pt-24 min-h-screen bg-warm-white">
    <!-- Page Hero -->
    <div ref="heroEl" class="bg-cream py-24 px-6 border-b border-amber-100">
      <div class="max-w-350 mx-auto">
        <p class="font-accent text-amber text-base tracking-[0.3em] uppercase mb-4 hero-eyebrow">Our Collection</p>
        <h1 class="font-display text-5xl md:text-7xl font-bold text-chocolate hero-title">The Bakery <em class="gradient-text">Shop</em></h1>
        <p class="font-body text-lg text-chocolate/55 mt-5 max-w-xl hero-sub leading-relaxed">Every item handcrafted with intention. From sourdoughs to celebration cakes — find your perfect bake.</p>
      </div>
    </div>

    <div class="max-w-350 mx-auto px-6 py-14">
      <!-- Filters Row -->
      <div class="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-8 filter-row">
        <!-- Category tabs -->
        <div class="flex gap-2 flex-wrap">
          <button
            v-for="cat in ['All', ...categoryNames]" :key="cat"
            @click="activeCategory = cat"
            class="px-4 py-2 rounded-full font-body text-sm font-medium transition-all duration-300"
            :class="activeCategory === cat ? 'bg-chocolate text-cream shadow-md' : 'bg-cream text-chocolate/70 hover:text-chocolate hover:bg-cream-dark'"
          >{{ cat }}</button>
        </div>

        <!-- Controls row -->
        <div class="flex items-center gap-3 flex-wrap">
          <!-- Price range -->
          <div class="relative">
            <button @click="showPriceFilter = !showPriceFilter"
              class="flex items-center gap-2 px-4 py-2 bg-cream border border-amber-200 rounded-xl font-body text-sm text-chocolate hover:border-amber transition-colors">
              Price: ${{ priceRange[0] }} - ${{ priceRange[1] }}
              <svg class="w-3 h-3" fill="none" viewBox="0 0 10 10"><path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            </button>
            <div v-if="showPriceFilter" class="absolute top-full left-0 mt-2 p-5 bg-white border border-amber-200 rounded-2xl shadow-xl z-50 w-64">
              <p class="font-body text-xs text-chocolate/50 mb-3">Price Range</p>
              <div class="flex items-center gap-2 mb-4">
                <input type="number" v-model.number="priceRange[0]" min="0" max="100" class="w-20 px-2 py-1.5 border border-amber-200 rounded-lg text-sm font-body" />
                <span class="text-chocolate/30">—</span>
                <input type="number" v-model.number="priceRange[1]" min="0" max="150" class="w-20 px-2 py-1.5 border border-amber-200 rounded-lg text-sm font-body" />
              </div>
              <button @click="showPriceFilter = false" class="w-full bg-chocolate text-cream py-2 rounded-xl text-sm font-body font-medium">Apply</button>
            </div>
          </div>

          <!-- Sort -->
          <select v-model="sortBy" class="px-4 py-2 bg-cream border border-amber-200 rounded-xl font-body text-sm text-chocolate focus:outline-none focus:border-amber cursor-pointer">
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
            <option value="newest">Newest</option>
          </select>

          <!-- Grid toggle -->
          <div class="flex border border-amber-200 rounded-xl overflow-hidden">
            <button @click="gridCols = 3" class="px-3 py-2 transition-colors" :class="gridCols === 3 ? 'bg-chocolate text-cream' : 'text-chocolate/50 hover:text-chocolate'">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 16 16"><rect x="0" y="0" width="4" height="4"/><rect x="6" y="0" width="4" height="4"/><rect x="12" y="0" width="4" height="4"/><rect x="0" y="6" width="4" height="4"/><rect x="6" y="6" width="4" height="4"/><rect x="12" y="6" width="4" height="4"/></svg>
            </button>
            <button @click="gridCols = 2" class="px-3 py-2 transition-colors" :class="gridCols === 2 ? 'bg-chocolate text-cream' : 'text-chocolate/50 hover:text-chocolate'">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 16 16"><rect x="0" y="0" width="6" height="6"/><rect x="10" y="0" width="6" height="6"/><rect x="0" y="10" width="6" height="6"/><rect x="10" y="10" width="6" height="6"/></svg>
            </button>
          </div>

          <!-- Results count -->
          <p class="font-body text-sm text-chocolate/50">{{ filteredProducts.length }} products</p>
        </div>
      </div>

      <!-- Active filters -->
      <div v-if="activeCategory !== 'All' || priceRange[0] > 0 || priceRange[1] < 150" class="flex gap-2 flex-wrap mb-6">
        <span class="font-body text-xs px-3 py-1.5 bg-amber/10 text-amber rounded-full border border-amber/20 flex items-center gap-2">
          {{ activeCategory !== 'All' ? activeCategory : `$${priceRange[0]} - $${priceRange[1]}` }}
          <button @click="clearFilters" class="hover:text-amber-dark"><AppIcon name="x" :size="12" /></button>
        </span>
      </div>

      <!-- Product Grid -->
      <TransitionGroup name="product-grid" tag="div"
        class="grid gap-8 transition-all duration-300"
        :class="gridCols === 3 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2'">
        <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
      </TransitionGroup>

      <!-- Empty state -->
      <div v-if="filteredProducts.length === 0" class="flex flex-col items-center justify-center py-24 text-center">
        <div class="mb-4 text-chocolate/20"><AppIcon name="search" :size="64" :stroke-width="1" /></div>
        <h3 class="font-display text-2xl font-bold text-chocolate mb-2">Nothing found</h3>
        <p class="font-body text-chocolate/50 mb-6">Try adjusting your filters</p>
        <button @click="clearFilters" class="btn-primary">Clear Filters</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import gsap from 'gsap'
import ProductCard from '@/components/ui/ProductCard.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { products, categories } from '@/data/products'

const route = useRoute()
const heroEl = ref(null)
const activeCategory = ref(route.query.category ? categories.find(c => c.slug === route.query.category)?.name || 'All' : 'All')
const priceRange = ref([0, 150])
const sortBy = ref('featured')
const gridCols = ref(3)
const showPriceFilter = ref(false)

const categoryNames = computed(() => [...new Set(products.map(p => p.category))])

const filteredProducts = computed(() => {
  let list = [...products]
  if (activeCategory.value !== 'All') {
    const catSlug = categories.find(c => c.name === activeCategory.value)?.slug
    if (catSlug) list = list.filter(p => p.category === catSlug)
    else list = list.filter(p => p.category === activeCategory.value.toLowerCase())
  }
  list = list.filter(p => p.price >= priceRange.value[0] && p.price <= priceRange.value[1])
  if (sortBy.value === 'price-asc') list.sort((a, b) => a.price - b.price)
  else if (sortBy.value === 'price-desc') list.sort((a, b) => b.price - a.price)
  else if (sortBy.value === 'rating') list.sort((a, b) => b.rating - a.rating)
  else if (sortBy.value === 'newest') list.sort((a, b) => b.id - a.id)
  return list
})

function clearFilters() { activeCategory.value = 'All'; priceRange.value = [0, 150] }

onMounted(() => {
  const tl = gsap.timeline()
  tl.from('.hero-eyebrow', { opacity: 0, y: 20, duration: 0.5 })
    .from('.hero-title', { opacity: 0, y: 40, duration: 0.7, ease: 'power3.out' }, '-=0.2')
    .from('.hero-sub', { opacity: 0, y: 20, duration: 0.5 }, '-=0.3')
    .from('.filter-row', { opacity: 0, y: 20, duration: 0.5 }, '-=0.2')
})
</script>

<style scoped>
.btn-primary {
  background: #3D1F0B;
  color: #FFF8F0;
  padding: 0.75rem 1.5rem;
  border-radius: 1rem;
  font-family: 'Outfit', system-ui, sans-serif;
  font-weight: 500;
  transition: all 0.3s;
}
.btn-primary:hover { background: #6B3A20; }
.product-grid-enter-active, .product-grid-leave-active { transition: all 0.4s ease; }
.product-grid-enter-from { opacity: 0; transform: scale(0.9) translateY(20px); }
.product-grid-leave-to { opacity: 0; transform: scale(0.9); }
.product-grid-move { transition: transform 0.4s ease; }
</style>
