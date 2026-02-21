const CATEGORIES = [
  { key: 'dnaXp', label: 'DNA', color: '#86001c' },
  { key: 'mendelianXp', label: 'Mendelian', color: '#8b5cf6' },
  { key: 'molecularXp', label: 'Molecular', color: '#0ea5e9' },
  { key: 'evolutionXp', label: 'Evolution', color: '#f59e0b' },
]

export default function StatsRadar({ userData }) {
  const values = CATEGORIES.map((c) => userData[c.key] || 0)
  const maxVal = Math.max(...values, 100)

  // Calculate points for diamond/square shape
  const size = 140
  const center = size / 2
  const radius = size / 2 - 20

  const angles = [(-Math.PI / 2), 0, (Math.PI / 2), Math.PI]
  const points = values.map((v, i) => {
    const r = (v / maxVal) * radius
    return {
      x: center + r * Math.cos(angles[i]),
      y: center + r * Math.sin(angles[i]),
    }
  })
  const bgPoints = angles.map((a) => ({
    x: center + radius * Math.cos(a),
    y: center + radius * Math.sin(a),
  }))

  const polyBg = bgPoints.map((p) => `${p.x},${p.y}`).join(' ')
  const polyData = points.map((p) => `${p.x},${p.y}`).join(' ')

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Grid lines */}
        {[0.25, 0.5, 0.75, 1].map((s) => (
          <polygon key={s}
            points={angles.map((a) => `${center + radius * s * Math.cos(a)},${center + radius * s * Math.sin(a)}`).join(' ')}
            fill="none" stroke="#e5e7eb" strokeWidth="1" />
        ))}
        {/* Axis lines */}
        {bgPoints.map((p, i) => (
          <line key={i} x1={center} y1={center} x2={p.x} y2={p.y} stroke="#d1d5db" strokeWidth="1" />
        ))}
        {/* Data polygon */}
        <polygon points={polyData} fill="rgba(134,0,28,0.15)" stroke="#86001c" strokeWidth="2" />
        {/* Data points */}
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="4" fill={CATEGORIES[i].color} />
        ))}
      </svg>
      <div className="grid grid-cols-2 gap-x-6 gap-y-1 mt-2">
        {CATEGORIES.map((c, i) => (
          <div key={c.key} className="flex items-center gap-1.5 text-xs">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
            <span className="text-gray-600">{c.label}</span>
            <span className="font-bold ml-auto" style={{ color: c.color }}>{values[i]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
