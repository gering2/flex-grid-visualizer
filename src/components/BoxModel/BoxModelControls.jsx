function ControlRow({ label, value, min, max, step = 1, unit = 'px', onChange }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--muted)]">{label}</label>
        <span className="text-xs font-mono text-[var(--text-strong)]">{value}{unit}</span>
      </div>
      <div className="grid grid-cols-[1fr_4.75rem] gap-2 items-center">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full accent-[var(--accent)] cursor-pointer"
        />
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          className="focus-ring w-full rounded-md border border-[var(--border)] bg-[var(--surface-2)] px-2 py-1.5 text-sm text-[var(--text)]"
        />
      </div>
    </div>
  );
}

export default function BoxModelControls({ values, onChange }) {
  return (
    <aside className="panel-surface p-4 sm:p-5 flex flex-col gap-4">
      <div>
        <p className="section-title">Element Size</p>
        <div className="mt-3 space-y-3">
          <ControlRow label="Width" value={values.width} min={120} max={420} onChange={(value) => onChange('width', value)} />
          <ControlRow label="Height" value={values.height} min={80} max={280} onChange={(value) => onChange('height', value)} />
        </div>
      </div>

      <div>
        <p className="section-title">Box Layers</p>
        <div className="mt-3 space-y-3">
          <ControlRow label="Padding" value={values.padding} min={0} max={80} onChange={(value) => onChange('padding', value)} />
          <ControlRow label="Border" value={values.border} min={0} max={24} onChange={(value) => onChange('border', value)} />
          <ControlRow label="Margin" value={values.margin} min={0} max={80} onChange={(value) => onChange('margin', value)} />
          <ControlRow label="Border Radius" value={values.borderRadius} min={0} max={40} onChange={(value) => onChange('borderRadius', value)} />
        </div>
      </div>

      <div>
        <p className="section-title">Box Sizing</p>
        <div className="mt-3 grid grid-cols-2 gap-2 rounded-lg bg-[var(--surface-3)] p-1">
          {['content-box', 'border-box'].map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => onChange('boxSizing', mode)}
              className={`focus-ring rounded-md px-2.5 py-2 text-sm font-semibold cursor-pointer transition ${
                values.boxSizing === mode
                  ? 'bg-white text-[var(--accent-strong)] shadow'
                  : 'text-[var(--text)] hover:bg-white/80'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
