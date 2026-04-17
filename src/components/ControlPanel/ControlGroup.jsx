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
      <div className="text-xs font-semibold uppercase tracking-widest text-gray-700 mb-1 flex items-center gap-1">
        {propertyKey && def ? (
          <span
            className={`cursor-pointer border-b border-dashed transition-colors ${isSelected ? 'border-gray-700 text-gray-900' : 'border-gray-400 text-gray-600 hover:text-gray-800'}`}
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
            {label}
          </span>
        ) : (
          <span>{label}</span>
        )}
      </div>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}
