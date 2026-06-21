<template>
  <header
    ref="navEl"
    class="fixed top-0 left-0 right-0 z-500 p-5! transition-all duration-500"
    :class="isTransparent ? 'py-6 header-transparent' : 'bg-warm-white/95 backdrop-luxury shadow-sm py-3'"
  >
    <div class="max-w-350 mx-auto px-6 flex items-center justify-between gap-6"
      :style="isTransparent
        ? { '--nav-color': 'rgba(255,255,255,0.92)', '--nav-hover-bg': 'rgba(255,255,255,0.12)', '--nav-hover-color': '#fff' }
        : { '--nav-color': 'rgba(61,31,11,0.8)',    '--nav-hover-bg': 'rgba(245,236,215,0.8)',   '--nav-hover-color': '#3D1F0B' }"
    >
      <!-- Logo -->
      <RouterLink to="/" class="flex items-center gap-3 group" @click="closeMobile">
        <div class="relative w-10 h-10 shrink-0">
          <svg viewBox="0 0 40 40" class="w-full h-full">
            <circle cx="20" cy="20" r="19" stroke="#D4A853" stroke-width="1" fill="none"
              class="group-hover:rotate-45 transition-transform duration-700 origin-center" />
            <text x="20" y="25" text-anchor="middle" font-family="Playfair Display,serif"
              font-size="16" fill="#D4A853" font-weight="600">M</text>
          </svg>
        </div>
        <div class="leading-none">
          <div
            class="font-display font-bold text-xl tracking-tight transition-colors duration-500"
            :class="isTransparent ? 'text-white' : 'text-chocolate'"
          >Maison Dorée</div>
          <div class="font-accent text-amber text-[11px] tracking-[0.25em] uppercase">Artisan Bakery</div>
        </div>
      </RouterLink>

      <!-- Desktop Nav (xl+) -->
      <nav class="hidden xl:flex items-center gap-1">
        <template v-for="item in navItems" :key="item.label">
          <div class="relative group" v-if="item.children">
            <button class="nav-link flex items-center gap-1.5">
              {{ item.label }}
              <AppIcon name="chevrondown" :size="12" class="transition-transform group-hover:rotate-180" />
            </button>
            <div class="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <div class="bg-warm-white border border-amber-100 rounded-2xl shadow-2xl p-2 min-w-50">
                <RouterLink
                  v-for="child in item.children" :key="child.to"
                  :to="child.to"
                  class="flex items-center gap-3 px-4 py-2.5 rounded-xl hover:bg-cream transition-colors duration-200 group/item"
                >
                  <AppIcon :name="child.icon" :size="16" class="text-amber shrink-0" />
                  <div>
                    <div class="font-body text-sm font-medium text-chocolate group-hover/item:text-amber transition-colors">{{ child.label }}</div>
                    <div v-if="child.desc" class="font-body text-xs text-chocolate/50">{{ child.desc }}</div>
                  </div>
                </RouterLink>
              </div>
            </div>
          </div>
          <RouterLink v-else :to="item.to" class="nav-link">{{ item.label }}</RouterLink>
        </template>
      </nav>

      <!-- Actions -->
      <div class="flex items-center gap-2">
        <!-- Search -->
        <button @click="toggleSearch" class="icon-btn hidden md:flex" aria-label="Search">
          <AppIcon name="search" :size="20" />
        </button>
        <!-- Wishlist -->
        <RouterLink to="/wishlist" class="icon-btn hidden md:flex relative" aria-label="Wishlist">
          <AppIcon name="heart" :size="20" />
          <span v-if="wishCount > 0" class="badge">{{ wishCount }}</span>
        </RouterLink>
        <!-- Cart -->
        <button @click="openCart" class="icon-btn relative" aria-label="Cart">
          <AppIcon name="shoppingcart" :size="20" />
          <span v-if="cartCount > 0" class="badge animate-bounce">{{ cartCount }}</span>
        </button>
        <!-- Order CTA -->
        <RouterLink to="/shop" class="hidden lg:flex btn-primary text-sm ml-1">
          Order Now
        </RouterLink>
        <!-- Hamburger (below xl) -->
        <button @click="toggleMobile" class="xl:hidden ml-1 hamburger-btn" aria-label="Menu">
          <span class="hamburger-bar transition-all duration-300 origin-center"
            :class="[isTransparent ? 'bg-white' : 'bg-chocolate', mobileOpen ? 'rotate-45 translate-y-2' : '']"></span>
          <span class="hamburger-bar transition-all duration-300"
            :class="[isTransparent ? 'bg-white' : 'bg-chocolate', mobileOpen ? 'opacity-0 scale-x-0' : '']"></span>
          <span class="hamburger-bar transition-all duration-300 origin-center"
            :class="[isTransparent ? 'bg-white' : 'bg-chocolate', mobileOpen ? '-rotate-45 -translate-y-2' : '']"></span>
        </button>
      </div>
    </div>

    <!-- Search Overlay  -->
    <Teleport to="body">
      <Transition name="search-overlay">
        <div v-if="searchOpen"
          class="fixed inset-0 z-900 bg-chocolate/97 backdrop-blur-sm flex flex-col items-center justify-center px-6"
          @click.self="toggleSearch">
          <button @click="toggleSearch"
            class="absolute top-7 right-7 w-11 h-11 flex items-center justify-center rounded-2xl border border-white/15 text-cream/60 hover:text-cream hover:border-white/40 transition-all">
            <AppIcon name="x" :size="20" />
          </button>
          <p class="font-accent text-amber/80 text-sm tracking-[0.35em] uppercase mb-10">What are you looking for?</p>
          <div class="relative w-full max-w-2xl">
            <AppIcon name="search" :size="22" class="absolute left-6 top-1/2 -translate-y-1/2 text-amber pointer-events-none" />
            <input ref="searchInput" v-model="searchQuery" @input="onSearch" @keydown.escape="toggleSearch"
              type="text" placeholder="sourdough, croissants, cakes..."
              class="w-full pl-16 pr-6 py-5 bg-white/8 border border-white/20 rounded-2xl font-body text-xl text-cream placeholder-cream/25 focus:outline-none focus:border-amber/70 focus:bg-white/12 transition-all" />
          </div>
          <div v-if="searchResults.length" class="w-full max-w-2xl mt-4 bg-warm-white rounded-2xl overflow-hidden shadow-2xl">
            <RouterLink v-for="r in searchResults.slice(0,5)" :key="r.id" :to="`/shop/${r.slug}`"
              @click="toggleSearch"
              class="flex items-center gap-4 px-6 py-4 hover:bg-cream transition-colors border-b border-amber-50 last:border-0 group">
              <img :src="r.images[0]" :alt="r.name" class="w-14 h-14 rounded-xl object-cover shrink-0" />
              <div class="flex-1 min-w-0">
                <div class="font-body text-base font-semibold text-chocolate truncate group-hover:text-amber transition-colors">{{ r.name }}</div>
                <div class="font-body text-sm text-chocolate/50 capitalize mt-0.5">{{ r.category }}</div>
              </div>
              <div class="font-display font-bold text-lg text-amber">${{ r.price.toFixed(2) }}</div>
            </RouterLink>
          </div>
          <p v-else-if="searchQuery" class="mt-8 font-body text-cream/40 text-base">
            No results for "<span class="text-cream/70">{{ searchQuery }}</span>"
          </p>
          <div v-if="!searchQuery" class="mt-10 flex flex-wrap gap-2 justify-center max-w-lg">
            <button v-for="hint in ['Sourdough', 'Croissant', 'Birthday Cake', 'Macarons', 'Tart']" :key="hint"
              @click="searchQuery = hint.toLowerCase(); onSearch()"
              class="px-4 py-2 border border-white/15 rounded-full font-body text-sm text-cream/50 hover:text-cream hover:border-white/40 transition-all">
              {{ hint }}
            </button>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Mobile Menu  -->
    <Teleport to="body">
      <Transition name="mobile-menu">
        <div v-if="mobileOpen" class="fixed inset-0 z-490 bg-warm-white overflow-y-auto" style="padding-top: 80px">
          <nav class="flex flex-col gap-1 px-4 mb-6">
            <RouterLink v-for="item in flatNav" :key="item.to" :to="item.to" @click="closeMobile"
              class="flex items-center gap-3 px-4 py-3.5 rounded-2xl hover:bg-cream font-display text-lg text-chocolate transition-colors">
              <AppIcon :name="item.icon" :size="20" class="text-amber shrink-0" />
              {{ item.label }}
            </RouterLink>
          </nav>
          <div class="flex gap-3 px-4 pb-10">
            <RouterLink to="/cart" @click="closeMobile" class="btn-primary flex-1 justify-center">Cart ({{ cartCount }})</RouterLink>
            <RouterLink to="/wishlist" @click="closeMobile" class="btn-outline flex-1 justify-center">Wishlist</RouterLink>
          </div>
        </div>
      </Transition>
    </Teleport>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useCart } from '@/stores/cart'
