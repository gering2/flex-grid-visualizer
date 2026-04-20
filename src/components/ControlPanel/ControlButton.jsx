export function ModeToggleButton({ active, onClick, children, first, last }) {
	return (
		<button
			className={`focus-ring flex-1 min-w-0 px-3 sm:px-5 py-2 text-sm font-semibold transition-all duration-150 cursor-pointer rounded-md
				${active ? 'bg-white text-accent shadow-sm' : 'text-gray-500 hover:text-gray-700'}
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
			<div className="text-xs font-semibold uppercase tracking-widest text-gray-700 mb-1">{label}</div>
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