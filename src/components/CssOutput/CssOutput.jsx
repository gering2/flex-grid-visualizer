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
      <div className="flex items-center gap-2 px-4 py-3 bg-[var(--surface-2)] border-b border-[var(--border)]">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
          <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block" />
          <span className="w-3 h-3 rounded-full bg-green-400 inline-block" />
        </div>
        <span className="text-xs text-[var(--muted)] font-mono ml-1">styles.css</span>
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
        <div className="absolute right-4 top-12 rounded-lg bg-emerald-100 border border-emerald-300 px-2.5 py-1 text-xs font-semibold text-emerald-800 shadow-sm">
          Copied to clipboard
        </div>
      )}

      <div className="code-editor-body text-[#d7deff] font-mono text-[13px] leading-7 p-4 min-h-[10rem] rounded-b-md flex-1 overflow-y-auto overflow-x-auto">
        {lines.map((line, idx) => (
          <div key={`${line}-${idx}`} className="code-line">
            <span className="text-[#7c86a9] text-right select-none">{idx + 1}</span>
            <span className="whitespace-pre transition-colors duration-150">{line}</span>
          </div>
        ))}
      </div>
    </div>
  );
}