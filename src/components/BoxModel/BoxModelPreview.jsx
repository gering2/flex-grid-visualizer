export default function BoxModelPreview({ values }) {
  const borderBoxWidth = values.boxSizing === 'border-box'
    ? values.width
    : values.width + values.padding * 2 + values.border * 2;

  const borderBoxHeight = values.boxSizing === 'border-box'
    ? values.height
    : values.height + values.padding * 2 + values.border * 2;

  const totalWidth = borderBoxWidth + values.margin * 2;
  const totalHeight = borderBoxHeight + values.margin * 2;

  return (
    <section className="panel-surface p-4 sm:p-5 flex flex-col gap-3 min-h-[20rem]">
      <div className="flex items-center justify-between">
        <p className="section-title">Live Preview</p>
        <span className="rounded-full bg-[var(--accent-bg)] text-[var(--accent-strong)] text-xs font-semibold px-2.5 py-1 uppercase tracking-[0.08em]">
          {values.boxSizing}
        </span>
      </div>

      <div className="flex-1 min-h-[14rem] rounded-xl border border-[var(--divider)] bg-[var(--surface-2)] p-4 sm:p-6 grid place-items-center overflow-auto">
        <div
          className="rounded-lg border border-dashed border-[var(--accent-border)] bg-[color:rgba(124,58,237,0.06)] p-4"
          style={{ padding: `${values.margin}px` }}
        >
          <div
            style={{
              width: `${values.width}px`,
              height: `${values.height}px`,
              boxSizing: values.boxSizing,
              padding: `${values.padding}px`,
              border: `${values.border}px solid var(--accent-border)`,
              borderRadius: `${values.borderRadius}px`,
              background: 'white',
              color: 'var(--text)',
              boxShadow: 'var(--shadow-soft)',
              display: 'grid',
              placeItems: 'center',
            }}
          >
            <div className="rounded-md border border-[var(--divider)] bg-[var(--surface-2)] px-3 py-2 text-xs font-semibold tracking-wide text-[var(--text-strong)]">
              Content Box
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-[var(--text)]">
        <div className="rounded-md border border-[var(--divider)] bg-[var(--surface-2)] px-2.5 py-2">
          Border Box: <span className="font-mono text-[var(--text-strong)]">{borderBoxWidth}px x {borderBoxHeight}px</span>
        </div>
        <div className="rounded-md border border-[var(--divider)] bg-[var(--surface-2)] px-2.5 py-2">
          Total Space: <span className="font-mono text-[var(--text-strong)]">{totalWidth}px x {totalHeight}px</span>
        </div>
        <div className="rounded-md border border-[var(--divider)] bg-[var(--surface-2)] px-2.5 py-2">
          Width Rule: <span className="font-mono text-[var(--text-strong)]">{values.width}px</span>
        </div>
      </div>
    </section>
  );
}
