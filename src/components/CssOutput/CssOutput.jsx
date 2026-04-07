export default function CssOutput({ cssOutput }) {
  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 border-b border-gray-200">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
          <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block" />
          <span className="w-3 h-3 rounded-full bg-green-400 inline-block" />
        </div>
        <span className="text-xs text-gray-400 font-mono ml-1">CSS</span>
      </div>
      <pre className="bg-gray-900 text-green-300 font-mono text-sm p-4 overflow-x-auto whitespace-pre min-h-[10rem]">{cssOutput}</pre>
    </div>
  );
}