// Move your current playground UI here

import { useState } from 'react';
import ControlsPanel from '../components/ControlPanel/ControlsPanel';
import PreviewArea from '../components/Preview/PreviewArea';
import CssOutput from '../components/CssOutput/CssOutput';
import { ModeToggleButton } from '../components/ControlPanel/ControlButton';
import { useFlexGrid } from '../useFlexGrid';
import { FLEXBOX_DEFAULTS, GRID_DEFAULTS } from '../constants';

export default function FlexGridPage() {
  const [mode, setMode] = useState('flex');
  const [flex, setFlex] = useState(FLEXBOX_DEFAULTS);
  const [grid, setGrid] = useState(GRID_DEFAULTS);
  // Calculate number of items for grid mode
  const gridItems = Number(grid.gridCols) * Number(grid.gridRows);

  const { previewClasses, previewFlexDirection, cssOutput } = useFlexGrid(mode, flex, grid);

  return (
    <div className="min-h-screen w-full bg-gray-50 font-poppins flex flex-col p-4 gap-4 justify-center">
      {/* Top section wrapped with flex-shrink-0 */}
      <div className="flex-shrink-0">
        <div className="flex flex-col sm:flex-row gap-4 max-w-6xl mx-auto w-full">
          {/* Controls Panel */}
          <div className="w-3xl bg-white rounded-xl shadow-sm border border-gray-200  overflow-y-auto ">
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
          <div className="sm:w-1/2 flex flex-col items-stretch bg-white rounded-xl shadow-sm p-4 border border-gray-200 overflow-y-auto">
            <PreviewArea
              previewClasses={previewClasses}
              flexGrow={flex.grow}
              flexItems={mode === 'grid' ? gridItems : flex.items}
              mode={mode}
            />
          </div>
        </div>
      </div>
      {/* CSS Output panel grows independently */}
      <div className="max-w-6xl mx-auto w-full  h-[30vh] overflow-y-auto">
        <CssOutput cssOutput={cssOutput} />
      </div>
    </div>
  );
}