import { POSITION_DEFINITIONS } from '../position-definitions';

export default function PositionDefinitionPanel({ positionType, onClose }) {
  const def = POSITION_DEFINITIONS[positionType];
  if (!def) return null;
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 w-80 max-w-xs min-h-[200px] flex flex-col gap-2">
      <div className="flex justify-between items-center mb-2">
        <div className="text-lg font-bold text-accent">{def.label.charAt(0).toUpperCase() + def.label.slice(1)}</div>
        <button className="text-gray-400 hover:text-gray-600 text-xl" onClick={onClose}>&times;</button>
      </div>
      <div className="text-gray-700 mb-2">{def.definition}</div>
      <pre className="bg-gray-100 rounded p-2 text-xs overflow-x-auto text-gray-800">{def.usage}</pre>
    </div>
  );
}
