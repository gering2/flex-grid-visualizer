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
      <div className="flex items-center gap-2 px-3 py-2.5 bg-[var(--surface-2)] border-b border-[var(--border)]">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#b7b1a6] inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#c6c0b5] inline-block" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#d2ccc1] inline-block" />
        </div>
        <span className="text-xs text-[var(--muted)] ml-1" style={{ fontFamily: 'var(--mono)' }}>styles.css</span>
        <div className="ml-auto flex items-center gap-2">
          {onReset && (
            <button
              type="button"
              onClick={onReset}
              className="focus-ring btn-secondary px-2.5 py-1.5 text-xs cursor-pointer"
            >
              Reset
            </button>
          )}
          <button
            type="button"
            onClick={onCopy}
            className="focus-ring btn-secondary px-2.5 py-1.5 text-xs cursor-pointer"
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>

      {copied && (
        <div className="absolute right-3 top-11 rounded-md bg-[#eef5ef] border border-[#c7d8ca] px-2 py-1 text-xs font-medium text-[#44614b]">
          Copied to clipboard
        </div>
      )}

      <div className="code-editor-body p-3 min-h-[9rem] rounded-b-md flex-1 overflow-y-auto overflow-x-auto">
        {lines.map((line, idx) => (
          <div key={`${line}-${idx}`} className="code-line">
            <span className="text-[#8f9cb7] text-right select-none">{idx + 1}</span>
            <span className="whitespace-pre transition-colors duration-150">{line}</span>
          </div>
        ))}
      </div>
    </div>
  );
}