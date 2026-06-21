<template>
  <div class="pt-24 min-h-screen bg-warm-white">
    <div class="bg-chocolate noise relative overflow-hidden py-24 px-6">
      <div class="max-w-350 mx-auto relative z-10">
        <p class="font-accent text-amber text-sm tracking-[0.3em] uppercase mb-3">Curate Your Box</p>
        <h1 class="font-display text-6xl font-bold text-cream">Build Your <em class="gradient-text">Bakery Box</em></h1>
        <p class="font-body text-cream/60 mt-4 max-w-xl">Choose up to 6 items to fill your bespoke gift box. Perfect for gifting, sharing, or a personal treat.</p>
      </div>
    </div>

    <div class="max-w-350 mx-auto px-6 py-20">
      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Product picker -->
        <div class="lg:col-span-2">
          <h2 class="font-display text-2xl font-bold text-chocolate mb-8">Select Your Items ({{ boxItems.length }}/{{ maxItems }})</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div v-for="product in allProducts" :key="product.id"
              class="flex items-center gap-4 p-5 bg-cream rounded-2xl border border-amber-100 hover:border-amber/40 transition-all duration-300 cursor-pointer group"
              :class="isSelected(product.id) ? 'border-amber bg-amber/5 shadow-md' : ''"
              @click="toggleItem(product)">
              <div class="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                <img :src="product.images[0]" :alt="product.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="font-body text-base font-semibold text-chocolate line-clamp-1">{{ product.name }}</h4>
                <p class="font-body text-sm text-chocolate/50 mt-0.5 line-clamp-1">{{ product.shortDescription }}</p>
                <p class="font-display text-base font-bold text-amber mt-1">${{ product.price.toFixed(2) }}</p>
              </div>
              <div class="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 shrink-0"
                :class="isSelected(product.id) ? 'bg-amber text-chocolate' : 'bg-white border border-amber-200 text-chocolate/40 group-hover:border-amber'">
                <AppIcon v-if="isSelected(product.id)" name="check" :size="16" />
              <AppIcon v-else name="plus" :size="16" />
              </div>
            </div>
          </div>
        </div>

        <!-- Box summary -->
        <div class="lg:sticky lg:top-28 h-fit">
          <div class="bg-cream rounded-3xl border border-amber-200 p-8">
            <h3 class="font-display text-2xl font-bold text-chocolate mb-6">Your Box</h3>

            <!-- Box visual -->
            <div class="bg-amber/5 border-2 border-dashed border-amber/30 rounded-2xl p-4 mb-6 min-h-40 flex flex-wrap gap-2 content-start">
              <div v-if="boxItems.length === 0" class="w-full h-32 flex items-center justify-center text-chocolate/30 text-sm font-body">
                Add items to fill your box
              </div>
              <div v-for="item in boxItems" :key="item.id" class="relative group">
                <img :src="item.images[0]" :alt="item.name" class="w-14 h-14 rounded-xl object-cover border-2 border-white shadow-md" />
                <button @click.stop="removeItem(item.id)"
                  class="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-400 text-white rounded-full hidden group-hover:flex items-center justify-center">
                  <AppIcon name="x" :size="10" /></button>
              </div>
              <!-- Empty slots -->
              <div v-for="i in emptySlots" :key="`empty-${i}`" class="w-14 h-14 rounded-xl border-2 border-dashed border-amber/20 flex items-center justify-center text-amber/30 text-xl">+</div>
            </div>

            <!-- Pricing -->
            <div class="space-y-2 mb-4">
              <div class="flex justify-between font-body text-sm">
                <span class="text-chocolate/60">Items ({{ boxItems.length }})</span>
                <span class="text-chocolate">${{ boxSubtotal.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between font-body text-sm">
                <span class="text-chocolate/60">Gift Box & Tissue</span>
                <span class="text-chocolate">$8.00</span>
              </div>
              <div v-if="boxItems.length >= maxItems" class="flex justify-between font-body text-sm text-amber">
                <span>Full Box Discount (5%)</span>
                <span>-${{ (boxSubtotal * 0.05).toFixed(2) }}</span>
              </div>
              <div class="flex justify-between font-display font-bold text-lg border-t border-amber-100 pt-2 mt-2">
                <span>Total</span>
                <span>${{ boxTotal.toFixed(2) }}</span>
              </div>
            </div>

            <button @click="addBoxToCart" :disabled="boxItems.length === 0"
              class="w-full py-4 bg-chocolate text-cream rounded-2xl font-body font-semibold text-sm hover:bg-chocolate-light transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02] hover:shadow-lg">
              Add Box to Cart
            </button>

            <p class="font-body text-xs text-chocolate/40 text-center mt-3 flex items-center justify-center gap-1.5">
              <AppIcon name="gift" :size="12" /> Beautifully wrapped with a ribbon & card
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { products } from '@/data/products'
import { useCart } from '@/stores/cart'
import { useToast } from '@/stores/toast'
import AppIcon from '@/components/ui/AppIcon.vue'

const { addItem } = useCart()
const { success } = useToast()

const maxItems = 6
const boxItems = ref([])
const allProducts = computed(() => products)

const isSelected = (id) => boxItems.value.some(i => i.id === id)

function toggleItem(product) {
  if (isSelected(product.id)) { removeItem(product.id) }
  else if (boxItems.value.length < maxItems) { boxItems.value.push(product) }
}

function removeItem(id) { boxItems.value = boxItems.value.filter(i => i.id !== id) }

const emptySlots = computed(() => Math.max(0, maxItems - boxItems.value.length))
const boxSubtotal = computed(() => boxItems.value.reduce((s, i) => s + i.price, 0))
const boxTotal = computed(() => {
  let t = boxSubtotal.value + 8
  if (boxItems.value.length >= maxItems) t -= boxSubtotal.value * 0.05
  return t
})

function addBoxToCart() {
  boxItems.value.forEach(p => addItem(p))
  success(`Bakery box with ${boxItems.value.length} items added to cart!`)
  boxItems.value = []
}
</script>
