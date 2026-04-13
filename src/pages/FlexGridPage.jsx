// Move your current playground UI here

import { useState } from 'react';
import ControlsPanel from '../components/ControlPanel/ControlsPanel';
import PreviewArea from '../components/Preview/PreviewArea';
import CssOutput from '../components/CssOutput/CssOutput';
import { ModeToggleButton } from '../components/ControlPanel/ControlButton';
import { useFlexGrid } from '../hooks/useFlexGrid'
import { FLEXBOX_DEFAULTS, GRID_DEFAULTS } from '../data/constants';

export default function FlexGridPage() {
  const [mode, setMode] = useState('flex');
  const [flex, setFlex] = useState(FLEXBOX_DEFAULTS);
  const [grid, setGrid] = useState(GRID_DEFAULTS);
  // Calculate number of items for grid mode
  const gridItems = Number(grid.gridCols) * Number(grid.gridRows);

  const { previewClasses, previewStyle, cssOutput } = useFlexGrid(mode, flex, grid);

  return (
    <div className="w-full bg-gray-50 font-poppins flex flex-col p-3 sm:p-4 gap-4">
      {/* Top section  */}
      <div className="">
        <div className="flex flex-col lg:flex-row gap-4 mx-auto w-full max-w-7xl lg:h-[min(44rem,calc(100vh-10rem))] lg:min-h-[38rem] items-stretch">
          {/* Controls Panel */}
          <div className="w-full lg:w-[28rem] lg:flex-none bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden lg:h-full flex flex-col min-h-0">
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
            <div className="px-4 pb-4 flex-1 min-h-0 overflow-y-auto">
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
          <div className="w-full lg:flex-1 flex flex-col items-stretch bg-white rounded-2xl shadow-sm p-3 sm:p-4 border border-gray-200 overflow-hidden lg:h-full min-h-0">
            <PreviewArea
              previewClasses={previewClasses}
              previewStyle={previewStyle}
              flexGrow={flex.grow}
              flexItems={mode === 'grid' ? gridItems : flex.items}
              mode={mode}
            />
          </div>
        </div>
      </div>
      {/* CSS Output panel grows independently */}
      <div className="max-w-7xl mx-auto w-full h-[24rem] sm:h-[30vh] overflow-y-auto">
        <CssOutput cssOutput={cssOutput} />
      </div>
    </div>
  );
}