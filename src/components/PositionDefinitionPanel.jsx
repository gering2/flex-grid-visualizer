import { POSITION_DEFINITIONS } from '../data/position-definitions';

export default function PositionDefinitionPanel({ positionType, className = '' }) {
  const def = POSITION_DEFINITIONS[positionType];
  if (!def) return null;
  return (
    <div className={`bg-[var(--surface-1)] rounded-2xl border border-[var(--border)] p-5 sm:p-6 w-full flex flex-col ${className}`} style={{ boxShadow: 'var(--shadow-clay-card)' }}>
      <div
        className="text-[10px] uppercase tracking-[0.2em] text-[var(--muted)] mb-4"
        style={{ fontFamily: 'var(--mono)' }}
      >
        Definition
      </div>

      <div className="flex gap-3 mb-3 items-start">
        <div
          className="flex-shrink-0 mt-1"
          style={{ width: '2px', alignSelf: 'stretch', background: 'var(--accent)', borderRadius: 0 }}
        />
        <h3 className="text-[1.3rem] font-bold tracking-[-0.025em] text-[var(--text-strong)] leading-[1.2]">
          {def.label.charAt(0).toUpperCase() + def.label.slice(1)}
        </h3>
      </div>

      <p className="text-[14px] text-[var(--text)] leading-7 mb-4">{def.definition}</p>

      <div
        className="text-[10px] uppercase tracking-[0.18em] text-[var(--muted)] mb-2"
        style={{ fontFamily: 'var(--mono)' }}
      >
        Example
      </div>
      <pre
        className="rounded-2xl border border-transparent bg-[var(--code-bg)] whitespace-pre-wrap break-words"
        style={{
          padding: '12px 14px',
          fontSize: '12.5px',
          lineHeight: 1.7,
          fontFamily: 'var(--mono)',
          color: '#d4d4d8',
          boxShadow: 'var(--shadow-clay-pressed)',
          overflow: 'hidden',
          overflowX: 'auto',
          maxWidth: '100%',
        }}
      >{def.usage}</pre>
    </div>
  );
}