import { useWishlist } from '@/stores/wishlist'
import { products } from '@/data/products'
import AppIcon from '@/components/ui/AppIcon.vue'

const route = useRoute()
const isHome = computed(() => route.path === '/')

const { itemCount: cartCount, openCart } = useCart()
const { count: wishCount } = useWishlist()

const scrolled = ref(false)
const mobileOpen = ref(false)
const searchOpen = ref(false)
const searchQuery = ref('')
const searchResults = ref([])
const searchInput = ref(null)

const isTransparent = computed(() => !scrolled.value && !mobileOpen.value && isHome.value)

// Lock body scroll when mobile menu is open
watch(mobileOpen, (val) => {
  document.body.style.overflow = val ? 'hidden' : ''
})

const navItems = [
  { label: 'Shop', children: [
    { to: '/shop', icon: 'shoppingbag', label: 'All Products', desc: 'Browse everything' },
    { to: '/fresh-today', icon: 'sunrise', label: 'Fresh Today', desc: "Today's bakes" },
    { to: '/best-sellers', icon: 'star', label: 'Best Sellers', desc: 'Our most loved' },
    { to: '/seasonal', icon: 'leaf', label: 'Seasonal', desc: 'Limited edition' },
  ]},
  { label: 'Specials', children: [
    { to: '/custom-cakes', icon: 'cake', label: 'Custom Cakes', desc: 'Design your cake' },
    { to: '/bakery-box', icon: 'package', label: 'Bakery Box', desc: 'Build your box' },
    { to: '/categories', icon: 'layoutgrid', label: 'Categories', desc: 'Shop by type' },
  ]},
  { to: '/recipes', label: 'Recipes' },
  { to: '/blog', label: 'Journal' },
  { label: 'About', children: [
    { to: '/our-story', icon: 'bookopen', label: 'Our Story' },
    { to: '/bakers', icon: 'chefhat', label: 'Meet the Bakers' },
    { to: '/gallery', icon: 'image', label: 'Gallery' },
    { to: '/locations', icon: 'mappin', label: 'Locations' },
  ]},
]

