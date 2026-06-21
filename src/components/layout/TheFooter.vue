<template>
  <footer ref="footerEl" class="bg-chocolate text-cream relative overflow-hidden noise">
    <!-- Decorative circles -->
    <div class="absolute top-0 left-0 w-96 h-96 rounded-full bg-amber/5 -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
    <div class="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-amber/5 translate-x-1/3 translate-y-1/3 blur-3xl"></div>

    <!-- Newsletter Banner -->
    <div ref="bannerEl" class="border-b border-white/10">
      <div class="max-w-350 mx-auto px-6 py-20 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <p class="font-accent text-amber text-base tracking-[0.3em] uppercase mb-4">Stay in the loop</p>
          <h2 class="font-display text-5xl font-bold text-cream leading-tight">Fresh from the<br/><em class="gradient-text">oven to your inbox</em></h2>
          <p class="font-body text-cream/60 mt-5 text-base leading-relaxed">Seasonal specials, new arrivals, exclusive recipes,<br/>and a weekly dispatch from our bakers.</p>
        </div>
        <form @submit.prevent="subscribe" class="flex flex-col sm:flex-row gap-3">
          <input v-model="email" type="email" placeholder="your@email.com" required
            class="flex-1 bg-white/10 border border-white/20 rounded-2xl px-5 py-3.5 text-cream placeholder-cream/30 font-body text-sm focus:outline-none focus:border-amber transition-colors" />
          <button type="submit" class="btn-footer-cta whitespace-nowrap flex items-center gap-2">
            <span v-if="!subscribed">Subscribe</span>
            <span v-else class="flex items-center gap-1.5"><AppIcon name="check" :size="14" /> Subscribed!</span>
          </button>
        </form>
      </div>
    </div>

    <!-- Main Footer -->
    <div class="max-w-350 mx-auto px-6 py-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12">
      <!-- Brand -->
      <div class="col-span-2">
        <RouterLink to="/" class="flex items-center gap-3 mb-7 group">
          <svg viewBox="0 0 40 40" class="w-10 h-10">
            <circle cx="20" cy="20" r="19" stroke="#D4A853" stroke-width="1" fill="none"/>
            <text x="20" y="25" text-anchor="middle" font-family="Playfair Display,serif" font-size="16" fill="#D4A853" font-weight="600">M</text>
          </svg>
          <div>
            <div class="font-display text-xl font-bold text-cream">Maison Dorée</div>
            <div class="font-accent text-amber text-[11px] tracking-[0.25em] uppercase">Artisan Bakery</div>
          </div>
        </RouterLink>
        <p class="font-body text-cream/50 text-base leading-relaxed mb-8 max-w-xs">
          Crafting exceptional artisan baked goods with passion, precision, and the finest ingredients since 2009.
        </p>
        <!-- Social links -->
        <div class="flex gap-3">
          <a v-for="s in socials" :key="s.name" :href="s.url" target="_blank"
            class="w-11 h-11 border border-white/15 rounded-xl flex items-center justify-center text-cream/50 hover:text-amber hover:border-amber transition-all duration-300 hover:scale-110">
            <AppIcon :name="s.icon" :size="18" />
          </a>
        </div>
      </div>

      <!-- Links -->
      <div v-for="col in footerCols" :key="col.title">
        <h4 class="font-display text-sm font-semibold text-cream/90 mb-5 tracking-wider uppercase">{{ col.title }}</h4>
        <ul class="flex flex-col gap-3">
          <li v-for="link in col.links" :key="link.to">
            <RouterLink :to="link.to" class="font-body text-base text-cream/50 hover:text-amber transition-colors duration-200 underline-anim">
              {{ link.label }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="border-t border-white/10">
      <div class="max-w-350 mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <p class="font-body text-cream/30 text-xs">© {{ year }} Maison Dorée. All rights reserved.</p>
        <div class="flex items-center gap-6">
          <RouterLink to="/faq" class="font-body text-xs text-cream/30 hover:text-cream/60 transition-colors">Privacy</RouterLink>
          <RouterLink to="/faq" class="font-body text-xs text-cream/30 hover:text-cream/60 transition-colors">Terms</RouterLink>
          <RouterLink to="/delivery" class="font-body text-xs text-cream/30 hover:text-cream/60 transition-colors">Shipping Policy</RouterLink>
        </div>
        <div class="flex items-center gap-2">
          <span class="font-body text-xs text-cream/30">Made with</span>
          <AppIcon name="heart" :size="12" class="text-amber animate-pulse" />
          <span class="font-body text-xs text-cream/30">& great flour</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useToast } from '@/stores/toast'
import AppIcon from '@/components/ui/AppIcon.vue'

const { success } = useToast()
const email = ref('')
const subscribed = ref(false)
const year = new Date().getFullYear()
const footerEl = ref(null)
const bannerEl = ref(null)

const socials = [
  { name: 'Instagram', icon: 'instagram', url: '#' },
  { name: 'Pinterest', icon: 'bookmarkalt', url: '#' },
  { name: 'Facebook', icon: 'facebook', url: '#' },
  { name: 'TikTok', icon: 'music', url: '#' },
]

const footerCols = [
  {
    title: 'Shop',
    links: [
      { to: '/fresh-today', label: 'Fresh Today' },
      { to: '/best-sellers', label: 'Best Sellers' },
      { to: '/seasonal', label: 'Seasonal' },
      { to: '/custom-cakes', label: 'Custom Cakes' },
      { to: '/bakery-box', label: 'Bakery Box' },
    ],
  },
  {
    title: 'Discover',
    links: [
      { to: '/recipes', label: 'Recipes' },
      { to: '/blog', label: 'Journal' },
      { to: '/gallery', label: 'Gallery' },
      { to: '/our-story', label: 'Our Story' },
      { to: '/bakers', label: 'Meet the Bakers' },
    ],
  },
  {
    title: 'Help',
    links: [
      { to: '/faq', label: 'FAQ' },
      { to: '/delivery', label: 'Delivery Info' },
      { to: '/contact', label: 'Contact Us' },
      { to: '/locations', label: 'Find a Store' },
      { to: '/careers', label: 'Careers' },
    ],
  },
]

function subscribe() {
  subscribed.value = true
  success(`Welcome! You're on the list — check your inbox.`)
  setTimeout(() => { subscribed.value = false; email.value = '' }, 3000)
}

onMounted(() => {
  gsap.from(footerEl.value?.querySelectorAll('h4, p, a, input, button') || [], {
    y: 20,
    stagger: 0.02, duration: 0.6, ease: 'power2.out',
    scrollTrigger: { trigger: footerEl.value, start: 'top 95%', once: true },
  })
})
</script>

<style scoped>
.btn-footer-cta {
  background: #D4A853;
  color: #3D1F0B;
  font-family: 'Outfit', system-ui, sans-serif;
  font-weight: 600;
  padding: 0.875rem 1.5rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  transition: all 0.3s;
  white-space: nowrap;
}
.btn-footer-cta:hover { background: #E8C47A; box-shadow: 0 10px 25px rgba(0,0,0,0.15); transform: scale(1.05); }
</style>
