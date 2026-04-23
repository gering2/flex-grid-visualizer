const CONTENT_ITEMS = [
  'Short',
  'Medium text',
  'This is a much longer piece of content',
  'Hi',
  'Another medium one',
  'Quite a bit more text here indeed',
];

export default function PreviewArea({ previewClasses, previewStyle, flexGrow = [], flexItems = 3, mode, contentMode = 'equal', grid = {} }) {
  const items = Array.from({ length: flexItems }, (_, i) => i + 1);
  const isContent = contentMode === 'content';
  const displayItems = items.map((n, idx) => (isContent ? CONTENT_ITEMS[idx % CONTENT_ITEMS.length] : String(n)));
  const boardPaddingClass = 'p-4 sm:p-5';
  const itemSpacingClass = isContent ? 'px-4 py-3' : 'px-3 py-2';
  const showTrackLines = mode === 'grid' && grid?.showTrackLines;
  const cols = Number(grid.gridCols ?? 3);
  const rows = Number(grid.gridRows ?? 2);

  return (
    <div className="flex h-full min-h-0 flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <div className="section-title">Preview</div>
        <div className="flex items-center gap-2">
          {isContent && (
            <span className="rounded-full bg-amber-100 text-amber-700 text-xs font-semibold px-2.5 py-1 uppercase tracking-[0.08em]">content-based</span>
          )}
          <span className="rounded-full bg-[var(--accent-bg)] text-[var(--accent-strong)] text-xs font-semibold px-2.5 py-1 uppercase tracking-[0.08em]">{mode}</span>
        </div>
      </div>
      <div className={`preview-board relative w-full mx-auto min-h-[18rem] sm:min-h-[22rem] lg:flex-1 lg:min-h-0 ${boardPaddingClass} ${previewClasses} transition-all duration-200 ease-out`} style={previewStyle}>
        {/* Guide cells: actual grid children so they share the same track sizing as real items */}
        {showTrackLines && Array.from({ length: cols * rows }, (_, idx) => (
          <div
            key={`guide-${idx}`}
            style={{
              gridColumn: (idx % cols) + 1,
              gridRow: Math.floor(idx / cols) + 1,
              alignSelf: 'stretch',
              justifySelf: 'stretch',
            }}
            className="pointer-events-none z-0 border border-dashed border-slate-500/80 rounded-md"
          />
        ))}
        {items.map((n, idx) => (
          <div
            key={n}
            style={{
              ...(mode === 'flex' && !isContent ? { flexGrow: flexGrow[idx] ?? 0 } : {}),
              ...(mode === 'flex' && isContent ? { flexGrow: 0 } : {}),
              ...(mode === 'grid' ? {
                gridColumn: (idx % cols) + 1,
                gridRow: Math.floor(idx / cols) + 1,
              } : {}),
            }}
            className={`relative z-[1] box-border max-w-full overflow-hidden bg-[var(--surface-2)] border border-[var(--border)] rounded-xl flex items-center justify-center text-sm font-semibold text-[var(--accent-strong)] min-w-0 break-words text-center ${
              isContent
                ? itemSpacingClass
                : mode === 'flex'
                  ? 'flex-1 min-h-[3.25rem] basis-[3.25rem] w-[3.25rem]'
                  : itemSpacingClass
            } transition-all duration-200 ease-out`}
          >
            {displayItems[idx]}
          </div>
        ))}
      
      </div>
    </div>
  );
}