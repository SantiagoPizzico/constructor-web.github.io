import type { GadgetDefinition } from './types'
import { navbar } from './components/gadgets/Navbar'
import { hero } from './components/gadgets/Hero'
import { services } from './components/gadgets/ServicesGrid'
import { gallery } from './components/gadgets/Gallery'
import { productShowcase } from './components/gadgets/ProductShowcase'
import { pricing } from './components/gadgets/Pricing'
import { stats } from './components/gadgets/Stats'
import { testimonials } from './components/gadgets/Testimonials'
import { faq } from './components/gadgets/Faq'
import { booking } from './components/gadgets/Booking'
import { team } from './components/gadgets/Team'
import { mapLocation } from './components/gadgets/MapLocation'
import { cta } from './components/gadgets/CtaBanner'
import { whatsappFloat } from './components/gadgets/WhatsappFloat'
import { contact } from './components/gadgets/ContactForm'
import { footer } from './components/gadgets/Footer'
import { kpis } from './components/gadgets/KpiRow'
import { salesChart } from './components/gadgets/SalesChart'
import { donutChart } from './components/gadgets/DonutChart'
import { topProducts } from './components/gadgets/TopProducts'
import { dataTable } from './components/gadgets/DataTable'
import { goalGauge } from './components/gadgets/GoalGauge'
import { panelFilters } from './components/gadgets/PanelFilters'
import { funnel } from './components/gadgets/Funnel'
import { inventory } from './components/gadgets/Inventory'

export const gadgets: GadgetDefinition<any>[] = [
  // Web
  navbar,
  hero,
  services,
  gallery,
  productShowcase,
  pricing,
  stats,
  testimonials,
  faq,
  booking,
  team,
  mapLocation,
  cta,
  whatsappFloat,
  contact,
  footer,
  // Panel
  kpis,
  salesChart,
  donutChart,
  topProducts,
  dataTable,
  goalGauge,
  panelFilters,
  funnel,
  inventory,
]

export const registry: Record<string, GadgetDefinition<any>> = Object.fromEntries(
  gadgets.map((g) => [g.meta.id, g]),
)
