import { useEffect, useState } from 'react';
import ControlsPanel from '../components/ControlPanel/ControlsPanel';
import PreviewArea from '../components/Preview/PreviewArea';
import CssOutput from '../components/CssOutput/CssOutput';
import PropertyDefinitionPanel from '../components/PropertyDefinitionPanel';
import { ModeToggleButton } from '../components/ControlPanel/ControlButton';
import { useFlexGrid } from '../hooks/useFlexGrid'
import { FLEXBOX_DEFAULTS, GRID_DEFAULTS } from '../data/constants';
import { PROPERTY_DEFINITIONS } from '../data/flex-grid-definitions';

const FLEX_PROPERTY_KEYS = [
  'flex-direction',
  'justify-content',
  'align-items',
  'gap',
  'align-content',
  'flex-wrap',
  'flex-items',
  'flex-grow',
];

const GRID_PROPERTY_KEYS = [
  'grid-template-columns',
  'grid-template-rows',
  'place-items',
  'justify-items',
  'align-items',
  'justify-content',
  'align-content',
  'gap',
];

export default function FlexGridPage() {
  const [mode, setMode] = useState('flex');
  const [flex, setFlex] = useState(FLEXBOX_DEFAULTS);
  const [grid, setGrid] = useState(GRID_DEFAULTS);
  const [selectedPropertyKey, setSelectedPropertyKey] = useState('flex-direction');
  const [contentMode, setContentMode] = useState('equal');
  // Calculate number of items for grid mode
  const gridItems = Number(grid.gridCols) * Number(grid.gridRows);

  const { previewClasses, previewStyle, cssOutput } = useFlexGrid(mode, flex, grid);
  const activePropertyKeys = mode === 'grid' ? GRID_PROPERTY_KEYS : FLEX_PROPERTY_KEYS;
  const selectedDefinition = PROPERTY_DEFINITIONS[selectedPropertyKey] ?? null;

  useEffect(() => {
    if (!activePropertyKeys.includes(selectedPropertyKey)) {
      setSelectedPropertyKey(activePropertyKeys[0]);
    }
  }, [mode, selectedPropertyKey]);

  return (
    <div className="w-full bg-gray-50 font-poppins flex flex-col p-3 sm:p-4 gap-4">
      <div className="mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 xl:grid-cols-[24rem_minmax(0,1fr)_20rem] xl:grid-rows-[4fr_2fr] gap-4 xl:h-[min(90rem,calc(100vh-5rem))] xl:min-h-[40rem] items-stretch">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden xl:h-full flex flex-col min-h-[20rem]">
            <div className="p-4 pb-2 space-y-2">
              <div className="flex items-center justify-center bg-gray-100 rounded-lg p-1">
                <ModeToggleButton active={mode === 'flex'} onClick={() => setMode('flex')} first>
                  Flexbox
                </ModeToggleButton>
                <ModeToggleButton active={mode === 'grid'} onClick={() => setMode('grid')} last>
                  Grid
                </ModeToggleButton>
              </div>
              <div className="flex items-center justify-center bg-gray-100 rounded-lg p-1">
                <ModeToggleButton active={contentMode === 'equal'} onClick={() => setContentMode('equal')} first>
                  Equal Boxes
                </ModeToggleButton>
                <ModeToggleButton active={contentMode === 'content'} onClick={() => setContentMode('content')} last>
                  Content-Based
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
                onPropertySelect={setSelectedPropertyKey}
                selectedPropertyKey={selectedPropertyKey}
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-3 sm:p-4 border border-gray-200 overflow-hidden min-h-[20rem] xl:min-h-0 xl:h-full min-w-0">
            <PreviewArea
              previewClasses={previewClasses}
              previewStyle={previewStyle}
              flexGrow={flex.grow}
              flexItems={mode === 'grid' ? gridItems : flex.items}
              mode={mode}
              contentMode={contentMode}
              grid={grid}
            />
          </div>

          <div className="min-h-[20rem] xl:h-full overflow-y-auto">
            <PropertyDefinitionPanel
              definition={selectedDefinition}
              mode={mode}
            />
          </div>

          <div className="xl:col-span-3 min-h-[14rem] xl:min-h-0 overflow-hidden min-w-0">
            <CssOutput cssOutput={cssOutput} className="h-full" />
          </div>
        </div>
      </div>
    </div>
  );
}