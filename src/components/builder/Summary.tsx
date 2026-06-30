import { useState } from 'react'
import { registry } from '../../registry'
import { useStore } from '../../store'
import { businessLabel } from '../../data/business'
import { getStyle } from '../../data/styles'
import { kindLabel, projectKind } from '../../lib/kind'
import { buildSpec, specToBuildPrompt, specToJson, specToMarkdown } from '../../lib/export'
import type { ProjectSpec } from '../../lib/export'
import { Icon } from '../ui/Icon'

type FormatId = 'md' | 'prompt' | 'json'

const FORMATS: { id: FormatId; label: string; ext: string; mime: string; hint: string; build: (s: ProjectSpec) => string }[] = [
  { id: 'md', label: 'Diseño .md', ext: 'md', mime: 'text/markdown', hint: 'Brief de diseño para alinear con el cliente.', build: specToMarkdown },
  { id: 'prompt', label: 'Prompt', ext: 'txt', mime: 'text/plain', hint: 'Pegalo en Claude Code para construir la web.', build: specToBuildPrompt },
  { id: 'json', label: 'JSON', ext: 'json', mime: 'application/json', hint: 'Spec determinístico para automatizar.', build: specToJson },
]

export default function Summary() {
  const order = useStore((s) => s.order)
  const business = useStore((s) => s.business)
  const styleId = useStore((s) => s.styleId)
  const variantById = useStore((s) => s.variantById)
  const device = useStore((s) => s.device)
  const style = getStyle(styleId)

  const active = order.map((id) => registry[id]).filter(Boolean)
  const kind = kindLabel[projectKind(active)]

  const spec = buildSpec({
    business,
    style,
    device,
    components: active.map((def) => ({ def, variant: variantById[def.meta.id] ?? def.meta.variants?.[0]?.id ?? null })),
  })

  const [format, setFormat] = useState<FormatId>('md')
  const fmt = FORMATS.find((f) => f.id === format) ?? FORMATS[0]
  const output = fmt.build(spec)

  const [copied, setCopied] = useState(false)
  function copyOut() {
    navigator.clipboard?.writeText(output).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }
  function downloadOut() {
    const blob = new Blob([output], { type: fmt.mime })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${format === 'md' ? 'diseno' : format === 'prompt' ? 'prompt' : 'spec'}-${business}.${fmt.ext}`
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  const waText =
    `¡Hola! Armé ${kind} para mi negocio con el Constructor.\n` +
    `Rubro: ${businessLabel(business)}\n` +
    `Estilo: ${style.name}\n` +
    `Componentes:\n` +
    active.map((d) => `- ${d.meta.name}`).join('\n')
  const waLink = `https://wa.me/?text=${encodeURIComponent(waText)}`

  return (
    <aside className="border-l border-ui-line bg-ui-surface overflow-auto thin-scroll p-5 flex flex-col">
      <h2 className="font-semibold mb-1">Resumen</h2>
      <p className="text-sm text-ui-muted mb-4">
        Estás armando <span className="font-medium text-ui-text">{kind}</span> para {businessLabel(business)}.
      </p>

      <div className="flex items-center gap-2 mb-4 rounded-lg border border-ui-line px-3 py-2">
        <span className="flex">
          <span className="w-4 h-4 rounded-full inline-block" style={{ background: style.tokens.brand }} />
          <span className="w-4 h-4 -ml-1.5 rounded-full inline-block border border-ui-surface" style={{ background: style.tokens.accent }} />
        </span>
        <div className="leading-tight">
          <div className="text-sm font-medium">{style.name}</div>
          <div className="text-[11px] text-ui-muted">{style.fits}</div>
        </div>
      </div>

      <div className="text-xs font-semibold uppercase tracking-wide text-ui-muted mb-2">{active.length} componentes</div>
      <ol className="text-sm space-y-1 mb-6">
        {active.map((d, i) => (
          <li key={d.meta.id} className="flex gap-2 items-center">
            <span className="text-ui-muted">{i + 1}.</span>
            <span className="flex-1">{d.meta.name}</span>
            {d.meta.isPanel && <span className="text-[10px] text-ui-muted bg-ui-surface2 rounded px-1.5 py-0.5">panel</span>}
          </li>
        ))}
        {active.length === 0 && <li className="text-ui-muted">Sin componentes todavía.</li>}
      </ol>

      <div className="mt-auto space-y-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ui-muted mb-2">
            <Icon name="doc" size={13} /> Exportar para construir
          </div>
          <div className="flex rounded-lg border border-ui-line overflow-hidden mb-2">
            {FORMATS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFormat(f.id)}
                className={
                  format === f.id
                    ? 'flex-1 px-2 py-1.5 text-xs bg-ui-text text-ui-surface'
                    : 'flex-1 px-2 py-1.5 text-xs hover:bg-ui-surface2 border-l border-ui-line first:border-l-0'
                }
                aria-pressed={format === f.id}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={copyOut} className="flex-1 inline-flex items-center justify-center gap-1.5 border border-ui-line px-3 py-2 rounded-lg text-sm transition hover:bg-ui-surface2 active:scale-[0.99]">
              <Icon name={copied ? 'check' : 'copy'} size={14} /> {copied ? 'Copiado' : 'Copiar'}
            </button>
            <button onClick={downloadOut} className="flex-1 inline-flex items-center justify-center gap-1.5 border border-ui-line px-3 py-2 rounded-lg text-sm transition hover:bg-ui-surface2 active:scale-[0.99]">
              <Icon name="download" size={14} /> Descargar
            </button>
          </div>
          <p className="text-[11px] text-ui-muted mt-2">{fmt.hint}</p>
        </div>

        <a href={waLink} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-medium px-4 py-3 rounded-lg shadow-sm transition hover:brightness-95 active:scale-[0.99]">
          <Icon name="phone" size={16} /> Enviar al cliente
        </a>
      </div>
    </aside>
  )
}
