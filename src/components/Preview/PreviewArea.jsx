const CONTENT_ITEMS = [
  'Short',
  'Medium text',
  'This is a much longer piece of content',
  'Hi',
  'Another medium one',
  'Quite a bit more text here indeed',
];

const ITEM_PALETTES = [
  { bg: '#f8f4ef', border: '#dbd3c7', color: '#464c55' },
  { bg: '#f5f3ee', border: '#d4cec2', color: '#4b525c' },
  { bg: '#f4f0ea', border: '#d4cbbe', color: '#525965' },
  { bg: '#f3f1ed', border: '#d0cbc3', color: '#4b515c' },
  { bg: '#f7f2ea', border: '#d8d0c3', color: '#4e5561' },
  { bg: '#f4f2ee', border: '#d2ccc4', color: '#4a515c' },
];

export default function PreviewArea({
  previewClasses,
  previewStyle,
  flexGrow = [],
  flexShrink = [],
  flexBasis = [],
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
  const featuredPlacement = grid.featuredPlacement ?? { startCol: 1, startRow: 1, colSpan: 1, rowSpan: 1 };

  return (
    <div className="flex h-full min-h-0 flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        <div className="section-title">Preview</div>
        <div className="flex items-center gap-2">
          {isContent && (
            <span className="rounded-full border border-[#ddd5c8] bg-[#faf7f1] text-[#6d6458] text-xs font-medium px-2.5 py-1 tracking-[0.02em]">content-based</span>
          )}
          <span className="rounded-full border border-[var(--accent-border)] bg-[var(--accent-bg)] text-[var(--accent-strong)] text-xs font-medium px-2.5 py-1 tracking-[0.02em]">
            {mode}{activePropertyCount != null ? ` · ${activePropertyCount} props` : ''}
          </span>
        </div>
      </div>
      <div
        className={`preview-board relative w-full mx-auto min-h-[18rem] sm:min-h-[22rem] lg:flex-1 lg:min-h-0 ${boardPaddingClass} ${previewClasses} transition-all duration-200 ease-out`}
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
            className="pointer-events-none z-0 border border-dashed border-slate-500/35 rounded-md"
          />
        ))}
        {items.map((n, idx) => (
          <div
            key={n}
            style={{
              background: ITEM_PALETTES[idx % ITEM_PALETTES.length].bg,
              border: `1px solid ${ITEM_PALETTES[idx % ITEM_PALETTES.length].border}`,
              color: ITEM_PALETTES[idx % ITEM_PALETTES.length].color,
              ...(mode === 'flex'
                ? {
                    flexGrow: isContent ? 0 : (flexGrow[idx] ?? 0),
                    flexShrink: flexShrink[idx] ?? 1,
                    flexBasis: flexBasis[idx] ?? '4rem',
                  }
                : {}),
              ...(mode === 'grid' ? {
                gridColumn: idx === 0
                  ? `${featuredPlacement.startCol} / span ${featuredPlacement.colSpan}`
                  : (idx % cols) + 1,
                gridRow: idx === 0
                  ? `${featuredPlacement.startRow} / span ${featuredPlacement.rowSpan}`
                  : Math.floor(idx / cols) + 1,
              } : {}),
            }}
            className={`item-${idx + 1} relative z-[1] box-border max-w-full overflow-hidden rounded-lg flex items-center justify-center text-sm font-medium min-w-0 break-words text-center ${
              isContent
                ? itemSpacingClass
                : mode === 'flex'
                  ? 'min-h-[4rem]'
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