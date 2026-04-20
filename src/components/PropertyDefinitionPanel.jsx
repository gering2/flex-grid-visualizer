const KEY_TERM_REGEX = /(main axis|cross axis|align-items|justify-content|place-items|flex direction|grid|flex|gap)/gi;

function highlightTerms(text) {
  const termPattern = /^(main axis|cross axis|align-items|justify-content|place-items|flex direction|grid|flex|gap)$/i;
  return text.split(KEY_TERM_REGEX).map((chunk, idx) => (
    termPattern.test(chunk)
      ? <mark key={`${chunk}-${idx}`} className="bg-[var(--accent-bg)] text-[var(--accent-strong)] rounded px-1 py-0.5">{chunk}</mark>
      : <span key={`${chunk}-${idx}`}>{chunk}</span>
  ));
}

export default function PropertyDefinitionPanel({ definition, mode }) {
  if (!definition) {
    return (
      <div className="panel-surface p-4 sm:p-5">
        <div className="section-title">Definition</div>
        <div className="mt-3 rounded-xl bg-[var(--surface-2)] p-4 text-sm text-[var(--muted)] leading-relaxed">
          Select a {mode === 'grid' ? 'grid' : 'flex'} property label in the controls panel to see its definition and usage here.
        </div>
      </div>
    );
  }

  return (
    <div className="panel-surface p-4 sm:p-5 flex flex-col gap-3 h-full">
      <div className="section-title">Definition</div>
      <h3 className="text-base sm:text-lg font-semibold text-[var(--text-strong)]">{definition.label}</h3>

      <details className="group rounded-xl bg-[var(--surface-2)] p-3" open>
        <summary className="list-none cursor-pointer text-xs font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">Explanation</summary>
        <p className="mt-3 text-sm text-[var(--text)] leading-7">
          {highlightTerms(definition.definition)}
        </p>
      </details>

      <details className="group rounded-xl bg-[#111827] p-3 text-[#e5e7eb]" open>
        <summary className="list-none cursor-pointer text-xs font-semibold uppercase tracking-[0.14em] text-[#c5cbd6]">Example Code</summary>
        <pre className="mt-3 text-xs leading-6 overflow-x-auto whitespace-pre-wrap font-mono">
          {definition.usage}
        </pre>
      </details>
    </div>
  );
}
