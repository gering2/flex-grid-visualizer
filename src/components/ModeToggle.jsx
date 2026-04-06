export default function ModeToggle({ mode, setMode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="font-semibold">Mode:</span>
      <button
        className={`px-3 py-1 rounded-l  border border-gray-300 ${mode === 'flex' ? 'bg-gray-200 font-bold' : 'bg-white'}`}
        onClick={() => setMode('flex')}
        type="button"
      >
        Flexbox
      </button>
      <button
        className={`px-3 py-1 rounded-r border border-gray-300 border-l-0 ${mode === 'grid' ? 'bg-gray-200 font-bold' : 'bg-blue-200'}`}
        onClick={() => setMode('grid')}
        type="button"
      >
        Grid
      </button>
    </div>
  );
}
