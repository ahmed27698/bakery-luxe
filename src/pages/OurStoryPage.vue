<template>
  <div class="pt-24 min-h-screen bg-warm-white">
    <section class="bg-chocolate noise relative overflow-hidden py-32 px-6">
      <div class="absolute inset-0 opacity-20">
        <img src="https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=1400&q=85" alt="" class="w-full h-full object-cover" />
      </div>
      <div class="max-w-350 mx-auto relative z-10">
        <p class="font-accent text-amber text-sm tracking-[0.3em] uppercase mb-4">Since 2009</p>
        <h1 class="font-display text-6xl md:text-7xl font-bold text-cream leading-tight max-w-3xl">The Story Behind the <em class="gradient-text">Bread</em></h1>
      </div>
    </section>

    <!-- Timeline -->
    <section class="py-28 px-6 max-w-225 mx-auto">
      <div class="relative">
        <!-- Line -->
        <div class="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-amber/20"></div>
        <div class="space-y-20">
          <div v-for="(event, i) in timeline" :key="i"
            class="relative grid md:grid-cols-2 gap-10 items-center"
            :class="i % 2 === 0 ? '' : 'md:[direction:rtl]'">
            <div class="md:text-right" :class="i % 2 !== 0 ? 'md:[direction:ltr]' : ''">
              <span class="font-accent text-sm text-amber font-semibold tracking-[0.3em] uppercase">{{ event.year }}</span>
              <h3 class="font-display text-2xl font-bold text-chocolate mt-2">{{ event.title }}</h3>
              <p class="font-body text-base text-chocolate/65 mt-4 leading-relaxed">{{ event.desc }}</p>
            </div>
            <!-- Circle on line -->
            <div class="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-amber rounded-full border-4 border-warm-white shadow-md"></div>
            <div v-if="event.image" class="rounded-3xl overflow-hidden aspect-video">
              <img :src="event.image" :alt="event.title" class="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const timeline = [
  { year: '2009', title: 'The Apartment Kitchen', desc: 'Isabelle returned from Paris with a starter culture, borrowed equipment, and a dream. She sold sourdough loaves to neighbours from her apartment window every Saturday morning.', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=85' },
  { year: '2011', title: 'Our First Location', desc: 'The demand outgrew the apartment. We opened a 400 sq ft bakery in the Riviera District with one oven, two employees, and a six-person wait list every morning.', image: null },
  { year: '2014', title: 'The Pastry Revolution', desc: 'Chef Yuki joined the team, bringing Japanese precision and a passion for chocolate that transformed our pastry programme entirely.', image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=600&q=85' },
  { year: '2018', title: 'Meilleur Ouvrier de France', desc: 'Isabelle received France\'s highest artisan honour. We celebrated by releasing 200 free loaves to the neighbourhood.', image: null },
  { year: '2020', title: 'The Pandemic Pivot', desc: 'We launched same-day delivery and our online shop. What started as survival became our fastest-growing channel.', image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=600&q=85' },
  { year: '2026', title: 'Three Locations, One Vision', desc: 'We now operate three locations and deliver across 25 miles. The obsession with quality hasn\'t changed. Only the scale.', image: null },
]
</script>
