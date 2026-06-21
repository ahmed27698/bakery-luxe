<template>
  <div class="pt-24 min-h-screen bg-warm-white">
    <!-- Hero -->
    <section class="bg-chocolate noise relative overflow-hidden py-28 px-6">
      <div class="absolute inset-0 opacity-25">
        <img src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=1400&q=85" alt="" class="w-full h-full object-cover" />
      </div>
      <div class="max-w-350 mx-auto relative z-10 text-center">
        <p class="font-accent text-amber text-sm tracking-[0.3em] uppercase mb-4">Bespoke Cakes</p>
        <h1 class="font-display text-6xl md:text-7xl font-bold text-cream leading-tight">Design Your <em class="gradient-text">Dream Cake</em></h1>
        <p class="font-body text-cream/60 mt-5 max-w-xl mx-auto text-lg">Every celebration is unique. Our bakers work with you to create a masterpiece that's entirely your own.</p>
      </div>
    </section>

    <!-- Cake Builder Wizard -->
    <section class="py-20 px-6 max-w-225 mx-auto">
      <SectionHeading eyebrow="Customizer" title="Build Your Cake" center subtitle="Choose your options to get a quote. We'll follow up within 24 hours to confirm and refine your order." />

      <div class="mt-14 bg-cream rounded-3xl p-10 border border-amber-100">
        <!-- Step indicators -->
        <div class="flex items-center gap-2 mb-10 overflow-x-auto">
          <div v-for="(step, i) in steps" :key="i" class="flex items-center gap-2 shrink-0">
            <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300"
              :class="currentStep >= i ? 'bg-chocolate text-cream' : 'bg-white border border-amber-200 text-chocolate/40'">
              <AppIcon v-if="currentStep > i" name="check" :size="14" />
              <span v-else>{{ i + 1 }}</span>
            </div>
            <span class="font-body text-sm" :class="currentStep >= i ? 'text-chocolate font-medium' : 'text-chocolate/40'">{{ step.title }}</span>
            <div v-if="i < steps.length - 1" class="w-8 h-px bg-amber-200"></div>
          </div>
        </div>

        <!-- Step content -->
        <div class="min-h-70">
          <Transition name="slide-up" mode="out-in">
            <!-- Step 0: Size -->
            <div v-if="currentStep === 0" key="0">
              <h3 class="font-display text-2xl font-bold text-chocolate mb-6">Choose Your Size</h3>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button v-for="size in sizes" :key="size.label" @click="selections.size = size"
                  class="p-4 rounded-2xl border-2 text-center transition-all duration-300"
                  :class="selections.size?.label === size.label ? 'border-amber bg-amber/5 shadow-md' : 'border-amber-100 hover:border-amber/40'">
                  <div class="mb-2 flex justify-center text-amber"><AppIcon :name="size.icon" :size="32" :stroke-width="1.25" /></div>
                  <div class="font-display font-bold text-chocolate text-sm">{{ size.label }}</div>
                  <div class="font-body text-xs text-chocolate/50 mt-1">{{ size.desc }}</div>
                  <div class="font-display font-bold text-amber mt-2">${{ size.price }}</div>
                </button>
              </div>
            </div>

            <!-- Step 1: Flavour -->
            <div v-else-if="currentStep === 1" key="1">
              <h3 class="font-display text-2xl font-bold text-chocolate mb-6">Select Your Flavour</h3>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <button v-for="f in flavours" :key="f.name" @click="selections.flavour = f"
                  class="p-4 rounded-2xl border-2 text-left transition-all duration-300"
                  :class="selections.flavour?.name === f.name ? 'border-amber bg-amber/5' : 'border-amber-100 hover:border-amber/40'">
                  <div class="font-display font-bold text-chocolate text-base mb-1">{{ f.name }}</div>
                  <div class="font-body text-xs text-chocolate/50">{{ f.desc }}</div>
                </button>
              </div>
            </div>

            <!-- Step 2: Design -->
            <div v-else-if="currentStep === 2" key="2">
              <h3 class="font-display text-2xl font-bold text-chocolate mb-6">Choose a Design Style</h3>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                <button v-for="d in designs" :key="d.name" @click="selections.design = d"
                  class="p-4 rounded-2xl border-2 text-center transition-all duration-300"
                  :class="selections.design?.name === d.name ? 'border-amber bg-amber/5' : 'border-amber-100 hover:border-amber/40'">
                  <div class="mb-2 flex justify-center text-amber"><AppIcon :name="d.icon" :size="36" :stroke-width="1.25" /></div>
                  <div class="font-display font-bold text-chocolate text-sm">{{ d.name }}</div>
                </button>
              </div>
            </div>

            <!-- Step 3: Message -->
            <div v-else-if="currentStep === 3" key="3">
              <h3 class="font-display text-2xl font-bold text-chocolate mb-6">Personalise It</h3>
              <div class="space-y-4">
                <div>
                  <label class="font-body text-sm font-medium text-chocolate mb-2 block">Inscription (optional)</label>
                  <input v-model="selections.message" type="text" placeholder="Happy Birthday Sarah ♥" maxlength="40"
                    class="w-full px-4 py-3 border border-amber-200 rounded-2xl font-body text-sm text-chocolate focus:outline-none focus:border-amber transition-colors" />
                  <p class="font-body text-xs text-chocolate/40 mt-1">{{ selections.message.length }}/40 characters</p>
                </div>
                <div>
                  <label class="font-body text-sm font-medium text-chocolate mb-2 block">Delivery Date</label>
                  <input v-model="selections.date" type="date" :min="minDate"
                    class="px-4 py-3 border border-amber-200 rounded-2xl font-body text-sm text-chocolate focus:outline-none focus:border-amber transition-colors" />
                </div>
                <div>
                  <label class="font-body text-sm font-medium text-chocolate mb-2 block">Special Notes</label>
                  <textarea v-model="selections.notes" rows="3" placeholder="Any allergies, colour preferences, or special requests..."
                    class="w-full px-4 py-3 border border-amber-200 rounded-2xl font-body text-sm text-chocolate focus:outline-none focus:border-amber transition-colors resize-none"></textarea>
                </div>
              </div>
            </div>

            <!-- Step 4: Review -->
            <div v-else-if="currentStep === 4" key="4">
              <h3 class="font-display text-2xl font-bold text-chocolate mb-6">Review Your Order</h3>
              <div class="space-y-3">
                <div v-for="(val, key) in reviewItems" :key="key" class="flex justify-between items-center py-3 border-b border-amber-100">
                  <span class="font-body text-sm text-chocolate/60 capitalize">{{ key }}</span>
                  <span class="font-body text-sm font-semibold text-chocolate">{{ val }}</span>
                </div>
                <div class="flex justify-between items-center pt-3">
                  <span class="font-display text-lg font-bold text-chocolate">Estimated Total</span>
                  <span class="font-display text-2xl font-bold gradient-text">${{ totalPrice }}</span>
                </div>
              </div>
            </div>
          </Transition>
        </div>

        <!-- Navigation -->
        <div class="flex items-center justify-between mt-10 pt-6 border-t border-amber-100">
          <button v-if="currentStep > 0" @click="currentStep--"
            class="px-6 py-3 border border-amber-200 rounded-2xl font-body text-sm text-chocolate hover:border-amber transition-colors flex items-center gap-2">
            <AppIcon name="arrowleft" :size="16" /> Back
          </button>
          <div v-else></div>
          <button v-if="currentStep < steps.length - 1" @click="nextStep"
            class="px-8 py-3 bg-chocolate text-cream rounded-2xl font-body font-medium text-sm hover:bg-chocolate-light transition-colors flex items-center gap-2"
            :disabled="!canProceed">
            Continue <AppIcon name="arrowright" :size="16" />
          </button>
          <button v-else @click="submitOrder"
            class="px-8 py-3 bg-amber text-chocolate rounded-2xl font-body font-bold text-sm hover:bg-amber-light transition-colors hover:scale-105">
            Request a Quote
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { useToast } from '@/stores/toast'

