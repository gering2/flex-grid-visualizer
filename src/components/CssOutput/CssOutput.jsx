import { useMemo, useState } from 'react';

export default function CssOutput({ cssOutput, className = '', onReset }) {
  const [copied, setCopied] = useState(false);

  const lines = useMemo(() => cssOutput.split('\n'), [cssOutput]);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(cssOutput);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className={`code-editor-shell relative min-h-0 h-full flex flex-col ${className}`}>
      <div
        className="flex items-center gap-3 px-3 py-2.5 shrink-0"
        style={{ background: 'var(--surface-1)', borderBottom: '1px solid var(--border)' }}
      >
        <span
          className="text-[11px] tracking-[0.06em]"
          style={{ fontFamily: 'var(--mono)', color: 'var(--muted)' }}
        >
          styles.css
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          {onReset && (
            <button
              type="button"
              onClick={onReset}
              className="focus-ring cursor-pointer px-2 py-1 text-[11px]"
              style={{
                background: 'var(--surface-1)',
                border: '1px solid var(--border)',
                color: 'var(--text)',
                borderRadius: '8px',
                fontFamily: 'var(--mono)',
                minHeight: '34px',
                paddingInline: '12px',
                boxShadow: 'none',
                transition: 'background-color 160ms ease, border-color 160ms ease',
              }}
            >
              Reset
            </button>
          )}
          <button
            type="button"
            onClick={onCopy}
            className={`focus-ring cursor-pointer px-2 py-1 text-[11px] ${copied ? 'motion-pop-soft' : ''}`}
            style={{
                background: copied ? 'var(--accent-bg)' : 'var(--surface-1)',
                border: copied ? '1px solid var(--accent-border)' : '1px solid var(--border)',
                color: copied ? 'var(--accent-strong)' : 'var(--text)',
                borderRadius: '8px',
              fontFamily: 'var(--mono)',
                minHeight: '34px',
                paddingInline: '12px',
                boxShadow: 'none',
                transition: 'background-color 160ms ease, border-color 160ms ease, color 160ms ease',
            }}
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>

      <div className="code-editor-body px-3 py-2.5 min-h-[8rem] flex-1 overflow-y-auto overflow-x-auto">
        {lines.map((line, idx) => (
          <div key={`${line}-${idx}`} className="code-line">
            <span className="select-none text-right" style={{ color: '#6b7280' }}>{idx + 1}</span>
            <span className="whitespace-pre transition-colors duration-75">{line}</span>
          </div>
        ))}
      </div>
    </div>
  );
}