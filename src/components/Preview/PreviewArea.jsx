export default function PreviewArea({ previewClasses, previewStyle, flexGrow = [], flexItems = 3, mode }) {
  const items = Array.from({ length: flexItems }, (_, i) => i + 1);
  return (
  <div className="flex h-full min-h-0 flex-col">
      <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gray-400">Preview</div>
    <div className={`bg-gray-50 border border-gray-200 rounded-xl p-3 sm:p-4 w-full mx-auto overflow-auto min-h-[18rem] sm:min-h-[22rem] lg:flex-1 lg:min-h-0 ${previewClasses} transition-all duration-200`} style={previewStyle}>     
  
        {items.map((n, idx) => (
          <div
            key={n}
            style={mode === 'flex' ? { flexGrow: flexGrow[idx] ?? 0 } : {}}
            className={`bg-accent/10 border border-accent/50 rounded flex items-center justify-center text-base sm:text-lg font-bold text-accent min-w-0 ${mode === 'flex' ? 'flex-1 min-h-[3rem] basis-[3rem] w-[3rem]' : 'px-3 py-2'}`}
          >
            {n}
          </div>
        ))}
     
    </div>
    </div>
  );
}