const flatNav = [
  { to: '/', label: 'Home', icon: 'home' },
  { to: '/shop', label: 'Shop', icon: 'shoppingbag' },
  { to: '/fresh-today', label: 'Fresh Today', icon: 'sunrise' },
  { to: '/best-sellers', label: 'Best Sellers', icon: 'star' },
  { to: '/seasonal', label: 'Seasonal', icon: 'leaf' },
  { to: '/custom-cakes', label: 'Custom Cakes', icon: 'cake' },
  { to: '/bakery-box', label: 'Bakery Box', icon: 'package' },
  { to: '/recipes', label: 'Recipes', icon: 'scrolltext' },
  { to: '/blog', label: 'Journal', icon: 'bookmarkalt' },
  { to: '/our-story', label: 'Our Story', icon: 'bookopen' },
  { to: '/bakers', label: 'Our Bakers', icon: 'chefhat' },
  { to: '/gallery', label: 'Gallery', icon: 'image' },
  { to: '/locations', label: 'Locations', icon: 'mappin' },
  { to: '/contact', label: 'Contact', icon: 'mail' },
]

function onScroll() { scrolled.value = window.scrollY > 60 }
function toggleMobile() { mobileOpen.value = !mobileOpen.value }
function closeMobile() { mobileOpen.value = false }
function toggleSearch() {
  searchOpen.value = !searchOpen.value
  if (searchOpen.value) nextTick(() => searchInput.value?.focus())
  else { searchQuery.value = ''; searchResults.value = [] }
}

