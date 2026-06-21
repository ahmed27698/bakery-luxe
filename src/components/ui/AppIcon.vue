<template>
  <component :is="icon" :size="size" :stroke-width="strokeWidth" :class="className" />
</template>

<script setup>
import { computed } from 'vue'
import {
  Wheat, Cake, Cookie, ChefHat, Croissant, IceCream, Layers, Coffee,
  ShoppingBag, ShoppingCart, Search, Heart, MapPin, Phone, Mail,
  Clock, Clock4, Package, Trophy, Star, Flame, Gift, Home, Sun, Sunrise,
  Leaf, Users, BookOpen, Camera, LayoutGrid, Grid3x3, Check, Plus,
  X, ChevronDown, ChevronUp, ArrowRight, ArrowLeft, Briefcase,
  Sparkles, ScrollText, UtensilsCrossed, Salad, Music, Music2,
  Truck, Zap, Banknote, Target, FlaskConical, Award, BookMarked,
  Bookmark, Menu, Tag, Candy, Sandwich,
  Globe, Play, AlarmClock, GalleryHorizontal,
  Image, Layers2, Archive, BadgeCheck,
  Lock, CreditCard, ShieldCheck, Info, Pen,
} from '@lucide/vue'

const iconMap = {
  // Food
  wheat: Wheat,
  cake: Cake,
  cookie: Cookie,
  chef: ChefHat,
  chefhat: ChefHat,
  croissant: Croissant,
  icecream: IceCream,
  layers: Layers,
  coffee: Coffee,
  candy: Candy,
  sandwich: Sandwich,

  // Shopping / UI
  shoppingbag: ShoppingBag,
  shoppingcart: ShoppingCart,
  search: Search,
  heart: Heart,
  mappin: MapPin,
  location: MapPin,
  phone: Phone,
  mail: Mail,
  clock: Clock,
  package: Package,
  trophy: Trophy,
  star: Star,
  flame: Flame,
  gift: Gift,
  home: Home,
  sun: Sun,
  sunrise: Sunrise,
  leaf: Leaf,
  users: Users,
  bookopen: BookOpen,
  camera: Camera,
  layoutgrid: LayoutGrid,
  grid: Grid3x3,
  check: Check,
  plus: Plus,
  x: X,
  close: X,
  chevrondown: ChevronDown,
  chevronup: ChevronUp,
  arrowright: ArrowRight,
  arrowleft: ArrowLeft,
  briefcase: Briefcase,
  sparkles: Sparkles,
  scrolltext: ScrollText,
  utensils: UtensilsCrossed,
  salad: Salad,
  music: Music,
  truck: Truck,
  zap: Zap,
  banknote: Banknote,
  target: Target,
  flask: FlaskConical,
  award: Award,
  bookmark: BookMarked,
  bookmarkalt: Bookmark,
  menu: Menu,
  tag: Tag,
  image: Image,
  gallery: GalleryHorizontal,
  badge: BadgeCheck,
  archive: Archive,
  alarm: AlarmClock,
  pen: Pen,

  // Social (Lucide has no brand icons; Camera/Globe/Play are closest)
  instagram: Camera,
  facebook: Globe,
  youtube: Play,

  // Security / Payment
  lock: Lock,
  creditcard: CreditCard,
  shield: ShieldCheck,
  info: Info,
}

const props = defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: 20 },
  strokeWidth: { type: [Number, String], default: 1.5 },
  class: { type: String, default: '' },
})

const icon = computed(() => iconMap[props.name.toLowerCase()] || Sparkles)
const className = computed(() => props.class)
</script>
