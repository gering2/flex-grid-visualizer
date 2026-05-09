export function ModeToggleButton({ active, onClick, children }) {
	return (
		<button
			className="mode-toggle-button focus-ring flex-1 min-w-0 cursor-pointer"
			onClick={onClick}
			type="button"
		>
			<span className={`mode-toggle-inner ${active ? 'mode-toggle-active' : 'mode-toggle-idle'}`}>
				{children}
			</span>
		</button>
	);
}

export function ControlGroup({ label, children }) {
	return (
		<div className="control-group space-y-1.5">
			<div className="control-group-label">{label}</div>
			<div className="flex flex-wrap gap-1.5">{children}</div>
		</div>
	);
}

export function ControlButton({ active, onClick, label, disabled, icon }) {
	return (
		<button
			className={`ctrl-btn focus-ring ${active ? 'ctrl-btn-active' : 'ctrl-btn-idle'} ${disabled ? 'ctrl-btn-disabled' : 'cursor-pointer'}`}
			onClick={onClick}
			type="button"
			disabled={disabled}
			tabIndex={disabled ? -1 : 0}
		>
			{icon ? <span className="text-xs opacity-80" aria-hidden="true">{icon}</span> : null}
			<span>{label}</span>
		</button>
	);
}