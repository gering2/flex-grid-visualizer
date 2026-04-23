// Flex/grid shared option sets
export const JUSTIFY_ITEMS = [
  { label: 'Start', value: 'start' },
  { label: 'Center', value: 'center' },
  { label: 'End', value: 'end' },
  { label: 'Stretch', value: 'stretch' },
];

export const ALIGN_ITEMS = [
  { label: 'Start', value: 'start' },
  { label: 'Center', value: 'center' },
  { label: 'End', value: 'end' },
  { label: 'Stretch', value: 'stretch' },
  { label: 'Baseline', value: 'baseline' },
];

export const JUSTIFY_CONTENT = [
  { label: 'Start', value: 'start' },
  { label: 'Center', value: 'center' },
  { label: 'End', value: 'end' },
  { label: 'Between', value: 'between' },
  { label: 'Around', value: 'around' },
  { label: 'Evenly', value: 'evenly' },
];

export const ALIGN_CONTENT = [
  { label: 'Start', value: 'start' },
  { label: 'Center', value: 'center' },
  { label: 'End', value: 'end' },
  { label: 'Between', value: 'between' },
  { label: 'Around', value: 'around' },
  { label: 'Evenly', value: 'evenly' },
  { label: 'Stretch', value: 'stretch' },
];

// For grid, prepend 'Normal' to justify/align content
export const JUSTIFY_CONTENT_GRID = [
  { label: 'Normal', value: 'normal' },
  ...JUSTIFY_CONTENT,
  { label: 'Stretch', value: 'stretch' },
];
export const ALIGN_CONTENT_GRID = [
  { label: 'Normal', value: 'normal' },
  ...ALIGN_CONTENT,
];

export const FLEXBOX_DEFAULTS = {
  flexDirection: 'row',
  justifyContent: 'start',
  alignItems: 'start',
  alignContent: 'start',
  gap: '2',
  wrap: false,
   items: 3,
  grow: [0, 0, 0],
};

export const GRID_DEFAULTS = {
  gridCols: '3',
  gridRows: '2',
  colSize: '1fr',
  rowSize: '4rem',
  showTrackLines: false,
  placeItems: 'stretch',
  justifyItems: 'stretch',
  alignItems: 'stretch',
  justifyContent: 'normal',
  alignContent: 'normal',
  gap: '2',
};

export const COL_SIZE_OPTIONS = [
  { label: 'Auto', value: 'auto', description: 'Content-based' },
  { label: 'Equal (1fr)', value: '1fr', description: 'Layout-based' },
];

export const ROW_SIZE_OPTIONS = [
  { label: 'Content', value: 'auto', description: 'auto' },
  { label: 'Equal (1fr)', value: '1fr', description: 'Equal rows' },
  { label: 'Fixed (4rem)', value: '4rem', description: 'Strict height' },
];

export const FLEX_DIRECTIONS = [
  { label: 'Row', value: 'row' },
  { label: 'Row Reverse', value: 'row-reverse' },
  { label: 'Column', value: 'col' },
  { label: 'Column Reverse', value: 'col-reverse' },
];




export const GAP_VALUES = ['0', '1', '2', '4', '6', '8', '12', '16'];

export const GRID_COLS = ['2', '3', '4', '6'];
export const GRID_ROWS = ['1', '2', '3'];
export const PLACE_ITEMS = [
  { label: 'Start', value: 'start' },
  { label: 'Center', value: 'center' },
  { label: 'End', value: 'end' },
  { label: 'Stretch', value: 'stretch' },
];
