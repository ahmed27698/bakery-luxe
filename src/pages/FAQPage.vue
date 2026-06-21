<template>
  <div class="pt-24 min-h-screen bg-warm-white">
    <div class="bg-cream border-b border-amber-100 py-24 px-6">
      <div class="max-w-350 mx-auto">
        <p class="font-accent text-amber text-sm tracking-[0.35em] uppercase mb-4">— Help Centre —</p>
        <h1 class="font-display text-6xl md:text-7xl font-bold text-chocolate leading-tight">Frequently Asked<br /><em class="text-amber">Questions</em></h1>
        <p class="font-body text-chocolate/55 mt-5 max-w-xl text-lg leading-relaxed">Everything you need to know about ordering, delivery, and our products.</p>
      </div>
    </div>
    <div class="max-w-3xl mx-auto px-6 py-20">
      <div class="space-y-3">
        <div v-for="(faq, i) in allFaqs" :key="i"
          class="bg-cream rounded-2xl border border-amber-100 overflow-hidden hover:border-amber/30 hover:shadow-md transition-all duration-300">
          <button @click="toggle(i)"
            class="w-full flex items-center justify-between px-8 py-6 text-left group">
            <span class="font-display font-semibold text-chocolate text-xl">{{ faq.q }}</span>
            <span class="w-8 h-8 rounded-xl bg-amber/10 text-amber text-xl flex items-center justify-center shrink-0 ml-4 transition-all duration-300" :class="open === i ? 'rotate-45 bg-amber/20' : ''">+</span>
          </button>
          <Transition name="accordion">
            <div v-if="open === i" class="px-8 pb-7 border-t border-amber-50">
              <p class="font-body text-base text-chocolate/65 leading-relaxed pt-5">{{ faq.a }}</p>
            </div>
          </Transition>
        </div>
      </div>

      <!-- Still need help? -->
      <div class="mt-20 bg-chocolate rounded-3xl p-12 text-center noise">
        <h3 class="font-display text-3xl font-bold text-cream mb-4">Still have questions?</h3>
        <p class="font-body text-cream/60 mb-8 text-base">Our team is always happy to help.</p>
        <RouterLink to="/contact" class="inline-block bg-amber text-chocolate font-body font-bold px-8 py-4 rounded-2xl hover:bg-amber-light transition-all duration-300 hover:scale-105">
          Contact Us
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { faqs } from '@/data/products'
const allFaqs = faqs
const open = ref(null)
function toggle(i) { open.value = open.value === i ? null : i }
</script>
