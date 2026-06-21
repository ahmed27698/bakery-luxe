<template>
  <div ref="el" class="section-heading" :class="centerClass">
    <p v-if="eyebrow" class="font-accent text-amber text-base tracking-[0.35em] uppercase mb-4 eyebrow-line">
      — {{ eyebrow }} —
    </p>
    <h2 class="font-display leading-tight heading-text" :class="sizeClass">
      <slot>{{ title }}</slot>
    </h2>
    <p v-if="subtitle" class="font-body text-base text-chocolate/55 mt-5 max-w-2xl leading-relaxed subtitle-text" :class="center ? 'mx-auto' : ''">
      {{ subtitle }}
    </p>
    <div v-if="line" class="line-deco mt-6" :class="center ? 'mx-auto' : ''"></div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

const props = defineProps({
  eyebrow: String,
  title: String,
  subtitle: String,
  center: { type: Boolean, default: false },
  size: { type: String, default: 'lg' }, // sm | lg | xl
  line: { type: Boolean, default: true },
  animate: { type: Boolean, default: true },
})

const el = ref(null)
const centerClass = computed(() => props.center ? 'text-center' : '')
const sizeClass = computed(() => ({
  sm: 'text-3xl md:text-4xl',
  lg: 'text-4xl md:text-5xl lg:text-6xl',
  xl: 'text-5xl md:text-6xl lg:text-7xl',
}[props.size] || 'text-4xl md:text-5xl lg:text-6xl'))

onMounted(() => {
  if (!props.animate || !el.value) return
  const eyebrow = el.value.querySelector('.eyebrow-line')
  const heading = el.value.querySelector('.heading-text')
  const subtitle = el.value.querySelector('.subtitle-text')
  const lineDeco = el.value.querySelector('.line-deco')
  const tl = gsap.timeline({
    scrollTrigger: { trigger: el.value, start: 'top 92%', once: true }
  })
  if (eyebrow) tl.from(eyebrow, { y: 16, duration: 0.5 }, 0)
  if (heading) tl.from(heading, { y: 32, duration: 0.8, ease: 'power3.out' }, 0.1)
  if (subtitle) tl.from(subtitle, { y: 16, duration: 0.6 }, 0.35)
  if (lineDeco) tl.from(lineDeco, { scaleX: 0, duration: 0.7, ease: 'power3.out' }, 0.5)
})
</script>

<style scoped>
.line-deco {
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, #D4A853, #E8C47A);
  border-radius: 1px;
}
</style>
