<template>
  <div class="pt-24 min-h-screen bg-warm-white" v-if="product">
    <!-- Breadcrumb -->
    <div class="max-w-350 mx-auto px-6 py-4">
      <nav class="flex items-center gap-2 font-body text-sm text-chocolate/40">
        <RouterLink to="/" class="hover:text-amber transition-colors">Home</RouterLink>
        <span>/</span>
        <RouterLink to="/shop" class="hover:text-amber transition-colors">Shop</RouterLink>
        <span>/</span>
        <span class="text-chocolate/70">{{ product.name }}</span>
      </nav>
    </div>

    <!-- Product Section -->
    <div class="max-w-350 mx-auto px-6 pb-20">
      <div class="grid lg:grid-cols-2 gap-12 xl:gap-20 items-start">

        <!-- Image Gallery -->
        <div class="sticky top-28" ref="galleryEl">
          <!-- Main image -->
          <div class="relative rounded-3xl overflow-hidden aspect-square bg-cream mb-4 main-img-wrap" @mouseenter="showZoom = true" @mouseleave="showZoom = false" @mousemove="onImageZoom">
            <img :src="activeImage" :alt="product.name"
              class="w-full h-full object-cover transition-transform duration-700"
              :class="zoomed ? 'scale-150 cursor-zoom-out' : 'scale-100 cursor-zoom-in'"
              :style="zoomed ? `transform-origin: ${zoomX}% ${zoomY}%` : ''"
              ref="mainImgEl" />
            <!-- Badges -->
            <div class="absolute top-4 left-4 flex flex-col gap-2">
              <span v-if="product.badge" class="font-body text-xs font-semibold px-3 py-1.5 bg-white/90 text-chocolate rounded-full shadow-md">{{ product.badge }}</span>
              <span v-if="product.isFresh" class="font-body text-xs font-medium px-3 py-1.5 bg-green-500 text-white rounded-full flex items-center gap-1.5 shadow-md">
                <span class="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span> Fresh Today
              </span>
              <span v-if="product.isSeasonal" class="font-body text-xs font-medium px-3 py-1.5 bg-amber text-chocolate rounded-full shadow-md flex items-center gap-1.5">
                <AppIcon name="leaf" :size="12" /> Seasonal
              </span>
            </div>
          </div>
          <!-- Thumbnails -->
          <div class="flex gap-3">
            <button v-for="(img, i) in product.images" :key="i"
              @click="activeImage = img"
              class="w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 shrink-0"
              :class="activeImage === img ? 'border-amber shadow-md scale-105' : 'border-transparent hover:border-amber/40'">
              <img :src="img" :alt="`Image ${i+1}`" class="w-full h-full object-cover" />
            </button>
          </div>
        </div>

        <!-- Product Info -->
        <div ref="infoEl">
          <!-- Category & title -->
          <p class="font-accent text-amber text-sm tracking-[0.3em] uppercase mb-3">{{ product.category }}</p>
          <h1 class="font-display text-4xl md:text-5xl font-bold text-chocolate leading-tight">{{ product.name }}</h1>

          <!-- Rating -->
          <div class="flex items-center gap-3 mt-4">
            <div class="flex gap-0.5">
              <svg v-for="i in 5" :key="i" class="w-4 h-4" :class="i <= Math.floor(product.rating) ? 'star-fill' : 'star-empty'" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
              </svg>
            </div>
            <span class="font-body text-sm font-semibold text-chocolate">{{ product.rating }}</span>
            <span class="font-body text-sm text-chocolate/40">{{ product.reviews }} reviews</span>
          </div>

          <!-- Price -->
          <div class="flex items-baseline gap-3 mt-5">
            <span class="font-display text-4xl font-bold text-chocolate">${{ product.price.toFixed(2) }}</span>
            <span v-if="product.originalPrice" class="font-body text-lg text-chocolate/40 line-through">${{ product.originalPrice.toFixed(2) }}</span>
            <span v-if="product.originalPrice" class="font-body text-sm px-2.5 py-1 bg-green-50 text-green-700 rounded-full border border-green-200">
              Save {{ Math.round((1 - product.price/product.originalPrice) * 100) }}%
            </span>
          </div>

          <!-- Description -->
          <p class="font-body text-base text-chocolate/65 mt-6 leading-relaxed">{{ product.description }}</p>

          <!-- Info tags -->
          <div class="flex flex-wrap gap-3 mt-6">
            <div class="flex items-center gap-2 px-4 py-2 bg-cream rounded-xl border border-amber-100">
              <AppIcon name="package" :size="16" class="text-amber shrink-0" />
              <span class="font-body text-sm text-chocolate/70">{{ product.weight }}</span>
            </div>
            <div class="flex items-center gap-2 px-4 py-2 bg-cream rounded-xl border border-amber-100">
              <AppIcon name="truck" :size="16" class="text-amber shrink-0" />
              <span class="font-body text-sm text-chocolate/70">Delivered in {{ product.deliveryTime }}</span>
            </div>
            <div class="flex items-center gap-2 px-4 py-2 bg-cream rounded-xl border border-amber-100">
              <span class="w-2 h-2 rounded-full shrink-0" :class="product.inStock ? 'bg-green-500' : 'bg-red-400'"></span>
              <span class="font-body text-sm" :class="product.inStock ? 'text-green-600' : 'text-red-500'">
                {{ product.inStock ? `In Stock (${product.quantity} left)` : 'Out of Stock' }}
              </span>
            </div>
          </div>

          <!-- Quantity + Add to cart -->
          <div class="flex items-center gap-4 mt-8">
            <div class="flex items-center border border-amber-200 rounded-2xl overflow-hidden">
              <button @click="qty = Math.max(1, qty - 1)" class="px-4 py-3 hover:bg-cream transition-colors font-bold text-chocolate text-lg">−</button>
              <span class="px-5 py-3 font-display font-bold text-chocolate min-w-15 text-center">{{ qty }}</span>
              <button @click="qty++" class="px-4 py-3 hover:bg-cream transition-colors font-bold text-chocolate text-lg">+</button>
            </div>
            <button @click="addToCart" :disabled="!product.inStock"
              class="flex-1 btn-add-to-cart magnetic-wrap"
              :class="!product.inStock ? 'opacity-50 cursor-not-allowed' : ''">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke-width="1.5"/>
                <line x1="3" y1="6" x2="21" y2="6" stroke-width="1.5"/>
                <path d="M16 10a4 4 0 01-8 0" stroke-width="1.5"/>
              </svg>
              {{ product.inStock ? 'Add to Cart' : 'Out of Stock' }}
            </button>
            <button @click="toggleWishlist"
              class="w-14 h-14 border rounded-2xl flex items-center justify-center transition-all duration-300"
              :class="isWishlisted ? 'bg-red-50 border-red-200 text-red-400' : 'border-amber-200 text-chocolate/50 hover:text-red-400 hover:border-red-200'">
              <svg class="w-5 h-5" :fill="isWishlisted ? 'currentColor' : 'none'" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke-width="1.5"/>
              </svg>
            </button>
          </div>

          <!-- Tabs -->
          <div class="mt-10 border-b border-amber-100">
            <div class="flex gap-6">
              <button v-for="tab in tabs" :key="tab"
                @click="activeTab = tab"
                class="pb-3 font-body text-sm font-medium transition-all duration-300 border-b-2 -mb-px"
                :class="activeTab === tab ? 'text-chocolate border-amber' : 'text-chocolate/40 border-transparent hover:text-chocolate/70'">
                {{ tab }}
              </button>
            </div>
          </div>

          <div class="mt-6">
            <!-- Ingredients -->
            <div v-if="activeTab === 'Ingredients'" class="space-y-2">
              <div v-for="ing in product.ingredients" :key="ing"
                class="flex items-center gap-3 py-2.5 border-b border-amber-50">
                <span class="w-2 h-2 bg-amber rounded-full shrink-0"></span>
                <span class="font-body text-base text-chocolate/70">{{ ing }}</span>
              </div>
              <p class="font-body text-sm text-chocolate/40 mt-5">
                <strong>Allergens:</strong> {{ product.allergens.join(', ') }}
              </p>
            </div>
            <!-- Nutrition -->
            <div v-if="activeTab === 'Nutrition'" class="grid grid-cols-3 gap-3">
              <div v-for="(val, key) in product.nutrition" :key="key"
                class="bg-cream rounded-2xl p-4 text-center border border-amber-100">
                <p class="font-display text-xl font-bold text-chocolate">{{ val }}</p>
                <p class="font-body text-xs text-chocolate/50 capitalize mt-1">{{ key }}</p>
              </div>
            </div>
            <!-- Reviews -->
            <div v-if="activeTab === 'Reviews'" class="space-y-4">
              <div v-for="(r, i) in sampleReviews" :key="i" class="bg-cream rounded-2xl p-7 border border-amber-100">
                <div class="flex items-center justify-between mb-4">
                  <div>
                    <p class="font-body text-base font-semibold text-chocolate">{{ r.name }}</p>
                    <p class="font-body text-sm text-chocolate/40 mt-0.5">{{ r.date }}</p>
                  </div>
                  <div class="flex gap-0.5">
                    <svg v-for="s in r.rating" :key="s" class="w-4 h-4 star-fill" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                    </svg>
                  </div>
                </div>
                <p class="font-body text-base text-chocolate/65 leading-relaxed">{{ r.text }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Related Products -->
    <div class="bg-cream py-24 px-6">
      <div class="max-w-350 mx-auto">
        <SectionHeading eyebrow="You May Also Like" title="Related Products" :center="false" />
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          <ProductCard v-for="p in relatedProducts" :key="p.id" :product="p" />
        </div>
      </div>
    </div>
  </div>

  <!-- 404 state -->
  <div v-else class="pt-40 min-h-screen flex flex-col items-center justify-center text-center px-6">
    <div class="mb-4 text-chocolate/20"><AppIcon name="croissant" :size="72" :stroke-width="1" /></div>
    <h2 class="font-display text-3xl font-bold text-chocolate mb-3">Product Not Found</h2>
    <RouterLink to="/shop" class="btn-back mt-4">Back to Shop</RouterLink>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import gsap from 'gsap'
import ProductCard from '@/components/ui/ProductCard.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { products } from '@/data/products'
import { useCart } from '@/stores/cart'
import { useWishlist } from '@/stores/wishlist'
import { useToast } from '@/stores/toast'

const route = useRoute()
const { addItem, openCart } = useCart()
const { has, toggle } = useWishlist()
const { success } = useToast()

const galleryEl = ref(null)
const infoEl = ref(null)
const qty = ref(1)
const activeTab = ref('Ingredients')
const tabs = ['Ingredients', 'Nutrition', 'Reviews']
const zoomed = ref(false)
const showZoom = ref(false)
const zoomX = ref(50)
const zoomY = ref(50)

const product = computed(() => products.find(p => p.slug === route.params.slug))
const activeImage = ref(product.value?.images[0] || '')
const isWishlisted = computed(() => product.value ? has(product.value.id) : false)

const relatedProducts = computed(() => {
  if (!product.value) return []
  return products.filter(p => p.id !== product.value.id && (p.category === product.value.category || p.isFeatured)).slice(0, 4)
})

const sampleReviews = [
  { name: 'Sarah M.', rating: 5, date: 'June 15, 2026', text: 'Absolutely incredible. The texture, the flavour, the presentation — everything was perfect. I will be ordering again and again.' },
  { name: 'James T.', rating: 5, date: 'June 10, 2026', text: 'Best I\'ve ever had. Was skeptical of the price but it was entirely worth every penny. Ordered for my wife\'s birthday and she was speechless.' },
  { name: 'Amara K.', rating: 4, date: 'June 5, 2026', text: 'Exquisite flavour and beautiful presentation. Delivery was on time. I only wish the portion was slightly larger.' },
]

watch(() => route.params.slug, () => {
  activeImage.value = product.value?.images[0] || ''
  qty.value = 1
})

function addToCart() {
  if (!product.value) return
  addItem(product.value, qty.value)
  success(`${qty.value}× ${product.value.name} added to cart!`)
  openCart()
}

function toggleWishlist() {
  if (!product.value) return
  toggle(product.value)
  success(isWishlisted.value ? 'Added to wishlist!' : 'Removed from wishlist')
}

function onImageZoom(e) {
  if (!showZoom.value) return
  const rect = e.currentTarget.getBoundingClientRect()
  zoomX.value = ((e.clientX - rect.left) / rect.width) * 100
  zoomY.value = ((e.clientY - rect.top) / rect.height) * 100
  zoomed.value = true
}

onMounted(() => {
  if (!product.value) return
  activeImage.value = product.value.images[0]

  const tl = gsap.timeline()
  tl.from(galleryEl.value, { opacity: 0, x: -40, duration: 0.8, ease: 'power3.out' })
    .from(infoEl.value?.children, { opacity: 0, y: 30, stagger: 0.08, duration: 0.6, ease: 'power2.out' }, '-=0.5')
})
</script>

<style scoped>
.btn-add-to-cart {
  display: flex; align-items: center; justify-content: center; gap: 0.5rem;
  background: #3D1F0B; color: #FFF8F0;
  font-family: 'Outfit', system-ui, sans-serif; font-weight: 600;
  padding: 1rem 2rem; border-radius: 1rem;
  transition: all 0.3s; font-size: 0.875rem;
}
.btn-add-to-cart:hover { background: #6B3A20; box-shadow: 0 20px 40px rgba(0,0,0,0.2); transform: scale(1.02); }
.btn-back {
  background: #3D1F0B; color: #FFF8F0;
  padding: 1rem 2rem; border-radius: 1rem;
  font-family: 'Outfit', system-ui, sans-serif; font-weight: 500;
  transition: all 0.3s; display: inline-block;
}
.btn-back:hover { background: #6B3A20; }
</style>
