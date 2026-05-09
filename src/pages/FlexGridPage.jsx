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
  'flex-basis',
  'flex-shrink',
  'flex-grow',
  'flex',
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
  'grid-column',
  'grid-row',
];

export default function FlexGridPage() {
  const [mode, setMode] = useState('flex');
  const [flex, setFlex] = useState(FLEXBOX_DEFAULTS);
  const [grid, setGrid] = useState(GRID_DEFAULTS);
  const [selectedPropertyKey, setSelectedPropertyKey] = useState('flex-direction');
  const [contentMode, setContentMode] = useState('equal');
  const [mobileControlsOpen, setMobileControlsOpen] = useState(false);
  // Calculate number of items for grid mode
  const gridItems = Number(grid.gridCols) * Number(grid.gridRows);

  const { previewClasses, previewStyle, cssOutput } = useFlexGrid(mode, flex, grid);
  const activePropertyKeys = mode === 'grid' ? GRID_PROPERTY_KEYS : FLEX_PROPERTY_KEYS;
  const selectedDefinition = PROPERTY_DEFINITIONS[selectedPropertyKey] ?? null;
  const activePropertyCount = activePropertyKeys.length;

  useEffect(() => {
    if (!activePropertyKeys.includes(selectedPropertyKey)) {
      setSelectedPropertyKey(activePropertyKeys[0]);
    }
  }, [mode, selectedPropertyKey]);

  const onReset = () => {
    if (mode === 'flex') {
      setFlex(FLEXBOX_DEFAULTS);
    } else {
      setGrid(GRID_DEFAULTS);
    }
    setContentMode('equal');
    setSelectedPropertyKey(activePropertyKeys[0]);
  };

  return (
    <div className="overflow-y-auto xl:overflow-hidden xl:h-full xl:flex xl:flex-col">
      <div className="p-3 sm:p-4 flex flex-col gap-4 lg:grid lg:grid-cols-[21rem_minmax(0,1fr)] lg:auto-rows-auto xl:flex-1 xl:min-h-0 xl:grid-cols-[21rem_minmax(0,1.2fr)_24rem] xl:grid-rows-[1fr_auto]">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden lg:h-full flex flex-col min-h-[16rem] motion-fade-up">
            <div className="px-4 pt-3 pb-2 space-y-2">
              <div className="mode-toggle-group">
                <ModeToggleButton active={mode === 'flex'} onClick={() => setMode('flex')}>
                  Flexbox
                </ModeToggleButton>
                <ModeToggleButton active={mode === 'grid'} onClick={() => setMode('grid')}>
                  Grid
                </ModeToggleButton>
              </div>
              <div className="mode-toggle-group">
                <ModeToggleButton active={contentMode === 'equal'} onClick={() => setContentMode('equal')}>
                  Equal
                </ModeToggleButton>
                <ModeToggleButton active={contentMode === 'content'} onClick={() => setContentMode('content')}>
                  Content
                </ModeToggleButton>
              </div>
              <button
                type="button"
                onClick={() => setMobileControlsOpen((v) => !v)}
                className="xl:hidden w-full rounded-sm border border-[var(--border)] px-3 py-1.5 text-xs text-[var(--muted)] bg-transparent"
                style={{ fontFamily: 'var(--mono)' }}
              >
                {mobileControlsOpen ? 'Hide Controls' : 'Show Controls'}
              </button>
            </div>
            <div className={`px-4 pb-4 min-h-0 overflow-hidden transition-[max-height,opacity] duration-200 ease-out ${mobileControlsOpen ? 'max-h-[72vh] opacity-100 pointer-events-auto' : 'max-h-0 opacity-0 pointer-events-none'} xl:max-h-none xl:opacity-100 xl:pointer-events-auto xl:overflow-y-auto xl:flex-1`}>
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

          <div className="bg-white rounded-2xl shadow-sm p-3 sm:p-4 border border-gray-200 overflow-hidden min-h-[18rem] lg:min-h-[24rem] xl:min-h-0 xl:h-full min-w-0 motion-fade-up motion-delay-1">
            <PreviewArea
              previewClasses={previewClasses}
              previewStyle={previewStyle}
              flexGrow={flex.grow}
              flexShrink={flex.shrink}
              flexBasis={flex.basis}
              flexItems={mode === 'grid' ? gridItems : flex.items}
              mode={mode}
              contentMode={contentMode}
              grid={grid}
              activePropertyCount={activePropertyCount}
            />
          </div>

          <div className="min-h-[20rem] lg:col-span-2 xl:col-span-1 xl:h-full overflow-y-auto motion-fade-up motion-delay-2">
            <PropertyDefinitionPanel
              definition={selectedDefinition}
              mode={mode}
            />
          </div>

          <div className="lg:col-span-2 xl:col-span-3 min-h-[18rem] xl:h-72 xl:flex-shrink-0 overflow-hidden min-w-0 motion-fade-up motion-delay-3">
            <CssOutput cssOutput={cssOutput} className="h-full" onReset={onReset} />
          </div>
        </div>
    </div>
  );
}