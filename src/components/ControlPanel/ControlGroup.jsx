import { useState } from 'react';
import PropertyInfoModal from '../PropertyInfoModal';
import { PROPERTY_DEFINITIONS } from '../../data/flex-grid-definitions';

export default function ControlGroup({ label, propertyKey, children }) {
  const [open, setOpen] = useState(false);
  const def = propertyKey ? PROPERTY_DEFINITIONS[propertyKey] : null;
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-widest text-gray-700 mb-1 flex items-center gap-1">
        {propertyKey && def ? (
          <span
            className="border-b border-dashed border-gray-400 cursor-pointer hover:text-gray-700"
            onClick={() => setOpen(true)}
            tabIndex={0}
            role="button"
          >
            {label}
          </span>
        ) : (
          <span>{label}</span>
        )}
        <PropertyInfoModal open={open} onClose={() => setOpen(false)} def={def} />
      </div>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}
