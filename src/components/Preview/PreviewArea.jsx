const CONTENT_ITEMS = [
  'Short',
  'Medium text',
  'This is a much longer piece of content',
  'Hi',
  'Another medium one',
  'Quite a bit more text here indeed',
];

const ITEM_PALETTES = [
  { bg: 'linear-gradient(135deg,#ede9fe 0%,#ddd6fe 100%)', border: '#c4b5fd', color: '#5b21b6' },
  { bg: 'linear-gradient(135deg,#dbeafe 0%,#bfdbfe 100%)', border: '#93c5fd', color: '#1d4ed8' },
  { bg: 'linear-gradient(135deg,#d1fae5 0%,#a7f3d0 100%)', border: '#6ee7b7', color: '#065f46' },
  { bg: 'linear-gradient(135deg,#fce7f3 0%,#fbcfe8 100%)', border: '#f9a8d4', color: '#9d174d' },
  { bg: 'linear-gradient(135deg,#fef3c7 0%,#fde68a 100%)', border: '#fcd34d', color: '#92400e' },
  { bg: 'linear-gradient(135deg,#fee2e2 0%,#fecaca 100%)', border: '#fca5a5', color: '#991b1b' },
];

export default function PreviewArea({
  previewClasses,
  previewStyle,
  flexGrow = [],
  flexItems = 3,
  mode,
  contentMode = 'equal',
  grid = {},
  activePropertyCount,
}) {
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
          <span className="rounded-full bg-[var(--accent-bg)] text-[var(--accent-strong)] text-xs font-semibold px-2.5 py-1 uppercase tracking-[0.08em]">
            {mode}{activePropertyCount != null ? ` · ${activePropertyCount} props` : ''}
          </span>
        </div>
      </div>
      <div
        className={`preview-board relative w-full mx-auto min-h-[18rem] sm:min-h-[22rem] lg:flex-1 lg:min-h-0 rounded-xl border border-gray-200 bg-gradient-to-b from-white to-slate-50/70 shadow-inner ${boardPaddingClass} ${previewClasses} transition-all duration-200 ease-out`}
        style={previewStyle}
      >
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
              background: ITEM_PALETTES[idx % ITEM_PALETTES.length].bg,
              border: `1.5px solid ${ITEM_PALETTES[idx % ITEM_PALETTES.length].border}`,
              color: ITEM_PALETTES[idx % ITEM_PALETTES.length].color,
              ...(mode === 'flex' && !isContent ? { flexGrow: flexGrow[idx] ?? 0 } : {}),
              ...(mode === 'flex' && isContent ? { flexGrow: 0 } : {}),
              ...(mode === 'grid' ? {
                gridColumn: (idx % cols) + 1,
                gridRow: Math.floor(idx / cols) + 1,
              } : {}),
            }}
            className={`relative z-[1] box-border max-w-full overflow-hidden rounded-xl flex items-center justify-center text-sm font-semibold min-w-0 break-words text-center shadow-sm ring-1 ring-white/60 ${
              isContent
                ? itemSpacingClass
                : mode === 'flex'
                  ? 'flex-1 min-h-[4rem] basis-[4rem] w-[4rem]'
                  : 'px-3 py-4'
            } transition-all duration-200 ease-out`}
          >
            {displayItems[idx]}
          </div>
        ))}
      
      </div>
    </div>
  );
}