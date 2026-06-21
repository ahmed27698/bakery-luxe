<template>
  <div class="pt-24 min-h-screen bg-warm-white">
    <div class="bg-cream border-b border-amber-100 py-14 px-6">
      <div class="max-w-350 mx-auto">
        <!-- Step progress -->
        <div class="flex items-center gap-4 mb-8">
          <div v-for="(step, i) in checkoutSteps" :key="i" class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300"
              :class="currentStep >= i ? 'bg-chocolate text-cream' : 'bg-amber-100 text-chocolate/40'">
              <AppIcon v-if="currentStep > i" name="check" :size="16" />
              <span v-else>{{ i + 1 }}</span>
            </div>
            <span class="font-body text-base" :class="currentStep >= i ? 'text-chocolate font-medium' : 'text-chocolate/40'">{{ step }}</span>
            <div v-if="i < checkoutSteps.length - 1" class="w-10 h-px bg-amber/30 mx-1"></div>
          </div>
        </div>
        <h1 class="font-display text-4xl font-bold text-chocolate">Checkout</h1>
      </div>
    </div>

    <div class="max-w-350 mx-auto px-6 py-14">
      <div class="grid lg:grid-cols-3 gap-10">
        <!-- Form -->
        <div class="lg:col-span-2">
          <Transition name="slide-up" mode="out-in">
            <!-- Step 0: Contact & Delivery -->
            <div v-if="currentStep === 0" key="contact">
              <div class="bg-cream rounded-3xl border border-amber-100 p-10 mb-6">
                <h3 class="font-display text-xl font-bold text-chocolate mb-7">Contact Information</h3>
                <div class="grid grid-cols-2 gap-4 mb-4">
                  <input v-model="form.firstName" placeholder="First Name" type="text" class="checkout-input" required />
                  <input v-model="form.lastName" placeholder="Last Name" type="text" class="checkout-input" required />
                </div>
                <input v-model="form.email" placeholder="Email Address" type="email" class="checkout-input mb-4" required />
                <input v-model="form.phone" placeholder="Phone Number" type="tel" class="checkout-input" />
              </div>

              <div class="bg-cream rounded-3xl border border-amber-100 p-10">
                <h3 class="font-display text-xl font-bold text-chocolate mb-7">Delivery Address</h3>
                <input v-model="form.address" placeholder="Street Address" type="text" class="checkout-input mb-4" required />
                <div class="grid grid-cols-2 gap-4 mb-4">
                  <input v-model="form.city" placeholder="City" type="text" class="checkout-input" required />
                  <input v-model="form.zip" placeholder="ZIP / Postcode" type="text" class="checkout-input" required />
                </div>
                <div class="mt-4">
                  <label class="font-body text-sm font-medium text-chocolate mb-3 block">Delivery Window</label>
                  <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <button v-for="slot in timeSlots" :key="slot"
                      @click="form.timeSlot = slot"
                      class="py-2.5 px-3 rounded-xl text-xs font-body font-medium border transition-all duration-200 text-center"
                      :class="form.timeSlot === slot ? 'bg-chocolate text-cream border-chocolate' : 'border-amber-200 text-chocolate/60 hover:border-amber'">
                      {{ slot }}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Step 1: Payment -->
            <div v-else-if="currentStep === 1" key="payment">
              <div class="bg-cream rounded-3xl border border-amber-100 p-10">
                <h3 class="font-display text-xl font-bold text-chocolate mb-7">Payment Details</h3>
                <div class="bg-amber/5 border border-amber/20 rounded-2xl p-4 mb-6">
                  <p class="font-body text-sm text-chocolate/70 flex items-center gap-2">
                    <AppIcon name="lock" :size="14" class="shrink-0" /> This is a demo — no real payment is processed. Use any card details below.
                  </p>
                </div>
                <input v-model="form.cardName" placeholder="Name on Card" type="text" class="checkout-input mb-4" />
                <div class="relative mb-4">
                  <input v-model="form.cardNumber" placeholder="Card Number" type="text" maxlength="19" class="checkout-input" />
                  <AppIcon name="creditcard" :size="18" class="absolute right-4 top-1/2 -translate-y-1/2 text-chocolate/30" />
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <input v-model="form.expiry" placeholder="MM / YY" type="text" maxlength="7" class="checkout-input" />
                  <input v-model="form.cvv" placeholder="CVV" type="text" maxlength="3" class="checkout-input" />
                </div>
                <div class="flex gap-4 mt-6">
                  <div class="flex items-center gap-2 font-body text-xs text-chocolate/50">
                    <AppIcon name="lock" :size="14" /> SSL Encrypted
                  </div>
                  <div class="flex items-center gap-2 font-body text-xs text-chocolate/50">
                    <AppIcon name="shield" :size="14" /> PCI Compliant
                  </div>
                </div>
              </div>
            </div>

            <!-- Step 2: Review -->
            <div v-else key="review">
              <div class="bg-cream rounded-3xl border border-amber-100 p-10">
                <h3 class="font-display text-xl font-bold text-chocolate mb-7">Review Your Order</h3>
                <div class="space-y-3 mb-6">
                  <div v-for="item in cartItems" :key="item.id" class="flex items-center gap-4 py-3 border-b border-amber-50 last:border-0">
                    <img :src="item.images[0]" :alt="item.name" class="w-12 h-12 rounded-xl object-cover" />
                    <div class="flex-1">
                      <p class="font-body text-sm font-medium text-chocolate">{{ item.name }}</p>
                      <p class="font-body text-xs text-chocolate/40">× {{ item.qty }}</p>
                    </div>
                    <p class="font-display font-bold text-sm text-chocolate">${{ (item.price * item.qty).toFixed(2) }}</p>
                  </div>
                </div>
                <div class="text-sm font-body space-y-2 border-t border-amber-100 pt-4">
                  <div class="flex justify-between text-chocolate/60"><span>Deliver to</span><span>{{ form.address }}, {{ form.city }}</span></div>
                  <div class="flex justify-between text-chocolate/60"><span>Time slot</span><span>{{ form.timeSlot }}</span></div>
                </div>
              </div>
            </div>
          </Transition>

          <div class="flex items-center justify-between mt-6">
            <button v-if="currentStep > 0" @click="currentStep--" class="px-6 py-3 border border-amber-200 rounded-2xl font-body text-sm text-chocolate hover:border-amber transition-colors flex items-center gap-2">
              <AppIcon name="arrowleft" :size="16" /> Back
            </button>
            <div v-else></div>
            <button v-if="currentStep < 2" @click="currentStep++"
              class="px-8 py-3 bg-chocolate text-cream rounded-2xl font-body font-medium text-sm hover:bg-chocolate-light transition-colors flex items-center gap-2">
              Continue <AppIcon name="arrowright" :size="16" />
            </button>
            <button v-else @click="placeOrder"
              class="px-8 py-3 bg-amber text-chocolate rounded-2xl font-body font-bold text-sm hover:bg-amber-light transition-all hover:scale-105 shadow-lg">
              Place Order
            </button>
          </div>
        </div>

        <!-- Summary sidebar -->
        <div class="h-fit sticky top-28">
          <div class="bg-cream rounded-3xl border border-amber-200 p-6">
            <h3 class="font-display text-lg font-bold text-chocolate mb-5">Order Summary</h3>
            <div class="space-y-3 text-sm font-body mb-5">
              <div class="flex justify-between text-chocolate/70"><span>Subtotal</span><span>${{ subtotal.toFixed(2) }}</span></div>
              <div v-if="discount > 0" class="flex justify-between text-green-600"><span>Discount</span><span>-${{ discount.toFixed(2) }}</span></div>
              <div class="flex justify-between text-chocolate/70"><span>Shipping</span><span>{{ shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}` }}</span></div>
              <div class="flex justify-between font-display font-bold text-xl border-t border-amber-100 pt-3">
                <span>Total</span><span>${{ total.toFixed(2) }}</span>
              </div>
            </div>
            <div class="space-y-2">
              <div v-for="item in cartItems.slice(0,3)" :key="item.id" class="flex items-center gap-2 text-xs font-body text-chocolate/60">
                <img :src="item.images[0]" class="w-8 h-8 rounded-lg object-cover" />
                <span class="line-clamp-1 flex-1">{{ item.name }}</span>
                <span>×{{ item.qty }}</span>
              </div>
              <p v-if="cartItems.length > 3" class="text-xs text-chocolate/40 text-center">+{{ cartItems.length - 3 }} more items</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCart } from '@/stores/cart'
import AppIcon from '@/components/ui/AppIcon.vue'

const router = useRouter()
const { state: cartState, subtotal, discount, total, shipping, clearCart } = useCart()
const cartItems = cartState.items

const currentStep = ref(0)
const checkoutSteps = ['Contact & Delivery', 'Payment', 'Review']
const timeSlots = ['7am-9am', '9am-12pm', '12pm-3pm', '3pm-6pm']

const form = ref({
  firstName: '', lastName: '', email: '', phone: '',
  address: '', city: '', zip: '', timeSlot: '',
  cardName: '', cardNumber: '', expiry: '', cvv: '',
})

function placeOrder() {
  clearCart()
  router.push('/order-success')
}
</script>

<style scoped>
.checkout-input {
  width: 100%;
  padding: 1rem 1.25rem;
  border: 1px solid #E8C47A;
  border-radius: 0.875rem;
  font-family: 'Outfit', system-ui, sans-serif;
  font-size: 1rem;
  color: #3D1F0B;
  background: white;
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;
}
.checkout-input:focus { border-color: #D4A853; box-shadow: 0 0 0 3px rgba(212,168,83,0.15); }
.checkout-input:focus { border-color: #D4A853; }
.checkout-input::placeholder { color: rgba(61,31,11,0.3); }
</style>