function onSearch() {
  const q = searchQuery.value.toLowerCase().trim()
  if (!q) { searchResults.value = []; return }
  searchResults.value = products.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.tags.some(t => t.includes(q)) ||
    p.category.includes(q)
  )
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* ── Nav links (desktop) — color driven by CSS var set on parent ── */
.nav-link {
  font-family: 'Outfit', system-ui, sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--nav-color, rgba(61, 31, 11, 0.8));
  padding: 0.5rem 0.875rem;
  border-radius: 0.75rem;
  transition: color 0.3s, background 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
}
.nav-link:hover {
  color: var(--nav-hover-color, #3D1F0B);
  background: var(--nav-hover-bg, rgba(245, 236, 215, 0.8));
}

/* ── Icon buttons ── */
.icon-btn {
  width: 2.5rem; height: 2.5rem;
  display: flex; align-items: center; justify-content: center;
  border-radius: 0.75rem;
  color: var(--nav-color, rgba(61, 31, 11, 0.7));
  transition: color 0.3s, background 0.2s;
}
.icon-btn:hover {
  background: var(--nav-hover-bg, rgba(245, 236, 215, 0.8));
  color: var(--nav-hover-color, #3D1F0B);
}

/* ── Hamburger ── */
.hamburger-btn {
  width: 2.5rem; height: 2.5rem;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 6px;
  border-radius: 0.75rem;
  transition: background 0.2s;
}
.hamburger-btn:hover { background: var(--nav-hover-bg, rgba(245, 236, 215, 0.8)); }

.hamburger-bar {
  display: block;
  width: 20px; height: 2px;
  border-radius: 9999px;
}

/* ── Buttons ── */
.btn-primary {
  background: #3D1F0B;
  color: #F5ECD7;
  padding: 0.625rem 1.25rem;
  border-radius: 1rem;
  font-family: 'Outfit', system-ui, sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.3s;
  display: inline-flex; align-items: center;
}
.btn-primary:hover { background: #6B3A20; box-shadow: 0 10px 25px rgba(0,0,0,0.15); }

.btn-outline {
  border: 1px solid rgba(61, 31, 11, 0.2);
  color: #3D1F0B;
  padding: 0.625rem 1.25rem;
  border-radius: 1rem;
  font-family: 'Outfit', system-ui, sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.3s;
  display: inline-flex; align-items: center;
}
.btn-outline:hover { border-color: #D4A853; color: #D4A853; }

/* ── Badge ── */
.badge {
  position: absolute;
  top: -4px; right: -4px;
  width: 18px; height: 18px;
  background: #D4A853;
  color: #3D1F0B;
  font-size: 10px;
  font-weight: 700;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  line-height: 1;
}

/* ── Transitions ── */
.search-overlay-enter-active, .search-overlay-leave-active { transition: all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
.search-overlay-enter-from, .search-overlay-leave-to { opacity: 0; transform: scale(0.97); }

.mobile-menu-enter-active { transition: opacity 0.3s ease, transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
.mobile-menu-leave-active { transition: opacity 0.25s ease, transform 0.3s ease; }
.mobile-menu-enter-from, .mobile-menu-leave-to { opacity: 0; transform: translateY(-12px); }
</style>
