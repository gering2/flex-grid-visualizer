import ControlGroup from './ControlGroup';
import { ControlButton } from './ControlButton.jsx';
import { GRID_COLS, GRID_ROWS, PLACE_ITEMS, GAP_VALUES, JUSTIFY_ITEMS, ALIGN_ITEMS, JUSTIFY_CONTENT_GRID, ALIGN_CONTENT_GRID } from '../../data/constants.js';

function ControlsSection({ title, children }) {
  return (
    <section className="panel-muted p-4 space-y-4">
      <div className="section-title">{title}</div>
      {children}
    </section>
  );
}

export default function GridControls({ grid, setGrid, onPropertySelect, selectedPropertyKey }) {
  return (
    <div className="space-y-5">
      <ControlsSection title="Grid Tracks">
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
      </ControlsSection>

      <ControlsSection title="Item Alignment">
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
      </ControlsSection>

      <ControlsSection title="Container Spacing">
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
      </ControlsSection>
    </div>
  );
}