import { POSITION_DEFINITIONS } from '../data/position-definitions';

export default function PositionDefinitionPanel({ positionType, onClose, className = '' }) {
  const def = POSITION_DEFINITIONS[positionType];
  if (!def) return null;
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 w-full min-h-[200px] flex flex-col gap-3 ${className}`}>
      <div className="flex justify-between items-center mb-2">
        <div className="text-lg font-bold text-accent">{def.label.charAt(0).toUpperCase() + def.label.slice(1)}</div>
      </div>
      <div className="text-gray-700 mb-2">{def.definition}</div>
      <pre className="bg-gray-100 rounded-xl p-3 text-xs overflow-x-auto text-gray-800">{def.usage}</pre>
    </div>
  );
}
