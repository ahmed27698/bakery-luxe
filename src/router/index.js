import { createRouter, createWebHistory } from 'vue-router'
import gsap from 'gsap'

const routes = [
  { path: '/', component: () => import('@/pages/HomePage.vue'), name: 'home' },
  { path: '/about', component: () => import('@/pages/AboutPage.vue'), name: 'about' },
  { path: '/shop', component: () => import('@/pages/ShopPage.vue'), name: 'shop' },
  { path: '/shop/:slug', component: () => import('@/pages/ProductPage.vue'), name: 'product' },
  { path: '/categories', component: () => import('@/pages/CategoriesPage.vue'), name: 'categories' },
  { path: '/best-sellers', component: () => import('@/pages/BestSellersPage.vue'), name: 'best-sellers' },
  { path: '/fresh-today', component: () => import('@/pages/FreshTodayPage.vue'), name: 'fresh-today' },
  { path: '/seasonal', component: () => import('@/pages/SeasonalPage.vue'), name: 'seasonal' },
  { path: '/custom-cakes', component: () => import('@/pages/CustomCakesPage.vue'), name: 'custom-cakes' },
  { path: '/bakery-box', component: () => import('@/pages/BakeryBoxPage.vue'), name: 'bakery-box' },
  { path: '/recipes', component: () => import('@/pages/RecipesPage.vue'), name: 'recipes' },
  { path: '/blog', component: () => import('@/pages/BlogPage.vue'), name: 'blog' },
  { path: '/gallery', component: () => import('@/pages/GalleryPage.vue'), name: 'gallery' },
  { path: '/our-story', component: () => import('@/pages/OurStoryPage.vue'), name: 'our-story' },
  { path: '/bakers', component: () => import('@/pages/BakersPage.vue'), name: 'bakers' },
  { path: '/testimonials', component: () => import('@/pages/TestimonialsPage.vue'), name: 'testimonials' },
  { path: '/faq', component: () => import('@/pages/FAQPage.vue'), name: 'faq' },
  { path: '/contact', component: () => import('@/pages/ContactPage.vue'), name: 'contact' },
  { path: '/locations', component: () => import('@/pages/LocationsPage.vue'), name: 'locations' },
  { path: '/delivery', component: () => import('@/pages/DeliveryPage.vue'), name: 'delivery' },
  { path: '/careers', component: () => import('@/pages/CareersPage.vue'), name: 'careers' },
  { path: '/wishlist', component: () => import('@/pages/WishlistPage.vue'), name: 'wishlist' },
  { path: '/cart', component: () => import('@/pages/CartPage.vue'), name: 'cart' },
  { path: '/checkout', component: () => import('@/pages/CheckoutPage.vue'), name: 'checkout' },
  { path: '/order-success', component: () => import('@/pages/OrderSuccessPage.vue'), name: 'order-success' },
  { path: '/:pathMatch(.*)*', component: () => import('@/pages/NotFoundPage.vue'), name: '404' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() { return { top: 0, behavior: 'smooth' } },
})

let overlay = null

router.beforeEach((to, from, next) => {
  if (!overlay) {
    overlay = document.querySelector('.page-overlay')
  }
  if (overlay && from.name) {
    gsap.to(overlay, {
      scaleY: 1, duration: 0.5, ease: 'power4.inOut',
      transformOrigin: 'bottom',
      onComplete: next,
    })
  } else {
    next()
  }
})

router.afterEach(() => {
  if (!overlay) overlay = document.querySelector('.page-overlay')
  if (overlay) {
    gsap.to(overlay, {
      scaleY: 0, duration: 0.5, ease: 'power4.inOut',
      transformOrigin: 'top',
      delay: 0.1,
    })
  }
})

export default router
