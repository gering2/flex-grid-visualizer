import { ControlGroup, ControlButton } from './ControlButton';
import { GRID_COLS, GRID_ROWS, PLACE_ITEMS, GAP_VALUES } from '../constants';

export default function GridControls({ grid, setGrid }) {
  return (
    <div className="space-y-2">
      <ControlGroup label="Columns">
        {GRID_COLS.map(val => (
          <ControlButton
            key={val}
            active={grid.gridCols === val}
            onClick={() => setGrid(g => ({ ...g, gridCols: val }))}
            label={val}
          />
        ))}
      </ControlGroup>
      <ControlGroup label="Rows">
        {GRID_ROWS.map(val => (
          <ControlButton
            key={val}
            active={grid.gridRows === val}
            onClick={() => setGrid(g => ({ ...g, gridRows: val }))}
            label={val}
          />
        ))}
      </ControlGroup>
      <ControlGroup label="Place Items">
        {PLACE_ITEMS.map(opt => (
          <ControlButton
            key={opt.value}
            active={grid.placeItems === opt.value}
            onClick={() => setGrid(g => ({ ...g, placeItems: opt.value }))}
            label={opt.label}
          />
        ))}
      </ControlGroup>
      <ControlGroup label="Gap">
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
  );
}
