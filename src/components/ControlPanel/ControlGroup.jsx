import { PROPERTY_DEFINITIONS } from '../../data/flex-grid-definitions';

export default function ControlGroup({ label, propertyKey, children, onPropertySelect, selectedPropertyKey }) {
  const def = propertyKey ? PROPERTY_DEFINITIONS[propertyKey] : null;
  const isSelected = selectedPropertyKey === propertyKey;

  const handleSelectProperty = () => {
    if (!propertyKey || !def || !onPropertySelect) return;
    onPropertySelect(propertyKey);
  };

  return (
    <div>
      <div className="text-[10px] font-medium tracking-[0.14em] text-[var(--muted)] mb-1.5 flex items-center gap-1 uppercase" style={{ fontFamily: 'var(--mono)' }}>
        {propertyKey && def ? (
          <span
            className={`cursor-pointer transition-colors ${isSelected ? 'text-[var(--accent-strong)]' : 'text-[var(--muted)] hover:text-[var(--text-strong)]'}`}
            onClick={handleSelectProperty}
            tabIndex={0}
            role="button"
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                handleSelectProperty();
              }
            }}
            aria-pressed={isSelected}
          >
            {label}{isSelected ? ' ↗' : ''}
          </span>
        ) : (
          <span>{label}</span>
        )}
      </div>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}
