import { onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Draggable from 'gsap/Draggable'

gsap.registerPlugin(ScrollTrigger, Draggable)

export { gsap, ScrollTrigger, Draggable }

export function useScrollReveal(selector, options = {}) {
  const defaults = {
    y: 60, opacity: 0, duration: 1, ease: 'power3.out',
    stagger: 0.12, start: 'top 85%', ...options,
  }

  onMounted(() => {
    const els = document.querySelectorAll(selector)
    if (!els.length) return
    gsap.fromTo(els, { y: defaults.y, opacity: 0 }, {
      y: 0, opacity: 1, duration: defaults.duration, ease: defaults.ease,
      stagger: defaults.stagger,
      scrollTrigger: {
        trigger: els[0].closest('section') || els[0],
        start: defaults.start,
        once: true,
      },
    })
  })
}

export function useSplitReveal(el, options = {}) {
  onMounted(() => {
    if (!el.value) return
    const text = el.value.textContent
    const chars = text.split('').map(c =>
      `<span class="split-char" style="display:inline-block">${c === ' ' ? '&nbsp;' : c}</span>`
    )
    el.value.innerHTML = chars.join('')
    gsap.fromTo(el.value.querySelectorAll('.split-char'),
      { y: '110%', opacity: 0, rotateZ: options.rotate ? 8 : 0 },
      {
        y: '0%', opacity: 1, rotateZ: 0,
        duration: options.duration || 0.8,
        ease: options.ease || 'power3.out',
        stagger: options.stagger || 0.03,
        scrollTrigger: options.scrollTrigger ? {
          trigger: el.value,
          start: options.start || 'top 85%',
          once: true,
        } : undefined,
        delay: options.delay || 0,
      }
    )
  })
}

export function useParallax(el, strength = 0.3) {
  let ctx
  onMounted(() => {
    if (!el.value) return
    ctx = gsap.context(() => {
      gsap.to(el.value, {
        yPercent: -100 * strength,
        ease: 'none',
        scrollTrigger: {
          trigger: el.value,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })
  })
  onUnmounted(() => ctx?.revert())
}

export function useMagneticButton(el, strength = 0.4) {
  let handleMouseMove, handleMouseLeave

  onMounted(() => {
    if (!el.value) return
    const btn = el.value

    handleMouseMove = (e) => {
      const rect = btn.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) * strength
      const dy = (e.clientY - cy) * strength
      gsap.to(btn, { x: dx, y: dy, duration: 0.4, ease: 'power2.out' })
    }

    handleMouseLeave = () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1.2, 0.4)' })
    }

    btn.addEventListener('mousemove', handleMouseMove)
    btn.addEventListener('mouseleave', handleMouseLeave)
  })

  onUnmounted(() => {
    if (!el.value) return
    el.value.removeEventListener('mousemove', handleMouseMove)
    el.value.removeEventListener('mouseleave', handleMouseLeave)
  })
}
