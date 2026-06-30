import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts'

export default function SalesChartInner({ data }: { data: { label: string; value: number }[] }) {
  return (
    <div style={{ width: '100%', height: 240 }}>
      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="label" tick={{ fill: 'var(--muted)', fontSize: 12 }} tickLine={false} axisLine={false} />
          <Tooltip cursor={{ fill: 'rgba(127,127,127,0.12)' }} />
          <Bar dataKey="value" fill="var(--brand)" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
