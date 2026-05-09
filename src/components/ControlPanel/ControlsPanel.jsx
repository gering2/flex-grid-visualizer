import FlexControls from './FlexControls';
import GridControls from './GridControls';

export default function ControlsPanel({ mode, flex, setFlex, grid, setGrid, onPropertySelect, selectedPropertyKey }) {
  if (mode === 'flex') {
    return (
      <div className="motion-fade-in">
        <FlexControls
          flex={flex}
          setFlex={setFlex}
          onPropertySelect={onPropertySelect}
          selectedPropertyKey={selectedPropertyKey}
        />
      </div>
    );
  }

  return (
    <div className="motion-fade-in">
      <GridControls
        grid={grid}
        setGrid={setGrid}
        onPropertySelect={onPropertySelect}
        selectedPropertyKey={selectedPropertyKey}
      />
    </div>
  );
}