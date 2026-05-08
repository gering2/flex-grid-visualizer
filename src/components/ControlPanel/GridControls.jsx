import ControlGroup from './ControlGroup';
import { ControlButton } from './ControlButton.jsx';
import { GRID_COLS, GRID_ROWS, PLACE_ITEMS, GAP_VALUES, JUSTIFY_ITEMS, ALIGN_ITEMS, JUSTIFY_CONTENT_GRID, ALIGN_CONTENT_GRID, COL_SIZE_OPTIONS, ROW_SIZE_OPTIONS } from '../../data/constants.js';

const clampPlacement = (placement, nextCols, nextRows) => {
  const safePlacement = placement ?? { startCol: 1, startRow: 1, colSpan: 1, rowSpan: 1 };
  const colCount = Number(nextCols);
  const rowCount = Number(nextRows);
  const startCol = Math.min(Math.max(1, safePlacement.startCol), colCount);
  const startRow = Math.min(Math.max(1, safePlacement.startRow), rowCount);
  const colSpan = Math.min(Math.max(1, safePlacement.colSpan), colCount - startCol + 1);
  const rowSpan = Math.min(Math.max(1, safePlacement.rowSpan), rowCount - startRow + 1);

  return { startCol, startRow, colSpan, rowSpan };
};

export default function GridControls({ grid, setGrid, onPropertySelect, selectedPropertyKey }) {
  const featuredPlacement = grid.featuredPlacement ?? { startCol: 1, startRow: 1, colSpan: 1, rowSpan: 1 };
  const maxColSpan = Math.max(1, Number(grid.gridCols) - featuredPlacement.startCol + 1);
  const maxRowSpan = Math.max(1, Number(grid.gridRows) - featuredPlacement.startRow + 1);

  return (
    <div className="space-y-3">
      <div className="control-section space-y-4">
        <div className="control-section-kicker">Grid Tracks</div>
        <ControlGroup label="Columns" propertyKey="grid-template-columns" onPropertySelect={onPropertySelect} selectedPropertyKey={selectedPropertyKey}>
          {GRID_COLS.map(val => (
            <ControlButton
              key={val}
              active={grid.gridCols === val}
              onClick={() => setGrid(g => ({
                ...g,
                gridCols: val,
                featuredPlacement: clampPlacement(g.featuredPlacement, val, g.gridRows),
              }))}
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
              onClick={() => setGrid(g => ({
                ...g,
                gridRows: val,
                featuredPlacement: clampPlacement(g.featuredPlacement, g.gridCols, val),
              }))}
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

        <ControlGroup label="Featured Item Placement" propertyKey="grid-column" onPropertySelect={onPropertySelect} selectedPropertyKey={selectedPropertyKey}>
          <div className="w-full rounded-lg border border-gray-200 bg-white px-2.5 py-2 space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span>Item 1</span>
              <span className="font-mono">{featuredPlacement.startCol} / span {featuredPlacement.colSpan}</span>
            </div>
            <div className="grid grid-cols-[1fr_auto] items-center gap-2">
              <span className="text-[11px] uppercase tracking-wide text-gray-500">Start col</span>
              <div className="inline-flex items-center gap-1.5">
                <button
                  type="button"
                  className="h-6 w-6 rounded-md border border-gray-200 text-gray-700"
                  onClick={() => setGrid((g) => ({
                    ...g,
                    featuredPlacement: clampPlacement({ ...g.featuredPlacement, startCol: g.featuredPlacement.startCol - 1 }, g.gridCols, g.gridRows),
                  }))}
                >−</button>
                <span className="min-w-5 text-center text-sm font-semibold text-gray-700">{featuredPlacement.startCol}</span>
                <button
                  type="button"
                  className="h-6 w-6 rounded-md border border-gray-200 text-gray-700"
                  onClick={() => setGrid((g) => ({
                    ...g,
                    featuredPlacement: clampPlacement({ ...g.featuredPlacement, startCol: g.featuredPlacement.startCol + 1 }, g.gridCols, g.gridRows),
                  }))}
                >+</button>
              </div>
            </div>

            <div className="grid grid-cols-[1fr_auto] items-center gap-2">
              <span className="text-[11px] uppercase tracking-wide text-gray-500">Span col</span>
              <div className="inline-flex items-center gap-1.5">
                <button
                  type="button"
                  className="h-6 w-6 rounded-md border border-gray-200 text-gray-700"
                  onClick={() => setGrid((g) => ({
                    ...g,
                    featuredPlacement: clampPlacement({ ...g.featuredPlacement, colSpan: g.featuredPlacement.colSpan - 1 }, g.gridCols, g.gridRows),
                  }))}
                >−</button>
                <span className="min-w-5 text-center text-sm font-semibold text-gray-700">{featuredPlacement.colSpan}</span>
                <button
                  type="button"
                  className="h-6 w-6 rounded-md border border-gray-200 text-gray-700"
                  onClick={() => setGrid((g) => ({
                    ...g,
                    featuredPlacement: clampPlacement({ ...g.featuredPlacement, colSpan: Math.min(maxColSpan, g.featuredPlacement.colSpan + 1) }, g.gridCols, g.gridRows),
                  }))}
                >+</button>
              </div>
            </div>
          </div>
        </ControlGroup>

        <ControlGroup label="Featured Item Row Span" propertyKey="grid-row" onPropertySelect={onPropertySelect} selectedPropertyKey={selectedPropertyKey}>
          <div className="w-full rounded-lg border border-gray-200 bg-white px-2.5 py-2 space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-600">
              <span>Item 1</span>
              <span className="font-mono">{featuredPlacement.startRow} / span {featuredPlacement.rowSpan}</span>
            </div>
            <div className="grid grid-cols-[1fr_auto] items-center gap-2">
              <span className="text-[11px] uppercase tracking-wide text-gray-500">Start row</span>
              <div className="inline-flex items-center gap-1.5">
                <button
                  type="button"
                  className="h-6 w-6 rounded-md border border-gray-200 text-gray-700"
                  onClick={() => setGrid((g) => ({
                    ...g,
                    featuredPlacement: clampPlacement({ ...g.featuredPlacement, startRow: g.featuredPlacement.startRow - 1 }, g.gridCols, g.gridRows),
                  }))}
                >−</button>
                <span className="min-w-5 text-center text-sm font-semibold text-gray-700">{featuredPlacement.startRow}</span>
                <button
                  type="button"
                  className="h-6 w-6 rounded-md border border-gray-200 text-gray-700"
                  onClick={() => setGrid((g) => ({
                    ...g,
                    featuredPlacement: clampPlacement({ ...g.featuredPlacement, startRow: g.featuredPlacement.startRow + 1 }, g.gridCols, g.gridRows),
                  }))}
                >+</button>
              </div>
            </div>

            <div className="grid grid-cols-[1fr_auto] items-center gap-2">
              <span className="text-[11px] uppercase tracking-wide text-gray-500">Span row</span>
              <div className="inline-flex items-center gap-1.5">
                <button
                  type="button"
                  className="h-6 w-6 rounded-md border border-gray-200 text-gray-700"
                  onClick={() => setGrid((g) => ({
                    ...g,
                    featuredPlacement: clampPlacement({ ...g.featuredPlacement, rowSpan: g.featuredPlacement.rowSpan - 1 }, g.gridCols, g.gridRows),
                  }))}
                >−</button>
                <span className="min-w-5 text-center text-sm font-semibold text-gray-700">{featuredPlacement.rowSpan}</span>
                <button
                  type="button"
                  className="h-6 w-6 rounded-md border border-gray-200 text-gray-700"
                  onClick={() => setGrid((g) => ({
                    ...g,
                    featuredPlacement: clampPlacement({ ...g.featuredPlacement, rowSpan: Math.min(maxRowSpan, g.featuredPlacement.rowSpan + 1) }, g.gridCols, g.gridRows),
                  }))}
                >+</button>
              </div>
            </div>
          </div>
        </ControlGroup>
      </div>

      <div className="control-section space-y-4">
        <div className="control-section-kicker">Item Alignment</div>
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

      <div className="control-section space-y-4">
        <div className="control-section-kicker">Container Distribution</div>
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