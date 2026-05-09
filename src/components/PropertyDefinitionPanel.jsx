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
          <span style={{ color: '#d1d5db' }}>{propMatch[2]}</span>
          <span style={{ color: '#9ca3af' }}>{propMatch[3]}</span>
          <span style={{ color: '#f3f4f6' }}>{propMatch[4]}</span>
          <span style={{ color: '#9ca3af' }}>{propMatch[5]}</span>
          {comment && <span style={{ color: '#9ca3af', fontStyle: 'italic' }}>{comment}</span>}
        </div>
      );
    }
    return <div key={i} style={{ color: '#e5e7eb' }}>{line || '\u00a0'}</div>;
  });
}

export default function PropertyDefinitionPanel({ definition, mode }) {
  if (!definition) {
    return (
      <div className="bg-[var(--surface-1)] rounded-2xl border border-[var(--border)] p-5 sm:p-6" style={{ boxShadow: 'var(--shadow-clay-card)' }}>
        <div
          className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)] mb-4"
          style={{ fontFamily: 'var(--mono)' }}
        >
          Definition
        </div>
        <div className="pt-3 text-[14px] text-[var(--muted)] leading-7">
          Select a {mode === 'grid' ? 'grid' : 'flex'} property label in the controls panel to see its definition here.
        </div>
        <div className="mt-5 pt-3">
          <div
            className="text-[10px] uppercase tracking-[0.18em] text-[var(--muted)] mb-2"
            style={{ fontFamily: 'var(--mono)' }}
          >
            Quick Tips
          </div>
          <ul className="text-[13px] text-[var(--muted)] space-y-2 leading-6 list-none pl-0">
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
    <div className="bg-[var(--surface-1)] rounded-2xl border border-[var(--border)] p-5 sm:p-6 flex flex-col gap-0" style={{ boxShadow: 'var(--shadow-clay-card)' }}>
      {/* Monospace label */}
      <div
        className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)] mb-4"
        style={{ fontFamily: 'var(--mono)' }}
      >
        Definition
      </div>

      {/* Term with accent left-rule */}
      <div className="flex gap-3 mb-3 items-start">
        <div
          className="flex-shrink-0 mt-1"
          style={{ width: '2px', alignSelf: 'stretch', background: 'var(--accent)', borderRadius: 0 }}
        />
        <h3 className="text-[1.3rem] font-bold tracking-[-0.025em] text-[var(--text-strong)] leading-[1.2]">
          {definition.label}
        </h3>
      </div>

      <p className="text-[14px] text-[var(--text)] leading-7 mb-4">{definition.definition}</p>

      {definition.whenToUse && (
        <p className="text-[13px] text-[var(--muted)] leading-6 mb-4 pt-3">
          <span className="font-semibold text-[var(--text)]">When: </span>
          {definition.whenToUse}
        </p>
      )}

      {/* Example label */}
      <div
        className="text-[10px] uppercase tracking-[0.18em] text-[var(--muted)] mb-2 mt-auto"
        style={{ fontFamily: 'var(--mono)' }}
      >
        Example
      </div>

      {/* Dark code block */}
      <pre
        className="rounded-2xl border border-transparent bg-[var(--code-bg)] whitespace-pre-wrap break-words"
        style={{
          padding: '12px 14px',
          fontSize: '12.5px',
          lineHeight: 1.7,
          fontFamily: 'var(--mono)',
          boxShadow: 'var(--shadow-clay-pressed)',
          overflow: 'hidden',
          overflowX: 'auto',
          maxWidth: '100%',
        }}
      >
        {highlightCss(definition.usage)}
      </pre>
    </div>
  );
}
