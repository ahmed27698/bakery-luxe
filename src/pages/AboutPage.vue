<template>
  <div class="pt-24 min-h-screen bg-warm-white">
    <section class="bg-chocolate relative overflow-hidden noise py-28 px-6">
      <div class="absolute inset-0 opacity-20" style="background: radial-gradient(circle at 70% 50%, #D4A853 0%, transparent 60%)"></div>
      <div class="max-w-350 mx-auto relative z-10 text-center">
        <p class="font-accent text-amber text-sm tracking-[0.3em] uppercase mb-4">Our Journey</p>
        <h1 class="font-display text-6xl md:text-7xl font-bold text-cream leading-tight">About <em class="gradient-text">Maison Dorée</em></h1>
        <p class="font-body text-cream/60 text-lg max-w-2xl mx-auto mt-6 leading-relaxed">A story of passion, craft, and an unwavering commitment to the extraordinary.</p>
      </div>
    </section>

    <section class="py-32 px-6 max-w-350 mx-auto">
      <div class="grid lg:grid-cols-2 gap-20 items-center">
        <div>
          <SectionHeading eyebrow="Founded 2009" title="Born From a Parisian Dream" :center="false" />
          <div class="space-y-6 mt-10">
            <p class="font-body text-base text-chocolate/70 leading-relaxed">Chef Isabelle Moreau spent seven years training in Paris — first at the École Ferrandi, then under the legendary Pierre Hermé — before returning home with a vision that would change how her city thought about baked goods.</p>
            <p class="font-body text-base text-chocolate/70 leading-relaxed">She opened Maison Dorée in a 400 sq ft space with a single oven, a 15-year-old sourdough starter she'd cultivated in Paris, and an obsessive commitment to craft that her early customers found either inspiring or alarming.</p>
            <p class="font-body text-base text-chocolate/70 leading-relaxed">Fifteen years later, three locations, numerous awards, and over 12,000 loyal customers later, the obsession hasn't changed. Only the space has grown.</p>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-6">
          <div class="rounded-3xl overflow-hidden aspect-3/4">
            <img src="https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=600&q=85" alt="Chef" class="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </div>
          <div class="rounded-3xl overflow-hidden aspect-3/4 mt-10">
            <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=85" alt="Baking" class="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="py-32 bg-cream px-6">
      <div class="max-w-350 mx-auto">
        <SectionHeading eyebrow="Our Values" title="What We Believe" center />
        <div class="grid md:grid-cols-3 gap-10 mt-16">
          <div v-for="v in values" :key="v.title"
            class="text-center group bg-warm-white rounded-3xl p-10 border border-amber-100 hover:border-amber/40 hover:shadow-xl transition-all duration-400">
            <div class="w-24 h-24 mx-auto mb-7 bg-amber/10 rounded-3xl flex items-center justify-center text-amber group-hover:bg-amber/20 group-hover:scale-110 transition-all duration-300">
              <AppIcon :name="v.icon" :size="48" :stroke-width="1.25" />
            </div>
            <h3 class="font-display text-2xl font-bold text-chocolate mb-4">{{ v.title }}</h3>
            <p class="font-body text-base text-chocolate/60 leading-relaxed">{{ v.desc }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import SectionHeading from '@/components/ui/SectionHeading.vue'
import AppIcon from '@/components/ui/AppIcon.vue'

const values = [
  { icon: 'leaf', title: 'Sustainability', desc: 'Local sourcing, zero-waste baking, biodegradable packaging. We believe the best ingredients come from healthy ecosystems.' },
  { icon: 'target', title: 'Precision', desc: 'Every gram measured. Every temperature monitored. Every timing respected. Precision is the foundation of consistency.' },
  { icon: 'heart', title: 'Community', desc: 'We partner with local farms, mentor aspiring bakers, and give 2% of revenue to food security initiatives.' },
]
</script>
