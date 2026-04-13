export function ModeToggleButton({ active, onClick, children, first, last }) {
	return (
		<button
			className={`flex-1 min-w-0 px-3 sm:px-5 py-2 text-sm font-semibold transition-all duration-150 cursor-pointer
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
			<div className="text-xs font-semibold uppercase tracking-widest text-gray-700 mb-1">{label}</div>
			<div className="flex flex-wrap gap-1.5">{children}</div>
		</div>
	);
}

export function ControlButton({ active, onClick, label, disabled }) {
	return (
		<button
			className={`px-3 py-1.5 rounded-lg border border-gray-300 transition text-sm sm:text-base leading-tight
				${active ? 'bg-accent/10 border-accent text-gray-600    font-bold' : 'bg-white text-gray-500 hover:bg-gray-100'}
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