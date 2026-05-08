export function ModeToggleButton({ active, onClick, children, first, last }) {
	return (
		<button
			className={`mode-toggle-button focus-ring flex-1 min-w-0 px-3 sm:px-5 py-2 text-sm font-semibold transition-all duration-150 cursor-pointer rounded-md
				${active ? 'bg-[var(--accent-bg)] text-[var(--accent-strong)] border border-[var(--accent-border)]' : 'text-gray-500 hover:text-gray-700 border border-transparent'}
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
		<div className="control-group space-y-2">
			<div className="control-group-label text-[12px] font-medium tracking-[0.01em] text-[var(--muted)] mb-1">{label}</div>
			<div className="flex flex-wrap gap-1.5">{children}</div>
		</div>
	);
}

export function ControlButton({ active, onClick, label, disabled, icon }) {
	return (
		<button
			className={`focus-ring inline-flex items-center gap-1.5 btn-${active ? 'primary' : 'secondary'}
				${active ? '' : 'text-[var(--muted)]'}
				${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : 'cursor-pointer'}
			`}
			onClick={onClick}
			type="button"
			disabled={disabled}
			tabIndex={disabled ? -1 : 0}
		>
			{icon ? <span className="text-xs opacity-90" aria-hidden="true">{icon}</span> : null}
			<span>{label}</span>
		</button>
	);
}