import ControlGroup from './ControlGroup';
import { ControlButton } from './ControlButton.jsx';
import { GRID_COLS, GRID_ROWS, PLACE_ITEMS, GAP_VALUES, JUSTIFY_ITEMS, ALIGN_ITEMS, JUSTIFY_CONTENT_GRID, ALIGN_CONTENT_GRID, COL_SIZE_OPTIONS, ROW_SIZE_OPTIONS } from '../../data/constants.js';

export default function GridControls({ grid, setGrid, onPropertySelect, selectedPropertyKey }) {
  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 space-y-4">
        <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">Grid Tracks</div>
        <ControlGroup label="Columns" propertyKey="grid-template-columns" onPropertySelect={onPropertySelect} selectedPropertyKey={selectedPropertyKey}>
          {GRID_COLS.map(val => (
            <ControlButton
              key={val}
              active={grid.gridCols === val}
              onClick={() => setGrid(g => ({ ...g, gridCols: val }))}
              label={val}
            />
          ))}
        </ControlGroup>
        <ControlGroup label="Column Size" propertyKey="grid-template-columns" onPropertySelect={onPropertySelect} selectedPropertyKey={selectedPropertyKey}>
          {COL_SIZE_OPTIONS.map(opt => (
            <ControlButton
              key={opt.value}
              active={grid.colSize === opt.value}
              onClick={() => setGrid(g => ({ ...g, colSize: opt.value }))}
              label={opt.label}
            />
          ))}
        </ControlGroup>
        <ControlGroup label="Rows" propertyKey="grid-template-rows" onPropertySelect={onPropertySelect} selectedPropertyKey={selectedPropertyKey}>
          {GRID_ROWS.map(val => (
            <ControlButton
              key={val}
              active={grid.gridRows === val}
              onClick={() => setGrid(g => ({ ...g, gridRows: val }))}
              label={val}
            />
          ))}
        </ControlGroup>
        <ControlGroup label="Row Size" propertyKey="grid-template-rows" onPropertySelect={onPropertySelect} selectedPropertyKey={selectedPropertyKey}>
          {ROW_SIZE_OPTIONS.map(opt => (
            <ControlButton
              key={opt.value}
              active={grid.rowSize === opt.value}
              onClick={() => setGrid(g => ({ ...g, rowSize: opt.value }))}
              label={opt.label}
            />
          ))}
        </ControlGroup>
        <ControlGroup label="Track Lines">
          <ControlButton
            active={grid.showTrackLines === true}
            onClick={() => setGrid(g => ({ ...g, showTrackLines: !g.showTrackLines }))}
            label={grid.showTrackLines ? 'On' : 'Off'}
          />
        </ControlGroup>
      </div>

      <div className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 space-y-4">
        <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">Item Alignment</div>
        <ControlGroup label="Place Items" propertyKey="place-items" onPropertySelect={onPropertySelect} selectedPropertyKey={selectedPropertyKey}>
          {PLACE_ITEMS.map(opt => (
            <ControlButton
              key={opt.value}
              active={grid.placeItems === opt.value && grid.justifyItems === opt.value && grid.alignItems === opt.value}
              onClick={() => setGrid(g => ({
                ...g,
                placeItems: opt.value,
                justifyItems: opt.value,
                alignItems: opt.value,
              }))}
              label={opt.label}
            />
          ))}
        </ControlGroup>
        <ControlGroup label="Justify Items" propertyKey="justify-items" onPropertySelect={onPropertySelect} selectedPropertyKey={selectedPropertyKey}>
          {JUSTIFY_ITEMS.map(opt => (
            <ControlButton
              key={opt.value}
              active={grid.justifyItems === opt.value}
              onClick={() => setGrid(g => ({
                ...g,
                justifyItems: opt.value,
                placeItems: g.alignItems === opt.value ? opt.value : g.placeItems,
              }))}
              label={opt.label}
            />
          ))}
        </ControlGroup>
        <ControlGroup label="Align Items" propertyKey="align-items" onPropertySelect={onPropertySelect} selectedPropertyKey={selectedPropertyKey}>
          {ALIGN_ITEMS.map(opt => (
            <ControlButton
              key={opt.value}
              active={grid.alignItems === opt.value}
              onClick={() => setGrid(g => ({
                ...g,
                alignItems: opt.value,
                placeItems: g.justifyItems === opt.value ? opt.value : g.placeItems,
              }))}
              label={opt.label}
            />
          ))}
        </ControlGroup>
      </div>

      <div className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 space-y-4">
        <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">Container Distribution</div>
        <ControlGroup label="Justify Content" propertyKey="justify-content" onPropertySelect={onPropertySelect} selectedPropertyKey={selectedPropertyKey}>
          {JUSTIFY_CONTENT_GRID.map(opt => (
            <ControlButton
              key={opt.value}
              active={grid.justifyContent === opt.value}
              onClick={() => setGrid(g => ({ ...g, justifyContent: opt.value }))}
              label={opt.label}
            />
          ))}
        </ControlGroup>
        <ControlGroup label="Align Content" propertyKey="align-content" onPropertySelect={onPropertySelect} selectedPropertyKey={selectedPropertyKey}>
          {ALIGN_CONTENT_GRID.map(opt => (
            <ControlButton
              key={opt.value}
              active={grid.alignContent === opt.value}
              onClick={() => setGrid(g => ({ ...g, alignContent: opt.value }))}
              label={opt.label}
            />
          ))}
        </ControlGroup>
        <ControlGroup label="Gap" propertyKey="gap" onPropertySelect={onPropertySelect} selectedPropertyKey={selectedPropertyKey}>
          {GAP_VALUES.map(val => (
            <ControlButton
              key={val}
              active={grid.gap === val}
              onClick={() => setGrid(g => ({ ...g, gap: val }))}
              label={val}
            />
          ))}
        </ControlGroup>
      </div>
    </div>
  );
}