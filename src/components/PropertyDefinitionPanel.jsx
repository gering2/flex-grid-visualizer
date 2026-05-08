function highlightCss(code) {
  return code.split('\n').map((line, i) => {
    const commentMatch = line.match(/^(.*?)(\s*\/\*.*)$/);
    const mainPart = commentMatch ? commentMatch[1] : line;
    const comment = commentMatch ? commentMatch[2] : null;
    const propMatch = mainPart.match(/^(\s*)([\w-]+)(:\s*)(.+?)(;?)$/);
    if (propMatch) {
      return (
        <div key={i}>
          <span>{propMatch[1]}</span>
          <span style={{ color: '#a78bfa' }}>{propMatch[2]}</span>
          <span style={{ color: '#94a3b8' }}>{propMatch[3]}</span>
          <span style={{ color: '#67e8f9' }}>{propMatch[4]}</span>
          <span style={{ color: '#94a3b8' }}>{propMatch[5]}</span>
          {comment && <span style={{ color: '#f9a8d4', fontStyle: 'italic' }}>{comment}</span>}
        </div>
      );
    }
    return <div key={i} style={{ color: '#e5e7eb' }}>{line || '\u00a0'}</div>;
  });
}

export default function PropertyDefinitionPanel({ definition, mode }) {
  if (!definition) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-5 space-y-3">
        <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gray-400">Definition</div>
        <div className="mt-3 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-500">
          Select a {mode === 'grid' ? 'grid' : 'flex'} property label in the controls panel to see its definition and usage here.
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
          <div className="text-xs font-semibold uppercase tracking-wide text-amber-700 mb-1">Quick Tips</div>
          <ul className="text-xs text-amber-900 space-y-1">
            <li>Check item min-width and min-height when layouts refuse to shrink.</li>
            <li>Use gap for spacing; margin can produce double-spacing in wrapped rows.</li>
            <li>Overflow often needs overflow: hidden/auto on the item, not only the container.</li>
            <li>For flex children, flex-shrink and basis can affect why items do not wrap as expected.</li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-5 flex flex-col gap-3">
      <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gray-400">Definition</div>
      <h3 className="text-base sm:text-lg font-semibold text-gray-800">{definition.label}</h3>
      <p className="text-sm text-gray-600 leading-relaxed">{definition.definition}</p>
      {definition.whenToUse && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs text-blue-800 leading-relaxed">
          <span className="font-semibold">Use this when: </span>{definition.whenToUse}
        </div>
      )}
      <div className="text-xs font-semibold uppercase tracking-wide text-gray-500">Example</div>
      <pre className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm shadow-inner overflow-x-auto whitespace-pre-wrap break-words leading-6">
        {highlightCss(definition.usage)}
      </pre>
    </div>
  );
}
