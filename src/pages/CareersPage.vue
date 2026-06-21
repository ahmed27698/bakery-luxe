<template>
  <div class="pt-24 min-h-screen bg-warm-white">
    <section class="bg-chocolate noise relative overflow-hidden py-28 px-6">
      <div class="max-w-350 mx-auto relative z-10">
        <p class="font-accent text-amber text-sm tracking-[0.3em] uppercase mb-4">Join Our Team</p>
        <h1 class="font-display text-6xl md:text-7xl font-bold text-cream leading-tight">Work With the <em class="gradient-text">Best</em></h1>
        <p class="font-body text-cream/60 mt-5 max-w-xl text-lg">We're always looking for passionate, talented people who share our obsession with craft.</p>
      </div>
    </section>

    <section class="py-28 px-6 max-w-350 mx-auto">
      <SectionHeading eyebrow="Open Positions" title="Current Opportunities" center />
      <div class="grid md:grid-cols-2 gap-8 mt-16">
        <div v-for="job in openings" :key="job.title"
          class="bg-cream rounded-3xl p-9 border border-amber-100 hover:border-amber/40 hover:shadow-xl transition-all duration-400 group">
          <div class="flex items-start justify-between gap-4 mb-6">
            <div>
              <span class="font-body text-sm px-4 py-1.5 bg-amber/10 text-amber rounded-full font-medium">{{ job.type }}</span>
              <h3 class="font-display text-2xl font-bold text-chocolate mt-4">{{ job.title }}</h3>
              <p class="font-body text-base text-chocolate/50 mt-2">{{ job.location }} · {{ job.department }}</p>
            </div>
            <div class="w-16 h-16 bg-amber/10 rounded-2xl flex items-center justify-center shrink-0 text-amber group-hover:bg-amber/20 transition-colors group-hover:scale-110 duration-300">
              <AppIcon :name="job.icon" :size="32" :stroke-width="1.25" />
            </div>
          </div>
          <p class="font-body text-base text-chocolate/65 leading-relaxed">{{ job.desc }}</p>
          <button class="mt-7 px-7 py-3.5 bg-chocolate text-cream rounded-2xl text-base font-body font-medium hover:bg-chocolate-light transition-all duration-300 hover:scale-105">
            Apply Now
          </button>
        </div>
      </div>
    </section>

    <!-- Culture -->
    <section class="py-28 bg-cream px-6">
      <div class="max-w-350 mx-auto">
        <SectionHeading eyebrow="Our Culture" title="Why Join Maison Dorée?" center />
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          <div v-for="perk in perks" :key="perk.title"
            class="text-center group bg-warm-white rounded-3xl p-8 border border-amber-100 hover:border-amber/40 hover:shadow-lg transition-all duration-300">
            <div class="w-20 h-20 mx-auto mb-6 bg-amber/10 rounded-3xl flex items-center justify-center text-amber group-hover:bg-amber/20 group-hover:scale-110 transition-all duration-300">
              <AppIcon :name="perk.icon" :size="40" :stroke-width="1.25" />
            </div>
            <h4 class="font-display text-lg font-bold text-chocolate mb-2">{{ perk.title }}</h4>
            <p class="font-body text-sm text-chocolate/55 leading-relaxed">{{ perk.desc }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import SectionHeading from '@/components/ui/SectionHeading.vue'
import AppIcon from '@/components/ui/AppIcon.vue'

const openings = [
  { icon: 'croissant', title: 'Pastry Chef – Entremets', department: 'Pastry', location: 'Riviera District', type: 'Full Time', desc: 'We\'re seeking a skilled pastry chef with experience in entremets and mirror glazes to join our flagship location team.' },
  { icon: 'wheat', title: 'Artisan Bread Baker', department: 'Bread', location: 'The Promenade', type: 'Full Time', desc: 'A passion for sourdough and long-fermentation methods is essential. 4am starts, outstanding bread.' },
  { icon: 'shoppingbag', title: 'Retail & Customer Experience', department: 'Front of House', location: 'All Locations', type: 'Part Time', desc: 'You\'ll be the first face our customers see. A love of food and warmth of character are essential.' },
  { icon: 'package', title: 'Delivery Driver & Packager', department: 'Logistics', location: 'Central Hub', type: 'Full Time', desc: 'Ensure our bakes arrive in perfect condition, on time, with care. A clean licence and a love of early mornings required.' },
]

const perks = [
  { icon: 'banknote', title: 'Competitive Pay', desc: 'Above industry standard with regular reviews' },
  { icon: 'bookopen', title: 'Training & Growth', desc: 'Access to our in-house training programme and Paris masterclasses' },
  { icon: 'utensils', title: 'Daily Staff Meals', desc: 'Eat what we make — every single day' },
  { icon: 'badge', title: 'Health Benefits', desc: 'Full health, dental & vision coverage' },
]
</script>
