import { useMemo, useState } from 'react';

export default function CssOutput({ cssOutput, className = '' }) {
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
    <div className={`code-editor-shell min-h-0 h-full flex flex-col ${className}`}>
      <div className="flex items-center gap-2 px-4 py-3 bg-[var(--surface-2)] border-b border-[var(--border)]">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-400 inline-block" />
          <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block" />
          <span className="w-3 h-3 rounded-full bg-green-400 inline-block" />
        </div>
        <span className="text-xs text-[var(--muted)] font-mono ml-1">styles.css</span>
        <div className="ml-auto">
          <button
            type="button"
            onClick={onCopy}
            className="focus-ring btn-secondary px-2.5 py-1.5 text-xs cursor-pointer"
          >
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>

      <div className="code-editor-body text-[#d8d0f2] font-mono text-sm p-4 overflow-x-auto min-h-[10rem] rounded-b-md flex-1 overflow-y-auto">
        {lines.map((line, idx) => (
          <div key={`${line}-${idx}`} className="code-line">
            <span className="text-[#8f86a8] text-right select-none">{idx + 1}</span>
            <span className="whitespace-pre">{line}</span>
          </div>
        ))}
      </div>
    </div>
  );
}