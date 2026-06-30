import type { BusinessType } from '../types'

// Contenido demo adaptable por rubro (separado de los componentes).

export const heroCopy: Record<BusinessType, { title: string; subtitle: string; cta: string }> = {
  gimnasio: { title: 'Entrená con los mejores', subtitle: 'Disciplinas para todos los niveles, cerca tuyo.', cta: 'Probá una clase gratis' },
  restaurante: { title: 'Sabores que enamoran', subtitle: 'Cocina casera con ingredientes frescos.', cta: 'Reservar mesa' },
  comercio: { title: 'Todo lo que buscás, en un solo lugar', subtitle: 'Envíos a todo el país y pago seguro.', cta: 'Ver productos' },
  salud: { title: 'Tu salud en buenas manos', subtitle: 'Profesionales y turnos cuando los necesitás.', cta: 'Pedir turno' },
  estetica: { title: 'Realzá tu belleza natural', subtitle: 'Tratamientos personalizados para vos.', cta: 'Reservar turno' },
  servicios: { title: 'Soluciones a tu medida', subtitle: 'Asesoría profesional para tu proyecto.', cta: 'Pedí presupuesto' },
  inmobiliaria: { title: 'Encontrá tu próximo hogar', subtitle: 'Las mejores propiedades, en un clic.', cta: 'Ver propiedades' },
  portfolio: { title: 'Hola, soy un creativo', subtitle: 'Diseño experiencias memorables.', cta: 'Ver mi trabajo' },
}

export const servicesTitle: Record<BusinessType, string> = {
  gimnasio: 'Disciplinas',
  restaurante: 'Nuestro menú',
  comercio: 'Categorías',
  salud: 'Tratamientos',
  estetica: 'Tratamientos',
  servicios: 'Servicios',
  inmobiliaria: 'Servicios',
  portfolio: 'Lo que hago',
}

export const servicesItems: Record<BusinessType, string[]> = {
  gimnasio: ['Musculación', 'Funcional', 'Yoga'],
  restaurante: ['Entradas', 'Platos principales', 'Postres'],
  comercio: ['Indumentaria', 'Accesorios', 'Ofertas'],
  salud: ['Clínica general', 'Odontología', 'Kinesiología'],
  estetica: ['Facial', 'Masajes', 'Depilación'],
  servicios: ['Consultoría', 'Implementación', 'Soporte'],
  inmobiliaria: ['Venta', 'Alquiler', 'Tasación'],
  portfolio: ['Branding', 'Diseño web', 'Ilustración'],
}

export const galleryTitle: Partial<Record<BusinessType, string>> = {
  portfolio: 'Portfolio',
  estetica: 'Antes y después',
  inmobiliaria: 'Propiedades destacadas',
  restaurante: 'Nuestros platos',
}

export const bookingServices: Partial<Record<BusinessType, { name: string; duration: number }[]>> = {
  salud: [
    { name: 'Consulta general', duration: 30 },
    { name: 'Control', duration: 20 },
  ],
  estetica: [
    { name: 'Limpieza facial', duration: 60 },
    { name: 'Masaje', duration: 45 },
  ],
  gimnasio: [
    { name: 'Clase de prueba', duration: 60 },
    { name: 'Evaluación física', duration: 30 },
  ],
}
