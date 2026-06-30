import type { ReactNode } from 'react'

// Set de íconos SVG inline (estilo trazo, 24x24, currentColor). Sin dependencias externas.
const PATHS = {
  navbar: (<><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18" /></>),
  hero: (<><rect x="3" y="4" width="18" height="6" rx="1" /><rect x="3" y="13" width="8" height="7" rx="1" /><rect x="13" y="13" width="8" height="7" rx="1" /></>),
  services: (<><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>),
  gallery: (<><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></>),
  pricing: (<><path d="M3 3h8l9 9-8 8-9-9V3z" /><circle cx="7.5" cy="7.5" r="1" /></>),
  stats: (<><path d="M22 7l-8.5 8.5-5-5L2 17" /><path d="M16 7h6v6" /></>),
  testimonials: (<path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.2l1-5.8L3.5 9.2l5.9-.9L12 3z" />),
  faq: (<path d="M21 11.5a8.5 8.5 0 0 1-11.8 7.8L3 21l1.7-6.2A8.5 8.5 0 1 1 21 11.5z" />),
  booking: (<><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M3 9h18M8 2v4M16 2v4" /></>),
  cta: (<><path d="M3 11l16-5v12L3 13z" /><path d="M11 17a3 3 0 0 1-5.5 1" /></>),
  contact: (<><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M2 6l10 7 10-7" /></>),
  footer: (<><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 15h18" /></>),
  kpis: (<><rect x="3" y="3" width="7" height="9" rx="1" /><rect x="14" y="3" width="7" height="5" rx="1" /><rect x="14" y="12" width="7" height="9" rx="1" /><rect x="3" y="16" width="7" height="5" rx="1" /></>),
  sales: (<path d="M22 12h-4l-3 9L9 3l-3 9H2" />),
  donut: (<><circle cx="12" cy="12" r="9" /><path d="M12 3v9h9" /></>),
  top: (<><path d="M7 4h10v5a5 5 0 0 1-10 0V4z" /><path d="M7 6H4v1a3 3 0 0 0 3 3M17 6h3v1a3 3 0 0 1-3 3" /><path d="M9 19h6M12 14v5" /></>),
  table: (<><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M3 15h18M12 3v18" /></>),
  target: (<><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" /></>),
  grip: (<g fill="currentColor" stroke="none"><circle cx="9" cy="6" r="1.3" /><circle cx="9" cy="12" r="1.3" /><circle cx="9" cy="18" r="1.3" /><circle cx="15" cy="6" r="1.3" /><circle cx="15" cy="12" r="1.3" /><circle cx="15" cy="18" r="1.3" /></g>),
  x: (<path d="M18 6L6 18M6 6l12 12" />),
  plus: (<path d="M12 5v14M5 12h14" />),
  chevron: (<path d="M6 9l6 6 6-6" />),
  lock: (<><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></>),
  monitor: (<><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></>),
  mobile: (<><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></>),
  maximize: (<path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3" />),
  map: (<><path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z" /><path d="M9 4v14M15 6v14" /></>),
  phone: (<path d="M5 4h4l2 5-3 2a11 11 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />),
  users: (<><circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0 1 12 0" /><path d="M16 5.5a3 3 0 0 1 0 5.5M21 20a6 6 0 0 0-4.5-5.8" /></>),
  filter: (<path d="M3 5h18l-7 8v6l-4-2v-4z" />),
  funnel: (<path d="M4 6h16M7 11h10M10 16h4" />),
  box: (<><path d="M21 8l-9-5-9 5v8l9 5 9-5z" /><path d="M3 8l9 5 9-5M12 13v8" /></>),
  check: (<path d="M5 13l4 4L19 7" />),
  copy: (<><rect x="9" y="9" width="11" height="11" rx="2" /><path d="M5 15V5a2 2 0 0 1 2-2h10" /></>),
  'star-fill': (<path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.2l1-5.8L3.5 9.2l5.9-.9L12 3z" fill="currentColor" stroke="none" />),
  'chevron-left': (<path d="M15 6l-6 6 6 6" />),
  'chevron-right': (<path d="M9 6l6 6-6 6" />),
  sun: (<><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4 12H2M22 12h-2M6 6L4.5 4.5M19.5 19.5L18 18M18 6l1.5-1.5M4.5 19.5L6 18" /></>),
  moon: (<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />),
  menu: (<path d="M4 6h16M4 12h16M4 18h16" />),
  instagram: (<><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" /></>),
  pin: (<><path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></>),
  search: (<><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></>),
  download: (<><path d="M12 3v12" /><path d="M7 10l5 5 5-5" /><path d="M5 21h14" /></>),
  doc: (<><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5M9 13h6M9 17h6" /></>),
} satisfies Record<string, ReactNode>

export type IconName = keyof typeof PATHS

export function Icon({ name, size = 16, className }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  )
}
