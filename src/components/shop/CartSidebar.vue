<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition name="backdrop">
      <div v-if="state.isOpen" class="fixed inset-0 bg-chocolate/40 backdrop-blur-sm z-800" @click="closeCart"></div>
    </Transition>

    <!-- Drawer -->
    <Transition name="cart-drawer">
      <div v-if="state.isOpen" class="fixed top-0 right-0 bottom-0 w-full max-w-md bg-warm-white z-801 flex flex-col shadow-2xl">
        <!-- Header -->
        <div class="flex items-center justify-between px-6 py-5 border-b border-amber-100">
          <div>
            <h2 class="font-display text-xl font-bold text-chocolate">Your Cart</h2>
            <p class="font-body text-xs text-chocolate/50 mt-0.5">{{ itemCount }} {{ itemCount === 1 ? 'item' : 'items' }}</p>
          </div>
          <button @click="closeCart" class="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-cream text-chocolate/60 hover:text-chocolate transition-colors">
            <AppIcon name="x" :size="18" />
          </button>
        </div>

        <!-- Free shipping banner -->
        <div v-if="subtotal < 50" class="mx-4 mt-4 bg-amber/10 border border-amber/20 rounded-xl px-4 py-3">
          <p class="font-body text-xs text-chocolate/70 text-center">
            Add <strong class="text-amber">${{ (50 - subtotal).toFixed(2) }}</strong> more for free shipping!
          </p>
          <div class="mt-2 h-1 bg-amber/20 rounded-full overflow-hidden">
            <div class="h-full bg-amber rounded-full transition-all duration-500" :style="`width: ${Math.min(subtotal/50*100,100)}%`"></div>
          </div>
        </div>
        <div v-else class="mx-4 mt-4 bg-green-50 border border-green-200 rounded-xl px-4 py-2.5 flex items-center gap-2">
          <AppIcon name="check" :size="16" class="text-green-500" />
          <p class="font-body text-xs text-green-700 font-medium">You've unlocked free shipping!</p>
        </div>

        <!-- Cart Items -->
        <div class="flex-1 overflow-y-auto scroll-thin px-4 py-4 flex flex-col gap-3">
          <TransitionGroup name="cart-item">
            <div v-if="state.items.length === 0" class="flex flex-col items-center justify-center h-full gap-4 text-center py-16">
              <div class="w-20 h-20 flex items-center justify-center text-chocolate/20">
                <AppIcon name="shoppingcart" :size="64" :stroke-width="1" />
              </div>
              <h3 class="font-display text-xl text-chocolate/80">Your cart is empty</h3>
              <p class="font-body text-sm text-chocolate/50">Fill it with something delicious</p>
              <RouterLink to="/shop" @click="closeCart" class="btn-cta mt-2">Shop Now</RouterLink>
            </div>
            <div v-for="item in state.items" :key="item.id"
              class="flex items-start gap-3 p-3 bg-cream/60 rounded-2xl border border-amber-100/50 group hover:border-amber-200 transition-all duration-200">
              <div class="img-reveal-wrap w-18 h-18 rounded-xl overflow-hidden shrink-0" style="width:72px;height:72px">
                <img :src="item.images[0]" :alt="item.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div class="flex-1 min-w-0">
                <h4 class="font-body text-sm font-semibold text-chocolate truncate leading-tight">{{ item.name }}</h4>
                <p class="font-accent text-amber text-sm mt-0.5">${{ item.price.toFixed(2) }}</p>
                <!-- Qty control -->
                <div class="flex items-center gap-2 mt-2">
                  <button @click="updateQty(item.id, item.qty - 1)"
                    class="w-7 h-7 flex items-center justify-center rounded-lg bg-white border border-amber-200 text-chocolate hover:bg-amber hover:text-white hover:border-amber transition-all duration-200 text-sm font-bold">−</button>
                  <span class="font-body text-sm font-semibold w-6 text-center">{{ item.qty }}</span>
                  <button @click="updateQty(item.id, item.qty + 1)"
                    class="w-7 h-7 flex items-center justify-center rounded-lg bg-white border border-amber-200 text-chocolate hover:bg-amber hover:text-white hover:border-amber transition-all duration-200 text-sm font-bold">+</button>
                </div>
              </div>
              <div class="flex flex-col items-end gap-2">
                <span class="font-display font-bold text-sm text-chocolate">${{ (item.price * item.qty).toFixed(2) }}</span>
                <button @click="removeItem(item.id)" class="text-chocolate/30 hover:text-red-400 transition-colors p-1">
                  <AppIcon name="x" :size="14" />
                </button>
              </div>
            </div>
          </TransitionGroup>
        </div>

        <!-- Coupon -->
        <div v-if="state.items.length > 0" class="px-4 py-3 border-t border-amber-100">
          <div v-if="!state.coupon" class="flex gap-2">
            <input v-model="couponCode" type="text" placeholder="Coupon code (try LUXE15)"
              class="flex-1 bg-cream border border-amber-200 rounded-xl px-4 py-2.5 text-sm font-body text-chocolate placeholder-chocolate/30 focus:outline-none focus:border-amber transition-colors" />
            <button @click="tryCoupon" class="px-4 py-2.5 bg-chocolate text-cream rounded-xl text-sm font-body font-medium hover:bg-chocolate-light transition-colors">Apply</button>
          </div>
          <div v-else class="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-4 py-2.5">
            <div class="flex items-center gap-2">
              <AppIcon name="check" :size="14" class="text-green-500" />
              <span class="font-body text-sm font-medium text-green-700">{{ state.coupon }} — 15% off!</span>
            </div>
            <button @click="removeCoupon" class="text-xs text-green-600 hover:text-green-800">Remove</button>
          </div>
        </div>

        <!-- Summary + Checkout -->
        <div v-if="state.items.length > 0" class="px-4 pb-6 pt-2 border-t border-amber-100">
          <div class="space-y-2 mb-4">
            <div class="flex justify-between font-body text-sm text-chocolate/70">
              <span>Subtotal</span><span>${{ subtotal.toFixed(2) }}</span>
            </div>
            <div v-if="discount > 0" class="flex justify-between font-body text-sm text-green-600">
              <span>Discount (15%)</span><span>-${{ discount.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between font-body text-sm text-chocolate/70">
              <span>Shipping</span>
              <span :class="shipping === 0 ? 'text-green-600 font-medium' : ''">{{ shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}` }}</span>
            </div>
            <div class="flex justify-between font-display font-bold text-lg text-chocolate border-t border-amber-100 pt-2 mt-2">
              <span>Total</span><span>${{ total.toFixed(2) }}</span>
            </div>
          </div>
          <RouterLink to="/checkout" @click="closeCart" class="block w-full text-center btn-checkout">
            Proceed to Checkout
          </RouterLink>
          <button @click="closeCart" class="block w-full text-center mt-2 font-body text-sm text-chocolate/50 hover:text-chocolate transition-colors py-2">
            Continue Shopping
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref } from 'vue'
import { useCart } from '@/stores/cart'
import { useToast } from '@/stores/toast'
import AppIcon from '@/components/ui/AppIcon.vue'

const { state, itemCount, subtotal, discount, total, shipping, updateQty, removeItem, closeCart, applyCoupon, removeCoupon } = useCart()
const { success, error } = useToast()

const couponCode = ref('')

function tryCoupon() {
  if (applyCoupon(couponCode.value)) {
    success('Coupon applied! 15% discount added.')
    couponCode.value = ''
  } else {
    error('Invalid coupon code. Try LUXE15')
  }
}
</script>

<style scoped>
.btn-cta {
  background: #3D1F0B;
  color: #F5ECD7;
  padding: 0.75rem 1.5rem;
  border-radius: 1rem;
  font-family: 'Outfit', system-ui, sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  transition: all 0.3s;
  display: inline-block;
}
.btn-cta:hover { background: #6B3A20; }
.btn-checkout {
  background: linear-gradient(to right, #3D1F0B, #6B3A20);
  color: #F5ECD7;
  font-family: 'Outfit', system-ui, sans-serif;
  font-weight: 600;
  padding: 1rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  transition: all 0.3s;
  display: block;
  text-align: center;
}
.btn-checkout:hover { box-shadow: 0 20px 40px rgba(0,0,0,0.2); transform: scale(1.01); }

.backdrop-enter-active, .backdrop-leave-active { transition: opacity 0.3s ease; }
.backdrop-enter-from, .backdrop-leave-to { opacity: 0; }

.cart-drawer-enter-active { transition: transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
.cart-drawer-leave-active { transition: transform 0.35s ease-in; }
.cart-drawer-enter-from, .cart-drawer-leave-to { transform: translateX(100%); }

.cart-item-enter-active { transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); }
.cart-item-leave-active { transition: all 0.3s ease; }
.cart-item-enter-from { opacity: 0; transform: translateX(30px) scale(0.95); }
.cart-item-leave-to { opacity: 0; transform: translateX(30px); }
</style>
