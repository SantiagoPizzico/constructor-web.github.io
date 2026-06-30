// Encabezado de sección reutilizable: eyebrow + título + subtítulo.
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
}) {
  return (
    <div className="text-center mb-8">
      {eyebrow && <div className="text-xs font-semibold uppercase tracking-wider text-brand mb-2">{eyebrow}</div>}
      <h2 className="font-heading text-3xl font-bold">{title}</h2>
      <span className="mx-auto mt-3 block h-1 w-12 rounded-full bg-accent" />
      {subtitle && <p className="text-muted mt-3 max-w-xl mx-auto">{subtitle}</p>}
    </div>
  )
}
