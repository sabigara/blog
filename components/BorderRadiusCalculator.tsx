import React from "react"

export default function BorderRadiusCalculator() {
  const [outerRadius, setOuterRadius] = React.useState(32)
  const [padding, setPadding] = React.useState(16)
  const innerRadius = outerRadius - padding

  return (
    <section className="mx-auto my-8 max-w-md rounded-xl border border-gray-200 bg-gray-100 p-6">
      <div className="font-bold text-sky-600">Nesting border radius calculator</div>
      <div
        className="mt-4 h-[200px] w-full bg-blue-500"
        style={{ borderRadius: outerRadius, padding }}
      >
        <div className="h-full w-full bg-slate-300" style={{ borderRadius: innerRadius }} />
      </div>
      <div className="my-4 font-semibold text-gray-700">
        {outerRadius}px - {padding}px = {innerRadius}px
      </div>
      <Slider title="Outer radius" value={outerRadius} onChange={setOuterRadius} max={100} />
      <Slider title="Gap" value={padding} onChange={setPadding} />
    </section>
  )
}

type SliderProps = {
  title: string
  value: number
  onChange?: (val: number) => void
  min?: number
  max?: number
  step?: number
}

function Slider({ title, value, onChange, min, max, step }: SliderProps) {
  return (
    <label className="block">
      <span className="block">{title}</span>
      <input
        type="range"
        value={value}
        onChange={(e) => onChange?.(Number(e.target.value))}
        min={min}
        max={max}
        step={step}
        className="block w-full"
      />
    </label>
  )
}
