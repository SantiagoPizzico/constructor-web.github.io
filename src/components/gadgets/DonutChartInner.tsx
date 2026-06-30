import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

const COLORS = ['var(--brand)', '#1d9e75', '#e8590c', '#6a4cff', '#1d6fd6']

export default function DonutChartInner({ data }: { data: { name: string; value: number }[] }) {
  const total = data.reduce((a, d) => a + d.value, 0) || 1
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, alignItems: 'center' }}>
      <div style={{ width: '100%', height: 220 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={50} outerRadius={85} paddingAngle={2} isAnimationActive={false}>
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="space-y-2">
        {data.map((d, i) => (
          <div key={d.name} className="flex items-center gap-2 text-sm">
            <span className="w-3 h-3 rounded-sm inline-block" style={{ background: COLORS[i % COLORS.length] }} />
            <span className="flex-1">{d.name}</span>
            <span className="text-muted">{Math.round((d.value / total) * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
