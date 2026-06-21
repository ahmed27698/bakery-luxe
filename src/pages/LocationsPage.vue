<template>
  <div class="pt-24 min-h-screen bg-warm-white">
    <!-- Hero -->
    <div class="bg-cream border-b border-amber-100 py-24 px-6">
      <div class="max-w-350 mx-auto">
        <p class="font-accent text-amber text-sm tracking-[0.35em] uppercase mb-4">— Find Us —</p>
        <h1 class="font-display text-6xl md:text-7xl font-bold text-chocolate leading-tight">Our <em class="text-amber">Locations</em></h1>
        <p class="font-body text-chocolate/55 mt-5 max-w-xl text-lg leading-relaxed">
          Three locations across the city — all baking to the same uncompromising standard, every single morning.
        </p>
      </div>
    </div>

    <div class="max-w-350 mx-auto px-6 py-20">
      <div class="grid lg:grid-cols-3 gap-8">
        <div v-for="loc in allLocations" :key="loc.id"
          class="bg-cream rounded-3xl border border-amber-100 overflow-hidden hover:shadow-2xl hover:border-amber/40 transition-all duration-500 group flex flex-col">
          <!-- Map thumbnail -->
          <div class="h-52 bg-linear-to-br from-amber/10 to-amber/20 flex items-center justify-center relative overflow-hidden shrink-0 ">
            <div class="absolute inset-0 opacity-30" style="background: url('https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=600&q=50') center/cover no-repeat;"></div>
            <div class="relative z-10 text-center">
              <div class="mb-3 flex justify-center text-amber group-hover:scale-125 transition-transform duration-500">
                <AppIcon name="mappin" :size="44" :stroke-width="1.25" />
              </div>
              <p class="font-body text-sm text-chocolate/80 font-semibold">{{ loc.name }}</p>
            </div>
          </div>

          <!-- Content -->
          <div class="p-9 flex flex-col flex-1">
            <div v-if="loc.isMain" class="inline-block px-3 py-1.5 bg-amber/10 text-amber text-xs rounded-full font-body font-semibold mb-4 self-start">Main Location</div>
            <h3 class="font-display text-2xl font-bold text-chocolate">{{ loc.name }}</h3>

            <div class="mt-6 space-y-4 flex-1">
              <div class="flex items-start gap-4">
                <div class="w-9 h-9 rounded-xl bg-amber/10 flex items-center justify-center shrink-0 text-amber mt-0.5">
                  <AppIcon name="mappin" :size="16" />
                </div>
                <p class="font-body text-base text-chocolate/65 leading-snug pt-1.5">{{ loc.address }}</p>
              </div>
              <div class="flex items-center gap-4">
                <div class="w-9 h-9 rounded-xl bg-amber/10 flex items-center justify-center shrink-0 text-amber">
                  <AppIcon name="phone" :size="16" />
                </div>
                <p class="font-body text-base text-chocolate/65">{{ loc.phone }}</p>
              </div>
              <div class="flex items-start gap-4">
                <div class="w-9 h-9 rounded-xl bg-amber/10 flex items-center justify-center shrink-0 text-amber mt-0.5">
                  <AppIcon name="clock" :size="16" />
                </div>
                <p class="font-body text-base text-chocolate/65 leading-snug pt-1.5">{{ loc.hours }}</p>
              </div>
            </div>

            <div class="flex gap-3 mt-8">
              <a href="#" class="flex-1 text-center py-3.5 bg-chocolate text-cream rounded-2xl text-sm font-body font-semibold hover:bg-chocolate-light transition-all duration-300 hover:shadow-lg">
                Get Directions
              </a>
              <RouterLink to="/contact" class="flex-1 text-center py-3.5 border border-amber/60 text-amber rounded-2xl text-sm font-body font-semibold hover:bg-amber/10 transition-all duration-300">
                Call Us
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppIcon from '@/components/ui/AppIcon.vue'
import { locations } from '@/data/products'
const allLocations = locations
</script>
