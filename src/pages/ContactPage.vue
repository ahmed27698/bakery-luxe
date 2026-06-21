<template>
  <div class="pt-24 min-h-screen bg-warm-white">
    <div class="bg-chocolate noise relative overflow-hidden py-32 px-6">
      <div class="absolute inset-0 opacity-20" style="background: radial-gradient(circle at 60% 40%, #D4A853 0%, transparent 60%)"></div>
      <div class="max-w-350 mx-auto text-center relative z-10">
        <p class="font-accent text-amber text-base tracking-[0.3em] uppercase mb-5">Get In Touch</p>
        <h1 class="font-display text-6xl md:text-7xl font-bold text-cream leading-tight">Say <em class="gradient-text">Hello</em></h1>
        <p class="font-body text-lg text-cream/60 mt-6 max-w-xl mx-auto leading-relaxed">Whether it's a bespoke order, a collaboration, or just a question about our sourdough — we'd love to hear from you.</p>
      </div>
    </div>

    <div class="max-w-350 mx-auto px-6 py-28">
      <div class="grid lg:grid-cols-2 gap-20">
        <!-- Contact info -->
        <div>
          <h2 class="font-display text-4xl font-bold text-chocolate mb-10">Visit, Call, or Write</h2>
          <div class="space-y-5">
            <div v-for="item in contactInfo" :key="item.label"
              class="flex items-start gap-5 p-6 bg-cream rounded-2xl border border-amber-100 hover:border-amber/40 hover:shadow-md transition-all duration-300 group">
              <div class="w-14 h-14 bg-amber/10 rounded-2xl flex items-center justify-center text-amber shrink-0 group-hover:bg-amber/20 transition-colors">
                <AppIcon :name="item.icon" :size="24" />
              </div>
              <div class="pt-1">
                <p class="font-body text-xs font-semibold text-chocolate/40 uppercase tracking-widest mb-2">{{ item.label }}</p>
                <p class="font-body text-base text-chocolate/80 leading-relaxed whitespace-pre-line">{{ item.value }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Form -->
        <div>
          <form @submit.prevent="submit" class="bg-cream rounded-3xl p-10 border border-amber-100 shadow-sm">
            <h3 class="font-display text-3xl font-bold text-chocolate mb-8">Send a Message</h3>
            <div class="space-y-5">
              <div class="grid grid-cols-2 gap-5">
                <div>
                  <label class="font-body text-sm font-medium text-chocolate/60 block mb-2">First Name</label>
                  <input v-model="form.firstName" type="text" required placeholder="Isabelle"
                    class="w-full px-5 py-3.5 border border-amber-200 rounded-xl font-body text-base text-chocolate focus:outline-none focus:border-amber transition-colors bg-white" />
                </div>
                <div>
                  <label class="font-body text-sm font-medium text-chocolate/60 block mb-2">Last Name</label>
                  <input v-model="form.lastName" type="text" required placeholder="Moreau"
                    class="w-full px-5 py-3.5 border border-amber-200 rounded-xl font-body text-base text-chocolate focus:outline-none focus:border-amber transition-colors bg-white" />
                </div>
              </div>
              <div>
                <label class="font-body text-sm font-medium text-chocolate/60 block mb-2">Email</label>
                <input v-model="form.email" type="email" required placeholder="you@example.com"
                  class="w-full px-5 py-3.5 border border-amber-200 rounded-xl font-body text-base text-chocolate focus:outline-none focus:border-amber transition-colors bg-white" />
              </div>
              <div>
                <label class="font-body text-sm font-medium text-chocolate/60 block mb-2">Subject</label>
                <select v-model="form.subject"
                  class="w-full px-5 py-3.5 border border-amber-200 rounded-xl font-body text-base text-chocolate focus:outline-none focus:border-amber transition-colors bg-white cursor-pointer">
                  <option>General Enquiry</option>
                  <option>Custom Cake Order</option>
                  <option>Wholesale / Corporate</option>
                  <option>Press & Media</option>
                  <option>Careers</option>
                  <option>Feedback</option>
                </select>
              </div>
              <div>
                <label class="font-body text-sm font-medium text-chocolate/60 block mb-2">Message</label>
                <textarea v-model="form.message" rows="6" required placeholder="Tell us how we can help..."
                  class="w-full px-5 py-3.5 border border-amber-200 rounded-xl font-body text-base text-chocolate focus:outline-none focus:border-amber transition-colors bg-white resize-none"></textarea>
              </div>
              <button type="submit"
                class="w-full py-4 bg-chocolate text-cream rounded-2xl font-body font-semibold text-base hover:bg-chocolate-light transition-all duration-300 hover:shadow-xl hover:scale-[1.01] mt-2">
                <span v-if="sent" class="flex items-center justify-center gap-2"><AppIcon name="check" :size="18" /> Message Sent!</span>
                <span v-else>Send Message</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from '@/stores/toast'
import AppIcon from '@/components/ui/AppIcon.vue'

const { success } = useToast()
const sent = ref(false)
const form = ref({ firstName: '', lastName: '', email: '', subject: 'General Enquiry', message: '' })

const contactInfo = [
  { icon: 'mappin', label: 'Main Location', value: '14 Rue du Faubourg, Riviera District\nOpen Mon-Fri 7am-7pm, Sat-Sun 7am-5pm' },
  { icon: 'phone', label: 'Phone', value: '+1 (555) 234-5678' },
  { icon: 'mail', label: 'Email', value: 'hello@maisondoree.com\norders@maisondoree.com' },
  { icon: 'instagram', label: 'Social', value: '@maisondoree on Instagram, Pinterest & TikTok' },
]

function submit() {
  success('Message received! We\'ll be in touch within 24 hours.')
  sent.value = true
  setTimeout(() => { sent.value = false; form.value = { firstName: '', lastName: '', email: '', subject: 'General Enquiry', message: '' } }, 3000)
}
</script>
