<template>
  <div class="pt-24 min-h-screen bg-warm-white">
    <div class="bg-cream border-b border-amber-100 py-16 px-6">
      <div class="max-w-350 mx-auto">
        <h1 class="font-display text-5xl font-bold text-chocolate">Your Cart <span class="text-amber">({{ itemCount }})</span></h1>
      </div>
    </div>

    <div class="max-w-350 mx-auto px-6 py-16">
      <div v-if="state.items.length === 0" class="flex flex-col items-center justify-center py-24 text-center">
        <div class="mb-5 text-chocolate/20">
          <AppIcon name="shoppingcart" :size="72" :stroke-width="1" />
        </div>
        <h3 class="font-display text-3xl font-bold text-chocolate mb-3">Your cart is empty</h3>
        <RouterLink to="/shop" class="mt-6 bg-chocolate text-cream px-8 py-4 rounded-2xl font-body font-medium hover:bg-chocolate-light transition-colors">Start Shopping</RouterLink>
      </div>

      <div v-else class="grid lg:grid-cols-3 gap-10">
        <!-- Cart items -->
        <div class="lg:col-span-2 space-y-5">
          <TransitionGroup name="cart-item">
            <div v-for="item in state.items" :key="item.id"
              class="flex items-start gap-6 p-6 bg-cream rounded-3xl border border-amber-100 hover:border-amber/30 transition-all duration-300 group">
              <RouterLink :to="`/shop/${item.slug}`" class="w-28 h-28 rounded-2xl overflow-hidden shrink-0">
                <img :src="item.images[0]" :alt="item.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </RouterLink>
              <div class="flex-1 min-w-0">
                <RouterLink :to="`/shop/${item.slug}`">
                  <h3 class="font-display text-xl font-bold text-chocolate hover:text-amber transition-colors line-clamp-2">{{ item.name }}</h3>
                </RouterLink>
                <p class="font-body text-sm text-chocolate/50 mt-1.5 capitalize">{{ item.category }}</p>
                <p class="font-display text-lg text-amber font-bold mt-2">${{ item.price.toFixed(2) }}</p>
              </div>
              <div class="flex flex-col items-end gap-3">
                <div class="flex items-center gap-2 border border-amber-200 rounded-xl overflow-hidden">
                  <button @click="updateQty(item.id, item.qty - 1)" class="px-3 py-2 hover:bg-cream transition-colors text-chocolate font-bold">−</button>
                  <span class="px-3 py-2 font-body font-semibold text-chocolate min-w-10 text-center">{{ item.qty }}</span>
                  <button @click="updateQty(item.id, item.qty + 1)" class="px-3 py-2 hover:bg-cream transition-colors text-chocolate font-bold">+</button>
                </div>
                <p class="font-display font-bold text-chocolate">${{ (item.price * item.qty).toFixed(2) }}</p>
                <button @click="removeItem(item.id)" class="text-xs text-chocolate/30 hover:text-red-400 transition-colors py-1">Remove</button>
              </div>
            </div>
          </TransitionGroup>

          <RouterLink to="/shop" class="inline-flex items-center gap-2 font-body text-sm text-amber hover:text-amber-dark transition-colors mt-4">
            <AppIcon name="arrowleft" :size="16" /> Continue Shopping
          </RouterLink>
        </div>

        <!-- Order summary -->
        <div class="h-fit sticky top-28">
          <div class="bg-cream rounded-3xl border border-amber-200 p-7">
            <h3 class="font-display text-xl font-bold text-chocolate mb-6">Order Summary</h3>

            <!-- Coupon -->
            <div v-if="!state.coupon" class="flex gap-2 mb-6">
              <input v-model="couponCode" type="text" placeholder="Coupon code"
                class="flex-1 px-4 py-2.5 border border-amber-200 rounded-xl text-sm font-body text-chocolate focus:outline-none focus:border-amber" />
              <button @click="tryCoupon" class="px-4 py-2.5 bg-chocolate text-cream rounded-xl text-sm font-body font-medium">Apply</button>
            </div>
            <div v-else class="mb-6 flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-4 py-2.5">
              <span class="font-body text-sm text-green-700 flex items-center gap-1.5">
                <AppIcon name="check" :size="14" /> {{ state.coupon }} (15% off)
              </span>
              <button @click="removeCoupon" class="text-xs text-green-600">Remove</button>
            </div>

            <div class="space-y-3 text-sm font-body">
              <div class="flex justify-between text-chocolate/70"><span>Subtotal</span><span>${{ subtotal.toFixed(2) }}</span></div>
              <div v-if="discount > 0" class="flex justify-between text-green-600"><span>Discount</span><span>-${{ discount.toFixed(2) }}</span></div>
              <div class="flex justify-between text-chocolate/70"><span>Shipping</span><span :class="shipping === 0 ? 'text-green-600 font-medium' : ''">{{ shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}` }}</span></div>
              <div class="flex justify-between font-display font-bold text-xl border-t border-amber-100 pt-3 mt-3">
                <span>Total</span><span>${{ total.toFixed(2) }}</span>
              </div>
            </div>

            <RouterLink to="/checkout"
              class="mt-6 block w-full text-center py-4 bg-chocolate text-cream rounded-2xl font-body font-semibold hover:bg-chocolate-light transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
              Proceed to Checkout
            </RouterLink>

            <div class="flex items-center gap-2 justify-center mt-4">
              <AppIcon name="lock" :size="14" class="text-chocolate/40" />
              <p class="font-body text-xs text-chocolate/40">Secure checkout — SSL encrypted</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCart } from '@/stores/cart'
import { useToast } from '@/stores/toast'
import AppIcon from '@/components/ui/AppIcon.vue'

const { state, itemCount, subtotal, discount, total, shipping, updateQty, removeItem, applyCoupon, removeCoupon } = useCart()
const { success, error } = useToast()
const couponCode = ref('')

function tryCoupon() {
  if (applyCoupon(couponCode.value)) { success('Coupon applied!'); couponCode.value = '' }
  else error('Invalid coupon code. Try LUXE15')
}
</script>

<style scoped>
.cart-item-enter-active { transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
.cart-item-leave-active { transition: all 0.3s ease; }
.cart-item-enter-from { opacity: 0; transform: translateX(-20px); }
.cart-item-leave-to { opacity: 0; transform: translateX(20px); height: 0; margin: 0; padding: 0; }
</style>
