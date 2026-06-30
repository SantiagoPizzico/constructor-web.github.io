import type { BusinessType } from '../types'

// Combinación inicial de gadgets por rubro (ids del registro).
export const presets: Record<BusinessType, string[]> = {
  gimnasio: ['navbar', 'hero', 'services', 'pricing', 'stats', 'testimonials', 'contact', 'footer', 'whatsapp-float'],
  restaurante: ['navbar', 'hero', 'services', 'gallery', 'testimonials', 'faq', 'map', 'contact', 'footer'],
  comercio: ['navbar', 'hero', 'product-showcase', 'services', 'filters', 'kpis', 'sales-chart', 'top-products', 'funnel', 'inventory', 'footer'],
  salud: ['navbar', 'hero', 'services', 'team', 'booking', 'testimonials', 'faq', 'map', 'contact', 'footer'],
  estetica: ['navbar', 'hero', 'services', 'gallery', 'booking', 'testimonials', 'contact', 'footer'],
  servicios: ['navbar', 'hero', 'services', 'pricing', 'team', 'testimonials', 'cta', 'contact', 'footer'],
  inmobiliaria: ['navbar', 'hero', 'services', 'gallery', 'map', 'contact', 'footer'],
  portfolio: ['navbar', 'hero', 'services', 'gallery', 'footer'],
}
