<template>
  <div class="pt-24 min-h-screen bg-warm-white">
    <div class="bg-cream border-b border-amber-100 py-24 px-6">
      <div class="max-w-350 mx-auto">
        <p class="font-accent text-amber text-sm tracking-[0.35em] uppercase mb-4">— Our Journal —</p>
        <h1 class="font-display text-6xl md:text-7xl font-bold text-chocolate leading-tight">From the <em class="text-amber">Bakery</em></h1>
        <p class="font-body text-chocolate/55 mt-5 max-w-xl text-lg leading-relaxed">Stories, insights, and the thinking behind our craft.</p>
      </div>
    </div>
    <div class="max-w-350 mx-auto px-6 py-20">
      <!-- Featured post -->
      <div class="mb-16 group cursor-pointer">
        <div class="grid lg:grid-cols-2 gap-0 bg-cream rounded-3xl overflow-hidden border border-amber-100 hover:shadow-2xl hover:border-amber/30 transition-all duration-500">
          <div class="aspect-video lg:aspect-auto overflow-hidden">
            <img :src="blogPosts[0].image" :alt="blogPosts[0].title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          </div>
          <div class="p-12 flex flex-col justify-center">
            <span class="font-body text-sm px-4 py-1.5 bg-amber/10 text-amber rounded-full inline-block mb-5 self-start">{{ blogPosts[0].category }}</span>
            <h2 class="font-display text-3xl md:text-4xl font-bold text-chocolate group-hover:text-amber transition-colors duration-300 leading-tight">{{ blogPosts[0].title }}</h2>
            <p class="font-body text-base text-chocolate/60 mt-5 leading-relaxed">{{ blogPosts[0].excerpt }}</p>
            <div class="flex items-center gap-4 mt-7 pt-7 border-t border-amber-100">
              <p class="font-body text-sm text-chocolate/50">By <span class="text-chocolate/70 font-medium">{{ blogPosts[0].author }}</span></p>
              <span class="text-chocolate/20">·</span>
              <p class="font-body text-sm text-chocolate/50">{{ blogPosts[0].readTime }} read</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Post grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="post in blogPosts.slice(1)" :key="post.id"
          class="bg-cream rounded-3xl overflow-hidden border border-amber-100 hover:shadow-2xl hover:border-amber/40 transition-all duration-500 group cursor-pointer flex flex-col">
          <div class="aspect-video overflow-hidden shrink-0">
            <img :src="post.image" :alt="post.title" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          </div>
          <div class="p-8 flex flex-col flex-1">
            <span class="font-body text-xs px-3 py-1.5 bg-amber/10 text-amber rounded-full self-start mb-4">{{ post.category }}</span>
            <h3 class="font-display text-xl font-bold text-chocolate group-hover:text-amber transition-colors leading-snug flex-1">{{ post.title }}</h3>
            <p class="font-body text-base text-chocolate/60 mt-3 line-clamp-2 leading-relaxed">{{ post.excerpt }}</p>
            <div class="flex items-center gap-3 mt-5 pt-5 border-t border-amber-50">
              <p class="font-body text-sm text-chocolate/50 font-medium">{{ post.author }}</p>
              <span class="text-chocolate/20">·</span>
              <p class="font-body text-sm text-chocolate/40">{{ post.readTime }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { blogPosts } from '@/data/products'
</script>
