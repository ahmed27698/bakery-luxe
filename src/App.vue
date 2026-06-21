<template>
  <!-- Loading Screen -->
  <Transition name="loading-fade">
    <div v-if="loading" class="loading-screen" ref="loadingEl">
      <div class="flex flex-col items-center gap-6">
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="38" stroke="#D4A853" stroke-width="1.5"
            :stroke-dasharray="240" :stroke-dashoffset="loadingProgress" style="transition: stroke-dashoffset 0.05s linear;" />
          <text x="40" y="47" text-anchor="middle" font-family="Playfair Display,serif" font-size="22" fill="#D4A853">M</text>
        </svg>
        <div class="w-56 h-px bg-white/10 rounded-full overflow-hidden">
          <div class="h-full bg-gradient-to-r from-amber-700 to-amber-400 rounded-full transition-all duration-100"
            :style="`width: ${loadingPct}%`"></div>
        </div>
        <p class="font-accent text-amber-400/60 text-xs tracking-[0.3em] uppercase">Crafting your experience</p>
      </div>
    </div>
  </Transition>

  <!-- Page Transition Overlay -->
  <div class="page-overlay" ref="overlayEl"></div>

  <!-- Custom Cursor (hidden on touch) -->
  <div class="cursor hidden md:block" ref="cursorEl"></div>
  <div class="cursor-follower hidden md:block" ref="followerEl"></div>

  <!-- Toast Notifications -->
  <div class="fixed top-6 right-6 z-[9990] flex flex-col gap-3 pointer-events-none" style="max-width: 360px">
    <TransitionGroup name="toast">
      <div
        v-for="toast in toastState.toasts" :key="toast.id"
        class="pointer-events-auto flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl border"
        :class="toastClass(toast.type)"
        style="backdrop-filter: blur(20px)"
      >
        <AppIcon :name="toastIconName(toast.type)" :size="18" class="flex-shrink-0" />
        <span class="font-body text-sm leading-snug">{{ toast.message }}</span>
      </div>
    </TransitionGroup>
  </div>

  <!-- Cart Sidebar -->
  <CartSidebar />

  <!-- App Layout -->
  <div v-if="!loading">
    <TheNavbar />
    <main>
      <RouterView v-slot="{ Component, route }">
        <Transition name="page" mode="out-in">
          <component :is="Component" :key="route.path" />
        </Transition>
      </RouterView>
    </main>
    <TheFooter />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import TheNavbar from '@/components/layout/TheNavbar.vue'
import TheFooter from '@/components/layout/TheFooter.vue'
import CartSidebar from '@/components/shop/CartSidebar.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { useToast } from '@/stores/toast'

gsap.registerPlugin(ScrollTrigger)

const { state: toastState } = useToast()
const loading = ref(true)
const loadingEl = ref(null)
const overlayEl = ref(null)
const cursorEl = ref(null)
const followerEl = ref(null)
const loadingProgress = ref(240)
const loadingPct = ref(0)

onMounted(() => {
  // Animate loading bar
  let pct = 0
  const interval = setInterval(() => {
    pct += Math.random() * 18 + 5
    if (pct >= 100) {
      pct = 100
      clearInterval(interval)
      setTimeout(() => { loading.value = false }, 300)
    }
    loadingPct.value = pct
    loadingProgress.value = 240 - (240 * pct / 100)
  }, 80)

  // Custom cursor
  let mouseX = window.innerWidth / 2
  let mouseY = window.innerHeight / 2
  let fx = mouseX, fy = mouseY

  gsap.set(cursorEl.value, { xPercent: -50, yPercent: -50, x: mouseX, y: mouseY })
  gsap.set(followerEl.value, { xPercent: -50, yPercent: -50, x: mouseX, y: mouseY })

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
    if (cursorEl.value) gsap.to(cursorEl.value, { x: mouseX, y: mouseY, duration: 0.08, ease: 'none' })
  })

  const tickFollower = () => {
    fx += (mouseX - fx) * 0.1
    fy += (mouseY - fy) * 0.1
    if (followerEl.value) gsap.set(followerEl.value, { x: fx, y: fy })
    requestAnimationFrame(tickFollower)
  }
  tickFollower()

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest('a, button, [data-hover], .cursor-pointer')) {
      cursorEl.value?.classList.add('hovering')
      followerEl.value?.classList.add('hovering')
    }
  })
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest('a, button, [data-hover], .cursor-pointer')) {
      cursorEl.value?.classList.remove('hovering')
      followerEl.value?.classList.remove('hovering')
    }
  })
})

function toastClass(type) {
  const m = {
    success: 'bg-white/90 border-amber-200 text-chocolate',
    error: 'bg-red-50/90 border-red-200 text-red-900',
    info: 'bg-amber-50/95 border-amber-300 text-chocolate',
  }
  return m[type] || m.success
}
function toastIconName(type) {
  return { success: 'check', error: 'x', info: 'info' }[type] || 'check'
}
</script>

<style scoped>
.loading-fade-leave-active { transition: opacity 0.6s ease; }
.loading-fade-leave-to { opacity: 0; }
</style>
