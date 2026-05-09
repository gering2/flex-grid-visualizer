const CONTENT_ITEMS = [
  'Short',
  'Medium text',
  'This is a much longer piece of content',
  'Hi',
  'Another medium one',
  'Quite a bit more text here indeed',
];

const ITEM_STYLE = {
  bg: 'var(--surface-1)',
  border: 'var(--border)',
  color: 'var(--text)',
  shadow: '0 1px 3px rgba(24, 24, 27, 0.06)',
};

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
            <span className="rounded-full border border-[var(--border)] bg-[var(--surface-1)] text-[var(--muted)] text-xs font-medium px-2.5 py-1 tracking-[0.02em]">content-based</span>
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
        {showTrackLines && Array.from({ length: cols * rows }, (_, idx) => (
          <div
            key={`guide-${idx}`}
            style={{
              gridColumn: (idx % cols) + 1,
              gridRow: Math.floor(idx / cols) + 1,
              alignSelf: 'stretch',
              justifySelf: 'stretch',
              borderColor: 'rgba(148, 163, 184, 0.45)',
            }}
            className="pointer-events-none z-0 border border-dashed rounded-xl"
          />
        ))}

        {items.map((n, idx) => {
          return (
            <div
              key={n}
              style={{
                background: ITEM_STYLE.bg,
                border: `1px solid ${ITEM_STYLE.border}`,
                color: ITEM_STYLE.color,
                boxShadow: ITEM_STYLE.shadow,
                ...(mode === 'flex'
                  ? {
                      flexGrow: isContent ? 0 : (flexGrow[idx] ?? 0),
                      flexShrink: flexShrink[idx] ?? 1,
                      flexBasis: flexBasis[idx] ?? '4rem',
                    }
                  : {}),
                ...(mode === 'grid'
                  ? {
                      gridColumn: idx === 0
                        ? `${featuredPlacement.startCol} / span ${featuredPlacement.colSpan}`
                        : (idx % cols) + 1,
                      gridRow: idx === 0
                        ? `${featuredPlacement.startRow} / span ${featuredPlacement.rowSpan}`
                        : Math.floor(idx / cols) + 1,
                    }
                  : {}),
              }}
              className={`item-${idx + 1} relative z-[1] box-border max-w-full overflow-hidden rounded-xl flex items-center text-sm font-medium min-w-0 break-words ${
                isContent
                  ? `${itemSpacingClass} justify-center text-center`
                  : mode === 'flex'
                    ? 'px-3 py-4 justify-center text-center min-h-[4rem]'
                    : 'px-3 py-4 justify-center text-center'
              } transition-all duration-200 ease-out`}
            >
              {displayItems[idx]}
            </div>
          );
        })}
      </div>
    </div>
  );
}
