export default function PreviewArea({ previewClasses, previewStyle, flexGrow = [], flexItems = 3, mode }) {
  const items = Array.from({ length: flexItems }, (_, i) => i + 1);

  return (
    <div className="flex h-full min-h-0 flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <div className="section-title">Preview</div>
        <span className="rounded-full bg-[var(--accent-bg)] text-[var(--accent-strong)] text-xs font-semibold px-2.5 py-1 uppercase tracking-[0.08em]">{mode}</span>
      </div>
      <div className={`preview-board w-full mx-auto min-h-[18rem] sm:min-h-[22rem] lg:flex-1 lg:min-h-0 p-4 sm:p-5 ${previewClasses} transition-all duration-200 ease-out`} style={previewStyle}>
        {items.map((n, idx) => (
          <div
            key={n}
            style={mode === 'flex' ? { flexGrow: flexGrow[idx] ?? 0 } : {}}
            className={`relative z-[1] bg-[var(--surface-2)] border border-[var(--border)] rounded-xl flex items-center justify-center text-base sm:text-lg font-semibold text-[var(--accent-strong)] min-w-0 ${mode === 'flex' ? 'flex-1 min-h-[3.25rem] basis-[3.25rem] w-[3.25rem]' : 'px-3 py-2'} transition-all duration-200 ease-out`}
          >
            {n}
          </div>
        ))}
      
      </div>
    </div>
  );
}