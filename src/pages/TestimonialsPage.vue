<template>
  <div class="pt-24 min-h-screen bg-warm-white">
    <div class="bg-cream border-b border-amber-100 py-16 px-6">
      <div class="max-w-350 mx-auto">
        <SectionHeading eyebrow="Our Community" title="What People Are Saying" :center="false"
          subtitle="From food critics to loyal locals — hear from the people who know our baking best." />
      </div>
    </div>
    <div class="max-w-350 mx-auto px-6 py-16">
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="t in allTestimonials" :key="t.id"
          class="bg-cream rounded-3xl p-7 border border-amber-100 hover:shadow-xl hover:border-amber/40 transition-all duration-400 flex flex-col group">
          <div class="flex gap-1 mb-5">
            <svg v-for="s in t.rating" :key="s" class="w-4 h-4 star-fill" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
            </svg>
          </div>
          <p class="font-accent text-lg text-chocolate/80 leading-relaxed italic flex-1">"{{ t.text }}"</p>
          <div v-if="t.product" class="mt-4 px-3 py-2 bg-amber/10 rounded-xl inline-block">
            <p class="font-body text-xs text-amber flex items-center gap-1.5">
              <AppIcon name="shoppingbag" :size="12" /> {{ t.product }}
            </p>
          </div>
          <div class="flex items-center gap-3 mt-5">
            <img :src="t.avatar" :alt="t.name" class="w-11 h-11 rounded-full object-cover border-2 border-amber/20" />
            <div>
              <p class="font-body text-sm font-semibold text-chocolate">{{ t.name }}</p>
              <p class="font-body text-xs text-chocolate/40">{{ t.role }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SectionHeading from '@/components/ui/SectionHeading.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { testimonials } from '@/data/products'
const allTestimonials = testimonials
</script>
