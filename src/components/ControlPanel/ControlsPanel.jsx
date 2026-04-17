import FlexControls from './FlexControls';
import GridControls from './GridControls';

export default function ControlsPanel({ mode, flex, setFlex, grid, setGrid, onPropertySelect, selectedPropertyKey }) {
  return (
    <div className="relative">
      {/* FlexControls always in DOM to reserve height */}
      <div className={mode === 'flex' ? '' : 'invisible pointer-events-none'}>
        <FlexControls
          flex={flex}
          setFlex={setFlex}
          onPropertySelect={onPropertySelect}
          selectedPropertyKey={selectedPropertyKey}
        />
      </div>
      {/* GridControls overlays in the same space */}
      <div className={`absolute inset-0 ${mode === 'grid' ? '' : 'invisible pointer-events-none'}`}>
        <GridControls
          grid={grid}
          setGrid={setGrid}
          onPropertySelect={onPropertySelect}
          selectedPropertyKey={selectedPropertyKey}
        />
      </div>
    </div>
  );
}