export default function PropertyDefinitionPanel({ definition, mode }) {
  if (!definition) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-5">
        <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gray-400">Definition</div>
        <div className="mt-3 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-500">
          Select a {mode === 'grid' ? 'grid' : 'flex'} property label in the controls panel to see its definition and usage here.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-5 flex flex-col gap-3">
      <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gray-400">Definition</div>
      <h3 className="text-base sm:text-lg font-semibold text-gray-800">{definition.label}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{definition.definition}</p>
      <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">Example</div>
      <pre className="rounded-xl border border-gray-200 bg-gray-50 p-3 text-xs text-gray-700 overflow-x-auto whitespace-pre-wrap">
        {definition.usage}
      </pre>
    </div>
  );
}
