export default function PreviewArea({ previewClasses, flexGrow = [], flexItems = 3, mode }) {
  const items = Array.from({ length: flexItems }, (_, i) => i + 1);
  return (
   <>
      <div className="text-xs font-semibold uppercase tracking-widest text-gray-400">Preview</div>
      <div className={`bg-gray-50 border border-gray-200 rounded-lg p-4 w-full mx-auto overflow-auto h-[600px] ${previewClasses} transition-all duration-200`}>     
  
        {items.map((n, idx) => (
          <div
            key={n}
            style={mode === 'flex' ? { flexGrow: flexGrow[idx] ?? 0 } : {}}
            className={`bg-accent/10 border border-accent/50 rounded  flex flex-1    items-center justify-center text-lg font-bold text-accent min-h-[3rem] basis-[3rem] w-[3rem] min-w-0`}
          >
            {n}
          </div>
        ))}
     
    </div>
    </>
  );
}