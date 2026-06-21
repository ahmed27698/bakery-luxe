<template>
  <div class="pt-24 min-h-screen bg-warm-white">
    <!-- Hero -->
    <div class="bg-chocolate noise relative overflow-hidden py-24 px-6">
      <div class="absolute top-0 left-0 w-96 h-96 rounded-full bg-amber/5 -translate-x-1/2 -translate-y-1/2 blur-3xl pointer-events-none"></div>
      <div class="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-amber/5 translate-x-1/3 translate-y-1/3 blur-3xl pointer-events-none"></div>
      <div class="max-w-350 mx-auto relative z-10">
        <p class="font-accent text-amber text-sm tracking-[0.35em] uppercase mb-4">— Shipping —</p>
        <h1 class="font-display text-6xl md:text-7xl font-bold text-cream leading-tight">
          Delivery <em class="gradient-text">Information</em>
        </h1>
        <p class="font-body text-cream/60 mt-5 max-w-xl text-lg leading-relaxed">
          Fresh, fast, and carefully packaged. Here's everything you need to know about getting your order to your door.
        </p>
      </div>
    </div>

    <div class="max-w-350 mx-auto px-6 py-20">
      <!-- Delivery tiers -->
      <div class="grid md:grid-cols-2 gap-8 mb-20">
        <div v-for="tier in deliveryTiers" :key="tier.title"
          class="bg-cream rounded-3xl p-10 border hover:shadow-2xl transition-all duration-400 group"
          :class="tier.highlight ? 'border-amber/50 bg-amber/5 shadow-lg' : 'border-amber-100'">
          <!-- Icon -->
          <div class="w-16 h-16 rounded-2xl flex items-center justify-center mb-7 transition-all duration-300 group-hover:scale-110"
            :class="tier.highlight ? 'bg-amber/20 text-amber' : 'bg-chocolate/8 text-chocolate'">
            <AppIcon :name="tier.icon" :size="32" :stroke-width="1.25" />
          </div>
          <h3 class="font-display text-2xl font-bold text-chocolate">{{ tier.title }}</h3>
          <p class="font-display text-4xl font-bold mt-2" :class="tier.highlight ? 'gradient-text' : 'text-chocolate'">{{ tier.price }}</p>
          <p class="font-body text-base text-chocolate/50 mt-1">{{ tier.time }}</p>
          <ul class="mt-7 space-y-3">
            <li v-for="f in tier.features" :key="f" class="flex items-center gap-3 font-body text-base text-chocolate/70">
              <span class="w-5 h-5 rounded-full bg-amber/15 flex items-center justify-center shrink-0">
                <AppIcon name="check" :size="12" class="text-amber" />
              </span>
              {{ f }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Info strip -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
        <div v-for="info in deliveryStats" :key="info.label"
          class="bg-cream rounded-2xl p-6 border border-amber-100 text-center">
          <div class="w-12 h-12 rounded-xl bg-amber/10 flex items-center justify-center mx-auto mb-4 text-amber">
            <AppIcon :name="info.icon" :size="24" :stroke-width="1.5" />
          </div>
          <p class="font-display text-xl font-bold text-chocolate">{{ info.value }}</p>
          <p class="font-body text-sm text-chocolate/50 mt-1">{{ info.label }}</p>
        </div>
      </div>

      <!-- FAQs -->
      <div>
        <h2 class="font-display text-3xl font-bold text-chocolate mb-8">Delivery FAQs</h2>
        <div class="space-y-4">
          <div v-for="(faq, i) in deliveryFaqs" :key="i"
            class="bg-cream rounded-2xl border border-amber-100 hover:border-amber/30 hover:shadow-md transition-all duration-300 overflow-hidden">
            <div class="px-8 py-6">
              <div class="flex items-start gap-4">
                <span class="w-7 h-7 rounded-full bg-amber/15 text-amber font-display font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                  {{ i + 1 }}
                </span>
                <div>
                  <h4 class="font-display text-lg font-semibold text-chocolate mb-3">{{ faq.q }}</h4>
                  <p class="font-body text-base text-chocolate/65 leading-relaxed">{{ faq.a }}</p>
                </div>
              </div>
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

const deliveryTiers = [
  {
    icon: 'truck',
    title: 'Standard Delivery',
    price: '$6.99',
    time: '2-4 hours · 25-mile radius',
    highlight: false,
    features: ['Temperature-controlled packaging', 'Real-time GPS tracking', 'Order by 2pm for same day', 'Signature optional'],
  },
  {
    icon: 'zap',
    title: 'Free Delivery',
    price: 'Free',
    time: 'On orders over $50',
    highlight: true,
    features: ['All standard features included', 'Priority handling & dispatch', 'Signature required option', 'Gift note & premium packaging'],
  },
]

const deliveryStats = [
  { icon: 'clock', value: '2-4h', label: 'Average delivery time' },
  { icon: 'mappin', value: '25mi', label: 'Delivery radius' },
  { icon: 'calendar', value: '7 days', label: 'We deliver every day' },
  { icon: 'package', value: '100%', label: 'Insulated packaging' },
]

const deliveryFaqs = [
  { q: 'When is the delivery cutoff?', a: 'Same-day delivery orders must be placed by 2:00 PM. Orders placed after 2pm will be delivered the following morning between 8am and 11am.' },
  { q: 'How is fresh bread kept fresh during delivery?', a: 'Bread is wrapped in wax paper, then kraft paper. Pastries and cakes are in our insulated signature boxes. Everything is dispatched within minutes of baking and delivered within 2–4 hours.' },
  { q: 'What if I\'m not home?', a: 'You can specify a safe place at checkout. If no safe place is available, we\'ll attempt a second delivery the same day or you can collect from your nearest location at no extra charge.' },
  { q: 'Do you deliver on Sundays?', a: 'Yes! We deliver 7 days a week including bank holidays. Sunday hours are 8am–4pm with last orders at 12pm noon.' },
]
</script>
