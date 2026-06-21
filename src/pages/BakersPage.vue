<template>
  <div class="pt-24 min-h-screen bg-warm-white">
    <div class="bg-chocolate noise relative overflow-hidden py-24 px-6">
      <div class="max-w-350 mx-auto text-center relative z-10">
        <p class="font-accent text-amber text-sm tracking-[0.3em] uppercase mb-3">The Craftspeople</p>
        <h1 class="font-display text-6xl font-bold text-cream">Meet Our <em class="gradient-text">Bakers</em></h1>
        <p class="font-body text-cream/60 mt-4 max-w-xl mx-auto">The hands and hearts behind every item on our menu. Over 60 combined years of artisan craft.</p>
      </div>
    </div>

    <div class="max-w-350 mx-auto px-6 py-20">
      <div class="grid md:grid-cols-3 gap-12">
        <div v-for="(baker, i) in allBakers" :key="baker.id"
          class="group baker-profile" ref="bakerCards">
          <div class="relative mb-6">
            <div class="aspect-4/5 rounded-3xl overflow-hidden">
              <img :src="baker.image" :alt="baker.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div class="absolute -bottom-4 -right-4 bg-amber text-chocolate rounded-2xl px-4 py-2 shadow-xl">
              <p class="font-body text-xs font-semibold">{{ baker.experience }}</p>
              <p class="font-body text-xs text-chocolate/60">Experience</p>
            </div>
          </div>
          <h3 class="font-display text-2xl font-bold text-chocolate">{{ baker.name }}</h3>
          <p class="font-body text-amber text-base mt-1.5 font-medium">{{ baker.role }}</p>
          <p class="font-body text-base text-chocolate/65 mt-5 leading-relaxed">{{ baker.bio }}</p>
          <div class="mt-6">
            <p class="font-body text-xs text-chocolate/40 uppercase tracking-wider mb-2">Specialty</p>
            <p class="font-accent text-base text-chocolate/80 italic">{{ baker.specialty }}</p>
          </div>
          <div class="mt-6 space-y-2.5">
            <p class="font-body text-xs text-chocolate/40 uppercase tracking-wider mb-3">Awards</p>
            <div v-for="award in baker.awards" :key="award"
              class="flex items-center gap-2.5 font-body text-sm text-chocolate/65">
              <AppIcon name="trophy" :size="14" class="text-amber shrink-0" /> {{ award }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { bakers } from '@/data/products'
import AppIcon from '@/components/ui/AppIcon.vue'
const allBakers = bakers
const bakerCards = ref([])

onMounted(() => {
  gsap.from('.baker-profile', {
    y: 60, stagger: 0.2, duration: 1, ease: 'power3.out',
    scrollTrigger: { trigger: '.baker-profile', start: 'top 90%', once: true }
  })
})
</script>