const { success } = useToast()
const currentStep = ref(0)

const steps = [
  { title: 'Size' },
  { title: 'Flavour' },
  { title: 'Design' },
  { title: 'Message' },
  { title: 'Review' },
]

const sizes = [
  { label: '4"', desc: 'Serves 4', price: 45, icon: 'cake' },
  { label: '6"', desc: 'Serves 8', price: 70, icon: 'cake' },
  { label: '8"', desc: 'Serves 16', price: 95, icon: 'cake' },
  { label: '10"', desc: 'Serves 24', price: 130, icon: 'cake' },
]

const flavours = [
  { name: 'Madagascar Vanilla', desc: 'Classic, floral, refined' },
  { name: 'Velvet Rose', desc: 'Rose & lychee, romantic' },
  { name: 'Dark Chocolate', desc: 'Valrhona 72%, intense' },
  { name: 'Lemon Elderflower', desc: 'Bright & floral' },
  { name: 'Hazelnut Praline', desc: 'Nutty & indulgent' },
  { name: 'Earl Grey', desc: 'Fragrant, sophisticated' },
]

const designs = [
  { name: 'Minimalist', icon: 'layers' },
  { name: 'Floral', icon: 'sparkles' },
  { name: 'Geometric', icon: 'layoutgrid' },
  { name: 'Rustic', icon: 'wheat' },
  { name: 'Glamour', icon: 'star' },
  { name: 'Bespoke', icon: 'target' },
]

const selections = ref({ size: null, flavour: null, design: null, message: '', date: '', notes: '' })

const minDate = computed(() => {
  const d = new Date(); d.setDate(d.getDate() + 7)
  return d.toISOString().split('T')[0]
})

const canProceed = computed(() => {
  if (currentStep.value === 0) return !!selections.value.size
  if (currentStep.value === 1) return !!selections.value.flavour
  if (currentStep.value === 2) return !!selections.value.design
  return true
})

const totalPrice = computed(() => (selections.value.size?.price || 0) + 25)

const reviewItems = computed(() => ({
  size: selections.value.size?.label || '—',
  serves: selections.value.size?.desc || '—',
  flavour: selections.value.flavour?.name || '—',
  design: selections.value.design?.name || '—',
  inscription: selections.value.message || 'None',
  date: selections.value.date || 'To be confirmed',
}))

function nextStep() { if (canProceed.value) currentStep.value++ }
function submitOrder() { success('Quote request submitted! We\'ll contact you within 24 hours.'); currentStep.value = 0; selections.value = { size: null, flavour: null, design: null, message: '', date: '', notes: '' } }
</script>
