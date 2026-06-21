<template>
  <div class="overflow-x-hidden">
    <!-- ── HERO ─────────────────────────────────────── -->
    <section ref="heroEl" class="relative min-h-screen flex items-center overflow-hidden bg-chocolate noise">
      <!-- Parallax background image -->
      <div ref="heroBgEl" class="absolute inset-0 scale-110">
        <img src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=1800&q=85"
          alt="Bakery" class="w-full h-full object-cover opacity-25" />
      </div>
      <!-- Radial gradient overlay -->
      <div class="absolute inset-0 bg-radial-gradient pointer-events-none" style="background: radial-gradient(ellipse at 60% 50%, rgba(61,31,11,0) 0%, rgba(61,31,11,0.8) 100%)"></div>

      <!-- Floating decoration elements -->
      <div ref="floatEl1" class="absolute top-1/4 right-[12%] w-32 h-32 rounded-full border border-amber/20 float-1 hidden lg:block"></div>
      <div ref="floatEl2" class="absolute bottom-1/3 right-[20%] w-16 h-16 rounded-full bg-amber/10 float-2 hidden lg:block"></div>
      <div class="absolute top-[15%] left-[8%] w-20 h-20 float-3 hidden xl:block">
        <svg viewBox="0 0 80 80" class="w-full h-full opacity-20">
          <circle cx="40" cy="40" r="38" stroke="#D4A853" stroke-width="0.5" fill="none" />
          <text x="40" y="46" text-anchor="middle" fill="#D4A853" font-size="24" font-family="serif">✦</text>
        </svg>
      </div>

      <!-- Content -->
      <div class="relative z-10 max-w-350 mx-auto px-6 pt-32 pb-24 w-full">
        <div class="max-w-3xl">
          <div ref="heroEyebrowEl" class="flex items-center gap-3 mb-6 opacity-0">
            <div class="h-px w-12 bg-amber"></div>
            <p class="font-accent text-amber text-sm tracking-[0.35em] uppercase">Artisan Bakery Since 2009</p>
          </div>
          <h1 ref="heroTitleEl" class="font-display text-cream leading-[0.95] opacity-0" style="font-size: clamp(56px, 8vw, 130px)">
            Where Every<br/><em class="gradient-text">Bite</em> Tells<br/>a Story.
          </h1>
          <p ref="heroSubEl" class="font-body text-cream/60 text-lg mt-8 max-w-md leading-relaxed opacity-0">
            Handcrafted with passion, precision, and the finest seasonal ingredients. Experience the art of French artisan baking.
          </p>
          <div ref="heroCtaEl" class="flex flex-wrap gap-4 mt-10 opacity-0">
            <RouterLink to="/shop" class="btn-hero-primary magnetic-wrap">
              <span>Explore Our Bakes</span>
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M5 12h14M12 5l7 7-7 7" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </RouterLink>
            <RouterLink to="/our-story" class="btn-hero-outline">
              Our Story
            </RouterLink>
          </div>
          <!-- Stats row -->
          <div ref="heroStatsEl" class="flex flex-wrap gap-8 mt-16 opacity-0">
            <div v-for="s in heroStats" :key="s.label" class="flex flex-col gap-1">
              <span class="font-display text-3xl font-bold gradient-text">{{ s.value }}</span>
              <span class="font-body text-xs text-cream/40 tracking-wider uppercase">{{ s.label }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div ref="scrollIndicatorEl" class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0">
        <span class="font-body text-xs text-cream/40 tracking-widest uppercase">Scroll</span>
        <div class="w-px h-12 bg-linear-to-b from-amber/60 to-transparent scroll-line"></div>
      </div>

      <!-- Hero product card floating -->
      <div ref="heroCardEl" class="hidden xl:block absolute right-16 top-1/2 -translate-y-1/2 opacity-0">
        <div class="bg-white/10 backdrop-luxury border border-white/15 rounded-3xl p-4 w-56">
          <div class="rounded-2xl overflow-hidden aspect-square mb-3">
            <img src="https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=400&q=90" alt="Cake" class="w-full h-full object-cover" />
          </div>
          <p class="font-body text-xs text-amber/80 uppercase tracking-wider">Chef's Pick</p>
          <p class="font-display text-sm font-bold text-cream mt-1">Velvet Rose Cake</p>
          <div class="flex items-center justify-between mt-3">
            <span class="font-display text-lg font-bold gradient-text">$64.00</span>
            <button @click="addFeaturedToCart" class="w-8 h-8 bg-amber rounded-lg flex items-center justify-center text-chocolate text-sm font-bold hover:bg-amber-light transition-colors">+</button>
          </div>
        </div>
      </div>
    </section>

    <!-- ── MARQUEE ──────────────────────────────────── -->
    <div class="bg-amber py-4 overflow-hidden">
      <div class="marquee-track">
        <template v-for="i in 2" :key="i">
          <span v-for="item in marqueeItems" :key="`${i}-${item}`"
            class="font-accent text-chocolate text-lg mx-8 flex items-center gap-3 shrink-0">
            <span class="text-chocolate/40">✦</span> {{ item }}
          </span>
        </template>
      </div>
    </div>

    <!-- ── FEATURED PRODUCTS ───────────────────────── -->
    <section ref="featuredEl" class="py-32 px-6 max-w-350 mx-auto">
      <SectionHeading eyebrow="Our Finest" title="Featured Creations" center
        subtitle="Each piece is a work of edible art — crafted with obsessive care and the world's finest ingredients." />
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-16">
        <ProductCard v-for="p in featuredProducts" :key="p.id" :product="p" />
      </div>
      <div class="flex justify-center mt-12">
        <RouterLink to="/shop" class="btn-explore magnetic-wrap">
          <span>View All Products</span>
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 12h14M12 5l7 7-7 7" stroke-width="1.5" stroke-linecap="round"/></svg>
        </RouterLink>
      </div>
    </section>

    <!-- ── FRESH TODAY ─────────────────────────────── -->
    <section ref="freshEl" class="py-28 bg-cream overflow-hidden">
      <div class="max-w-350 mx-auto px-6">
        <div class="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-12">
          <SectionHeading eyebrow="Just Baked" title="Fresh From The Oven" :center="false" :line="false" />
          <RouterLink to="/fresh-today" class="btn-link shrink-0">See All Fresh Items →</RouterLink>
        </div>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div v-for="(p, i) in freshProducts" :key="p.id" ref="freshCards"
            class="fresh-card group relative rounded-2xl overflow-hidden cursor-pointer"
            :class="i === 0 ? 'lg:col-span-2 lg:row-span-2' : ''"
            @click="$router.push(`/shop/${p.slug}`)">
            <div class="aspect-square" :class="i === 0 ? 'lg:aspect-auto lg:h-full' : ''">
              <img :src="p.images[0]" :alt="p.name" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div class="absolute inset-0 bg-linear-to-t from-chocolate/80 via-chocolate/20 to-transparent"></div>
            <div class="absolute bottom-0 left-0 right-0 p-4">
              <p class="font-body text-amber text-xs tracking-wider uppercase mb-1">Fresh Today</p>
              <h3 class="font-display text-cream font-bold" :class="i === 0 ? 'text-xl' : 'text-sm'">{{ p.name }}</h3>
              <p class="font-display font-bold text-amber mt-1" :class="i === 0 ? 'text-lg' : 'text-base'">${{ p.price.toFixed(2) }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── DAILY SPECIALS ──────────────────────────── -->
    <section ref="specialsEl" class="py-24 bg-chocolate relative overflow-hidden noise">
      <div class="absolute inset-0 opacity-10" style="background: radial-gradient(circle at 30% 70%, #D4A853 0%, transparent 60%)"></div>
      <div class="max-w-350 mx-auto px-6 relative z-10">
        <SectionHeading eyebrow="Today Only" title="Daily Specials" center
          subtitle="Our bakers choose one exceptional item each day — always 20% off, always extraordinary."
          class="text-cream [&_.font-body]:text-cream/50 [&_.eyebrow-line]:text-amber [&_.heading-text]:text-cream" />
        <div class="mt-14 relative">
          <div class="flex gap-6 overflow-x-auto scroll-thin pb-4" ref="specialsTrackEl">
            <div v-for="(p, i) in allProducts.slice(0, 6)" :key="p.id"
              class="special-card shrink-0 w-72 bg-white/5 border border-white/10 rounded-3xl p-5 hover:bg-white/10 hover:border-amber/30 transition-all duration-400 group cursor-pointer"
              @click="$router.push(`/shop/${p.slug}`)">
              <div class="rounded-2xl overflow-hidden aspect-square mb-4 relative">
                <img :src="p.images[0]" :alt="p.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div class="absolute top-3 right-3 bg-amber text-chocolate text-xs font-bold px-2 py-1 rounded-lg">-20%</div>
              </div>
              <p class="font-body text-amber/70 text-xs uppercase tracking-wider">{{ p.category }}</p>
              <h3 class="font-display text-cream font-bold mt-1 line-clamp-2">{{ p.name }}</h3>
              <div class="flex items-center justify-between mt-3">
                <div>
                  <span class="font-display text-xl font-bold text-amber">${{ (p.price * 0.8).toFixed(2) }}</span>
                  <span class="font-body text-xs text-cream/40 line-through ml-2">${{ p.price.toFixed(2) }}</span>
                </div>
                <button @click.stop="addToCart(p)" class="w-9 h-9 bg-amber rounded-xl flex items-center justify-center text-chocolate font-bold hover:bg-amber-light hover:scale-110 transition-all">+</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── WHY CHOOSE US ───────────────────────────── -->
    <section ref="whyEl" class="py-32 px-6 max-w-350 mx-auto">
      <SectionHeading eyebrow="Our Promise" title="The Maison Dorée Difference" center
        subtitle="Every element of our process is designed to deliver exceptional quality." />
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
        <div v-for="(item, i) in whyItems" :key="i" ref="whyCards" 
          class="why-card text-center group  bg-cream rounded-3xl p-8 border border-amber-100 hover:border-amber/40 hover:shadow-xl transition-all duration-400">
          <div class="w-24 h-24 mx-auto mb-7 bg-amber/10 rounded-3xl flex items-center justify-center text-amber group-hover:bg-amber/20 transition-all duration-300 group-hover:scale-110">
            <AppIcon :name="item.icon" :size="44" :stroke-width="1.25" />
          </div>
          <div class="px-3! py-1!">
            <h3 class="font-display text-xl font-bold text-chocolate mb-3">{{ item.title }}</h3>
            <p class="font-body text-base text-chocolate/55 leading-relaxed">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── OUR STORY (horizontal scroll) ──────────── -->
    <section ref="storyEl" class="py-32 bg-cream-dark overflow-hidden">
      <div class="max-w-350 mx-auto px-6">
        <div class="grid lg:grid-cols-2 gap-32 items-center py-15!">
          <div>
            <SectionHeading eyebrow="Since 2009" title="A Story Baked With Love" :center="false"
              subtitle="Maison Dorée began in a small apartment kitchen with nothing but a 15-year-old sourdough starter and an obsession with perfect bread." />
            <div class="mt-8 space-y-4">
              <p class="font-body text-sm text-chocolate/65 leading-relaxed">
                Chef Isabelle Moreau returned from Paris with a dream: to bring the precision of French artisan baking to a new audience. Today, three locations and fifteen years later, that dream has grown into a landmark of our city's culinary scene.
              </p>
              <p class="font-body text-sm text-chocolate/65 leading-relaxed">
                We work with only the finest ingredients — stone-milled heritage grain, single-origin chocolate, seasonal fruit from trusted farms. Nothing artificial. Nothing rushed.
              </p>
            </div>
            <RouterLink to="/our-story" class="btn-explore m-5! inline-flex">
              <span>Read Our Full Story</span>
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 12h14M12 5l7 7-7 7" stroke-width="1.5" stroke-linecap="round"/></svg>
            </RouterLink>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="img-reveal-wrap rounded-3xl overflow-hidden aspect-3/4 mt-8">
              <img src="https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=600&q=85"
                alt="Baker" class="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
            </div>
            <div class="img-reveal-wrap rounded-3xl overflow-hidden aspect-3/4 -mt-8">
              <img src="https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=600&q=85"
                alt="Bread" class="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── CATEGORIES ──────────────────────────────── -->
    <section ref="catEl" class="py-32 px-6 max-w-350 mx-auto">
      <SectionHeading eyebrow="Browse" title="Shop By Category" center />
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
        <RouterLink v-for="(cat, i) in allCategories" :key="cat.id" :to="`/shop?category=${cat.slug}`"
          class="cat-card group relative rounded-3xl overflow-hidden aspect-square cursor-pointer" ref="catCards">
          <div class="absolute inset-0 transition-all duration-500" :style="`background: linear-gradient(135deg, ${cat.color}20, ${cat.color}40)`"></div>
          <div class="absolute inset-0 flex flex-col items-center justify-center gap-3 group-hover:scale-110 transition-transform duration-500">
            <span class="group-hover:scale-125 transition-transform duration-500 block text-chocolate/70">
              <AppIcon :name="cat.icon" :size="48" :stroke-width="1" />
            </span>
            <h3 class="font-display font-bold text-chocolate text-lg">{{ cat.name }}</h3>
            <p class="font-body text-xs text-chocolate/50 text-center px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{{ cat.description }}</p>
          </div>
          <div class="absolute bottom-4 right-4 w-8 h-8 bg-white/60 backdrop-blur-sm rounded-xl flex items-center justify-center text-chocolate opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
            <AppIcon name="arrowright" :size="14" />
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- ── BEST SELLERS ────────────────────────────── -->
    <section ref="bestEl" class="py-28 bg-cream overflow-hidden">
      <div class="max-w-350 mx-auto px-6">
        <div class="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-14">
          <SectionHeading eyebrow="Most Loved" title="Our Best Sellers" :center="false" :line="false" />
          <RouterLink to="/best-sellers" class="btn-link shrink-0">View All →</RouterLink>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <ProductCard v-for="p in bestSellers" :key="p.id" :product="p" />
        </div>
      </div>
    </section>

    <!-- ── SPECIAL OFFER BANNER ───────────────────── -->
    <section class="py-16 bg-linear-to-r from-chocolate via-chocolate-light to-chocolate relative overflow-hidden">
      <div class="absolute inset-0 opacity-20 process-bg-pattern"></div>
      <div class="max-w-350 mx-auto px-6 relative z-10">
        <div class="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <p class="font-accent text-amber text-sm tracking-[0.3em] uppercase mb-2">Limited Time</p>
            <h2 class="font-display text-4xl md:text-5xl font-bold text-cream">Get 15% Off Your<br/>First Order</h2>
            <p class="font-body text-cream/60 mt-3">Use code <strong class="text-amber font-mono tracking-widest">LUXE15</strong> at checkout</p>
          </div>
          <RouterLink to="/shop" class="btn-offer shrink-0 magnetic-wrap">
            <span>Shop Now</span>
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 12h14M12 5l7 7-7 7" stroke-width="1.5" stroke-linecap="round"/></svg>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- ── TESTIMONIALS ───────────────────────────── -->
    <section ref="testiEl" class="py-32 px-6 max-w-350 mx-auto">
      <SectionHeading eyebrow="What They Say" title="Voices of Our Guests" center
        subtitle="Don't take our word for it — hear from the people who know our baking best." />
      <div class="grid md:grid-cols-3 gap-8 mt-16">
        <div v-for="(t, i) in featuredTestimonials" :key="t.id"
          class="testi-card bg-cream rounded-3xl p-9 border border-amber-100 hover:border-amber/40 hover:shadow-xl transition-all duration-400 group"
          :class="i === 1 ? 'md:-mt-4 md:mb-4' : ''">
          <!-- Stars -->
          <div class="flex gap-1 mb-4">
            <svg v-for="s in 5" :key="s" class="w-4 h-4 star-fill" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
            </svg>
          </div>
          <p class="font-accent text-xl text-chocolate/80 leading-relaxed mb-8 italic">"{{ t.text }}"</p>
          <div class="flex items-center gap-4 mt-auto">
            <img :src="t.avatar" :alt="t.name" class="w-12 h-12 rounded-full object-cover border-2 border-amber/20" />
            <div>
              <p class="font-body text-base font-semibold text-chocolate">{{ t.name }}</p>
              <p class="font-body text-sm text-chocolate/40">{{ t.role }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center mt-10">
        <RouterLink to="/testimonials" class="btn-link">Read All Reviews →</RouterLink>
      </div>
    </section>

    <!-- ── INSTAGRAM FEED ──────────────────────────── -->
    <section class="py-10 overflow-hidden bg-cream-dark">
      <div class="max-w-350 mx-auto px-6 mb-8 flex items-center justify-between">
        <SectionHeading eyebrow="@maisondoree" title="Follow Our Journey" :center="false" :line="false" />
        <a href="#" class="btn-link shrink-0">Follow on Instagram →</a>
      </div>
      <div class="grid grid-cols-3 md:grid-cols-6 gap-1.5 max-w-350 mx-auto px-6">
        <a v-for="item in instaFeed" :key="item.id" href="#"
          class="insta-img group relative rounded-2xl overflow-hidden aspect-square">
          <img :src="item.image" :alt="`Instagram post`" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
          <div class="absolute inset-0 bg-chocolate/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
            <span class="text-cream text-sm flex items-center gap-1">
              <AppIcon name="heart" :size="14" />
              {{ formatNum(item.likes) }}
            </span>
          </div>
        </a>
      </div>
    </section>

    <!-- ── MEET THE BAKERS ─────────────────────────── -->
    <section ref="bakersEl" class="py-32 px-6 max-w-350 mx-auto">
      <SectionHeading eyebrow="The Craftspeople" title="Meet Our Bakers" center
        subtitle="The hands, hearts, and minds behind every exceptional bite." />
      <div class="grid md:grid-cols-3 gap-8 mt-14">
        <div v-for="(baker, i) in allBakers" :key="baker.id"
          class="baker-card group text-center" :ref="el => bakerCards[i] = el">
          <div class="relative inline-block mb-6">
            <div class="w-40 h-40 rounded-full overflow-hidden mx-auto border-4 border-cream shadow-xl group-hover:border-amber transition-colors duration-500">
              <img :src="baker.image" :alt="baker.name" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <div class="absolute -bottom-2 -right-2 w-10 h-10 bg-amber rounded-full flex items-center justify-center text-chocolate font-bold text-sm shadow-lg">{{ i + 1 }}</div>
          </div>
          <h3 class="font-display text-xl font-bold text-chocolate">{{ baker.name }}</h3>
          <p class="font-body text-amber text-sm mt-1">{{ baker.role }}</p>
          <p class="font-body text-sm text-chocolate/55 mt-3 leading-relaxed max-w-xs mx-auto line-clamp-3">{{ baker.bio }}</p>
          <p class="font-accent text-chocolate/40 text-sm italic mt-3">{{ baker.specialty }}</p>
        </div>
      </div>
      <div class="flex justify-center mt-12">
        <RouterLink to="/bakers" class="btn-explore">
          <span>Meet The Full Team</span>
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 12h14M12 5l7 7-7 7" stroke-width="1.5" stroke-linecap="round"/></svg>
        </RouterLink>
      </div>
    </section>

    <!-- ── OUR PROCESS ─────────────────────────────── -->
    <section ref="processEl" class="py-24 bg-chocolate relative overflow-hidden noise">
      <div class="absolute inset-0 opacity-5" style="background: repeating-linear-gradient(45deg, #D4A853 0px, #D4A853 1px, transparent 1px, transparent 40px)"></div>
      <div class="max-w-350 mx-auto px-6 relative z-10">
        <SectionHeading eyebrow="The Method" title="Our Process" center
          subtitle="From grain to table, every step matters."
          class="text-cream [&_.heading-text]:text-cream [&_.font-body]:text-cream/50 [&_.eyebrow-line]:text-amber" />
        <div class="relative mt-16">
          <!-- Timeline line -->
          <div class="absolute top-8 left-0 right-0 h-px bg-amber/20 hidden lg:block"></div>
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div v-for="(step, i) in processSteps" :key="i" class="process-step text-center group">
              <div class="relative inline-flex flex-col items-center mb-6">
                <div class="w-16 h-16 rounded-2xl bg-amber/10 border border-amber/20 flex items-center justify-center text-amber mb-4 group-hover:bg-amber/20 group-hover:border-amber/50 transition-all duration-400 group-hover:scale-110">
                  <AppIcon :name="step.icon" :size="28" :stroke-width="1.25" />
                </div>
                <div class="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-amber rounded-full flex items-center justify-center text-chocolate text-xs font-bold shadow-lg lg:flex">{{ i + 1 }}</div>
              </div>
              <h3 class="font-display text-lg font-bold text-cream mt-4">{{ step.title }}</h3>
              <p class="font-body text-sm text-cream/50 mt-2 leading-relaxed">{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── STATISTICS ──────────────────────────────── -->
    <section ref="statsEl" class="py-28 bg-cream">
      <div class="max-w-350 mx-auto px-6">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div v-for="(stat, i) in statsData" :key="i" class="stat-item text-center group">
            <div class="mb-5 flex justify-center text-amber group-hover:scale-125 transition-transform duration-300">
              <AppIcon :name="stat.icon" :size="48" :stroke-width="1.25" />
            </div>
            <div class="font-display text-6xl font-bold text-chocolate mb-3">
              <span class="counter-val" :data-target="stat.value">0</span><span class="gradient-text">{{ stat.suffix }}</span>
            </div>
            <p class="font-body text-base text-chocolate/50 tracking-wide">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ── RECIPE PREVIEW ──────────────────────────── -->
    <section class="py-32 px-6 max-w-350 mx-auto">
      <div class="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-14">
        <SectionHeading eyebrow="From Our Kitchen" title="Recipes & Guides" :center="false" :line="false" />
        <RouterLink to="/recipes" class="btn-link shrink-0">All Recipes →</RouterLink>
      </div>
      <div class="grid md:grid-cols-3 gap-8">
        <RouterLink v-for="recipe in allRecipes" :key="recipe.id" :to="`/recipes`"
          class="recipe-card group bg-cream rounded-3xl overflow-hidden border border-amber-100 hover:border-amber/40 hover:shadow-xl transition-all duration-400">
          <div class="aspect-video overflow-hidden">
            <img :src="recipe.image" :alt="recipe.title" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          </div>
          <div class="p-7">
            <div class="flex items-center gap-2 mb-4">
              <span class="font-body text-xs px-3 py-1.5 bg-amber/10 text-amber rounded-full font-medium">{{ recipe.difficulty }}</span>
              <span class="font-body text-sm text-chocolate/40 flex items-center gap-1.5"><AppIcon name="clock" :size="13" /> {{ recipe.time }}</span>
            </div>
            <h3 class="font-display text-xl font-bold text-chocolate group-hover:text-amber transition-colors leading-tight">{{ recipe.title }}</h3>
            <p class="font-body text-base text-chocolate/55 mt-3 line-clamp-2 leading-relaxed">{{ recipe.description }}</p>
            <p class="font-body text-sm text-chocolate/40 mt-4">By {{ recipe.chef }}</p>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- ── FAQ PREVIEW ──────────────────────────────── -->
    <section class="py-20 bg-cream-dark px-6">
      <div class="max-w-3xl mx-auto">
        <SectionHeading eyebrow="Questions" title="Frequently Asked" center />
        <div class="mt-12 space-y-3">
          <div v-for="(faq, i) in faqData.slice(0, 4)" :key="i"
            class="bg-white rounded-2xl border border-amber-100 overflow-hidden">
            <button @click="toggleFaq(i)"
              class="w-full flex items-center justify-between px-6 py-5 text-left group hover:bg-cream transition-colors duration-200">
              <span class="font-display font-semibold text-chocolate text-base">{{ faq.q }}</span>
              <span class="text-amber text-xl transition-transform duration-300 shrink-0 ml-4" :class="openFaq === i ? 'rotate-45' : ''">+</span>
            </button>
            <Transition name="accordion">
              <div v-if="openFaq === i" class="px-6 pb-5 font-body text-sm text-chocolate/65 leading-relaxed border-t border-amber-50">
                <div class="pt-4">{{ faq.a }}</div>
              </div>
            </Transition>
          </div>
        </div>
        <div class="flex justify-center mt-8">
          <RouterLink to="/faq" class="btn-link">View All FAQs →</RouterLink>
        </div>
      </div>
    </section>

    <!-- ── STORE LOCATIONS ──────────────────────────── -->
    <section class="py-32 px-6 max-w-350 mx-auto">
      <SectionHeading eyebrow="Find Us" title="Our Locations" center
        subtitle="Three locations, one unwavering standard of excellence." />
      <div class="grid md:grid-cols-3 gap-8 mt-16">
        <div v-for="loc in allLocations" :key="loc.id"
          class="location-card bg-cream border border-amber-100 rounded-3xl p-9 hover:border-amber/40 hover:shadow-xl transition-all duration-400 group">
          <div class="w-14 h-14 bg-amber/10 rounded-2xl flex items-center justify-center text-amber mb-6 group-hover:bg-amber/20 transition-colors">
            <AppIcon name="mappin" :size="22" />
          </div>
          <h3 class="font-display text-xl font-bold text-chocolate">{{ loc.name }}</h3>
          <p class="font-body text-base text-chocolate/55 mt-3">{{ loc.address }}</p>
          <p class="font-body text-base text-amber mt-2">{{ loc.phone }}</p>
          <p class="font-body text-sm text-chocolate/40 mt-2">{{ loc.hours }}</p>
          <RouterLink to="/locations" class="mt-4 inline-flex items-center gap-1 font-body text-sm text-amber hover:text-amber-dark transition-colors">
            Get Directions <span class="text-xs">→</span>
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import ProductCard from '@/components/ui/ProductCard.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import AppIcon from '@/components/ui/AppIcon.vue'
import { products, categories, testimonials, bakers, recipes, stats, faqs, locations, instagramFeed } from '@/data/products'
import { useCart } from '@/stores/cart'
import { useToast } from '@/stores/toast'

gsap.registerPlugin(ScrollTrigger)

const { addItem, openCart } = useCart()
const { success } = useToast()

// Refs
const heroEl = ref(null)
const heroBgEl = ref(null)
const heroEyebrowEl = ref(null)
const heroTitleEl = ref(null)
const heroSubEl = ref(null)
const heroCtaEl = ref(null)
const heroStatsEl = ref(null)
const heroCardEl = ref(null)
const scrollIndicatorEl = ref(null)
const featuredEl = ref(null)
const freshEl = ref(null)
const whyEl = ref(null)
const storyEl = ref(null)
const catEl = ref(null)
const bestEl = ref(null)
const testiEl = ref(null)
const bakersEl = ref(null)
const processEl = ref(null)
const statsEl = ref(null)
const specialsEl = ref(null)
const bakerCards = ref([])
const openFaq = ref(null)

// Data
const featuredProducts = computed(() => products.filter(p => p.isFeatured).slice(0, 4))
const freshProducts = computed(() => products.filter(p => p.isFresh).slice(0, 5))
const bestSellers = computed(() => products.filter(p => p.badge === 'Best Seller' || p.reviews > 200).slice(0, 3))
const allProducts = computed(() => products)
const allCategories = computed(() => categories)
const featuredTestimonials = computed(() => testimonials.filter(t => t.featured))
const allBakers = computed(() => bakers)
const allRecipes = computed(() => recipes)
const statsData = computed(() => stats)
const faqData = computed(() => faqs)
const allLocations = computed(() => locations)
const instaFeed = computed(() => instagramFeed)

const marqueeItems = ['Artisan Sourdough', 'Velvet Cakes', 'Butter Croissants', 'Seasonal Tarts', 'Award-Winning', 'Fresh Daily', 'Paris-Brest', 'Macarons']

const heroStats = [
  { value: '15+', label: 'Years of Craft' },
  { value: '200+', label: 'Recipes' },
  { value: '12k+', label: 'Happy Guests' },
]

const whyItems = [
  { icon: 'wheat', title: 'Premium Ingredients', desc: 'Heritage grain, single-origin chocolate, and seasonal produce from trusted local farms.' },
  { icon: 'clock', title: 'Baked Fresh Daily', desc: 'Two baking shifts ensure every item on our shelves was made within hours, not days.' },
  { icon: 'award', title: 'French Technique', desc: 'Our recipes follow classical methods refined over centuries in the finest French pâtisseries.' },
  { icon: 'truck', title: 'Same-Day Delivery', desc: 'Order before 2pm for same-day delivery within our 25-mile radius.' },
]

const processSteps = [
  { icon: 'wheat', title: 'Source', desc: 'We hand-select heritage grains and seasonal ingredients from certified farms.' },
  { icon: 'flask', title: 'Ferment', desc: 'Long, cold fermentation develops complex flavors no shortcut can replicate.' },
  { icon: 'flame', title: 'Bake', desc: 'Stone ovens and precise temperature control ensure perfection in every batch.' },
  { icon: 'package', title: 'Deliver', desc: 'Carefully packaged and delivered fresh to your door within hours of baking.' },
]

function toggleFaq(i) { openFaq.value = openFaq.value === i ? null : i }

function addToCart(product) {
  addItem(product)
  openCart()
  success(`${product.name} added to cart!`)
}

function addFeaturedToCart() {
  const cake = products.find(p => p.slug === 'velvet-rose-cake')
  if (cake) addToCart(cake)
}

function formatNum(n) { return n >= 1000 ? `${(n/1000).toFixed(1)}k` : n }

onMounted(() => {
  // ── Hero animations ──────────────────────────────
  const heroTl = gsap.timeline({ delay: 0.8 })
  heroTl
    .to(heroEyebrowEl.value, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
    .to(heroTitleEl.value, { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.4')
    .to(heroSubEl.value, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
    .to(heroCtaEl.value, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
    .to(heroStatsEl.value, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
    .to(heroCardEl.value ?? {}, { opacity: 1, x: 0, duration: 0.8, ease: 'back.out(1.2)' }, '-=0.6')
    .to(scrollIndicatorEl.value, { opacity: 1, duration: 0.5 }, '-=0.2')

  // Hero bg set initial state
  gsap.set([heroEyebrowEl.value, heroTitleEl.value, heroSubEl.value, heroCtaEl.value, heroStatsEl.value], { y: 40 })
  gsap.set(heroCardEl.value, { x: 60 })

  // Hero parallax background
  gsap.to(heroBgEl.value, {
    yPercent: 20,
    ease: 'none',
    scrollTrigger: { trigger: heroEl.value, start: 'top top', end: 'bottom top', scrub: true }
  })

  // Scroll indicator animation
  gsap.to('.scroll-line', { scaleY: 0, duration: 1.5, repeat: -1, ease: 'none', transformOrigin: 'top', repeatDelay: 0.5 })

  // ── Fresh cards stagger ──────────────────────────
  gsap.from('.fresh-card', {
    scale: 0.92, y: 30, duration: 0.7, stagger: 0.1, ease: 'power3.out',
    scrollTrigger: { trigger: freshEl.value, start: 'top 90%', once: true }
  })

  // ── Why cards ────────────────────────────────────
  gsap.from('.why-card', {
    y: 50, duration: 0.8, stagger: 0.15, ease: 'power3.out',
    scrollTrigger: { trigger: whyEl.value, start: 'top 90%', once: true }
  })

  // ── Categories ───────────────────────────────────
  gsap.from('.cat-card', {
    scale: 0.88, y: 30, duration: 0.7, stagger: 0.08, ease: 'back.out(1.3)',
    scrollTrigger: { trigger: catEl.value, start: 'top 90%', once: true }
  })

  // ── Testimonials ─────────────────────────────────
  gsap.from('.testi-card', {
    y: 50, duration: 0.8, stagger: 0.15, ease: 'power3.out',
    scrollTrigger: { trigger: testiEl.value, start: 'top 90%', once: true }
  })

  // ── Bakers ───────────────────────────────────────
  gsap.from('.baker-card', {
    y: 60, scale: 0.95, duration: 0.8, stagger: 0.2, ease: 'power3.out',
    scrollTrigger: { trigger: bakersEl.value, start: 'top 90%', once: true }
  })

  // ── Process steps ────────────────────────────────
  gsap.from('.process-step', {
    y: 50, duration: 0.7, stagger: 0.15, ease: 'power3.out',
    scrollTrigger: { trigger: processEl.value, start: 'top 90%', once: true }
  })

  // ── Number counters ──────────────────────────────
  ScrollTrigger.create({
    trigger: statsEl.value,
    start: 'top 90%',
    once: true,
    onEnter: () => {
      document.querySelectorAll('.counter-val').forEach(el => {
        const target = parseInt(el.dataset.target)
        gsap.to({ val: 0 }, {
          val: target, duration: 2, ease: 'power2.out',
          onUpdate() { el.textContent = Math.round(this.targets()[0].val).toLocaleString() }
        })
      })
    }
  })

  // ── Special cards ────────────────────────────────
  gsap.from('.special-card', {
    x: 50, duration: 0.6, stagger: 0.1, ease: 'power2.out',
    scrollTrigger: { trigger: specialsEl.value, start: 'top 90%', once: true }
  })

  // ── Location cards ───────────────────────────────
  gsap.from('.location-card', {
    y: 40, duration: 0.7, stagger: 0.15, ease: 'power3.out',
    scrollTrigger: { trigger: '.location-card', start: 'top 90%', once: true }
  })

  // ── Recipe cards ─────────────────────────────────
  gsap.from('.recipe-card', {
    y: 40, duration: 0.7, stagger: 0.15, ease: 'power3.out',
    scrollTrigger: { trigger: '.recipe-card', start: 'top 90%', once: true }
  })

  // ── Instagram feed ───────────────────────────────
  gsap.from('.insta-img', {
    scale: 0.9, duration: 0.5, stagger: 0.06, ease: 'power2.out',
    scrollTrigger: { trigger: '.insta-img', start: 'top 90%', once: true }
  })

  // Refresh ScrollTrigger after fonts/images load to fix position calculations
  setTimeout(() => ScrollTrigger.refresh(), 400)
  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true })

  // ── Mouse parallax on hero ───────────────────────
  const onMouseMove = (e) => {
    if (!heroBgEl.value) return
    const xPct = (e.clientX / window.innerWidth - 0.5) * 20
    const yPct = (e.clientY / window.innerHeight - 0.5) * 20
    gsap.to(heroBgEl.value, { x: xPct, y: yPct, duration: 1.5, ease: 'power1.out', overwrite: false })
  }
  document.addEventListener('mousemove', onMouseMove)

  onUnmounted(() => {
    document.removeEventListener('mousemove', onMouseMove)
    ScrollTrigger.getAll().forEach(t => t.kill())
  })
})
</script>

<style scoped>
.btn-hero-primary {
  display: inline-flex; align-items: center; gap: 0.5rem;
  background: #D4A853; color: #3D1F0B;
  font-family: 'Outfit', system-ui, sans-serif; font-weight: 600;
  padding: 1rem 2rem; border-radius: 1rem; transition: all 0.3s;
}
.btn-hero-primary:hover { background: #E8C47A; box-shadow: 0 25px 50px rgba(212,168,83,0.4); transform: scale(1.05); }

.btn-hero-outline {
  display: inline-flex; align-items: center; gap: 0.5rem;
  border: 1px solid rgba(255,255,255,0.3); color: #FFF8F0;
  font-family: 'Outfit', system-ui, sans-serif; font-weight: 500;
  padding: 1rem 2rem; border-radius: 1rem; transition: all 0.3s;
}
.btn-hero-outline:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.6); }

.btn-explore {
  display: inline-flex; align-items: center; gap: 0.5rem;
  border: 1px solid rgba(212,168,83,0.4); color: #D4A853;
  font-family: 'Outfit', system-ui, sans-serif; font-weight: 500;
  padding: 0.75rem 1.5rem; border-radius: 1rem; transition: all 0.3s;
}
.btn-explore:hover { background: rgba(212,168,83,0.1); border-color: #D4A853; }

.btn-link {
  font-family: 'Outfit', system-ui, sans-serif; font-size: 0.875rem;
  color: #D4A853; font-weight: 500; transition: color 0.2s;
  position: relative;
}
.btn-link::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 0; height: 1px; background: #D4A853; transition: width 0.4s; }
.btn-link:hover { color: #B8860B; }
.btn-link:hover::after { width: 100%; }

.btn-offer {
  display: inline-flex; align-items: center; gap: 0.75rem;
  background: #D4A853; color: #3D1F0B;
  font-family: 'Outfit', system-ui, sans-serif; font-weight: 700;
  padding: 1.25rem 2.5rem; border-radius: 1rem; font-size: 1.125rem;
  transition: all 0.3s; box-shadow: 0 20px 40px rgba(212,168,83,0.3);
}
.btn-offer:hover { background: #E8C47A; transform: scale(1.05); }

.process-bg-pattern {
  background: repeating-linear-gradient(45deg, #D4A853 0px, #D4A853 1px, transparent 1px, transparent 40px);
}
</style>
