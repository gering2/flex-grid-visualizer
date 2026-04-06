import { useState } from 'react';
import ControlsPanel from './components/ControlsPanel';
import PreviewArea from './components/PreviewArea';
import CssOutput from './components/CssOutput';
import { ModeToggleButton } from './components/ControlButton';
import { useFlexGrid } from './useFlexGrid';
import { FLEXBOX_DEFAULTS, GRID_DEFAULTS } from './constants';

function App() {
  const [mode, setMode] = useState('flex');
  const [flex, setFlex] = useState(FLEXBOX_DEFAULTS);
  const [grid, setGrid] = useState(GRID_DEFAULTS);
    // Calculate number of items for grid mode
    const gridItems = Number(grid.gridCols) * Number(grid.gridRows);

  const { previewClasses, previewFlexDirection, cssOutput } = useFlexGrid(mode, flex, grid);

  return (
    <div className="min-h-screen w-full bg-gray-50 font-poppins flex flex-col p-4 justify-center">
      {/* Page header */}
    
      <div className="flex flex-col sm:flex-row gap-4 max-w-6xl mx-auto w-full">
        {/* Controls Panel */}
        <div className="sm:w-1/2 max-w-xl bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-4 pb-2">
            <div className="flex items-center justify-center mb-3 bg-gray-100 rounded-lg p-1">
              <ModeToggleButton active={mode === 'flex'} onClick={() => setMode('flex')} first>
                Flexbox
              </ModeToggleButton>
              <ModeToggleButton active={mode === 'grid'} onClick={() => setMode('grid')} last>
                Grid
              </ModeToggleButton>
            </div>
          </div>
          <div className="px-4 pb-4">
            <ControlsPanel
              mode={mode}
              flex={flex}
              setFlex={setFlex}
              grid={grid}
              setGrid={setGrid}
            />
          </div>
        </div>
        {/* Preview Area */}
        <div className="sm:w-1/2 flex flex-col items-stretch bg-white rounded-xl shadow-sm p-4 border border-gray-200">
            <PreviewArea
              previewClasses={previewClasses}
              flexGrow={flex.grow}
              flexItems={mode === 'grid' ? gridItems : flex.items}
              mode={mode}
            />
        </div>
      </div>
      {/* CSS Output */}
      <div className="max-w-6xl mx-auto w-full mt-4">
        <CssOutput cssOutput={cssOutput} />
      </div>
    </div>
  );
}

export default App;

