export function ModeToggleButton({ active, onClick, children, first, last }) {
  return (
    <button
      className={`flex-1 px-5 py-1.5 text-sm font-semibold transition-all duration-150 cursor-pointer
        ${active ? 'bg-white text-accent shadow-sm rounded-md' : 'text-gray-500 hover:text-gray-700'}
      `}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

export function ControlGroup({ label, children }) {
  return (
    <div>
      <div className="text-xs font-semibold text-gray-700 mb-1">{label}</div>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}

export function ControlButton({ active, onClick, label, disabled }) {
  return (
    <button
      className={`px-3 py-1 rounded border border-gray-300 transition
        ${active ? 'bg-accent/10 border-accent text-accent font-bold' : 'bg-white hover:bg-gray-100'}
        ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer'}
      `}
      onClick={onClick}
      type="button"
      disabled={disabled}
      tabIndex={disabled ? -1 : 0}
    >
      {label}
    </button>
  );
}
