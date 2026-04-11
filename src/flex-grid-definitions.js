// flex-grid-definitions.js
// Definitions and usage for grid and flex properties

export const PROPERTY_DEFINITIONS = {
  'flex-direction': {
    label: 'Flex Direction',
    definition: 'Specifies the direction of the flexible items in a flex container.',
    usage: `flex-direction: row;      /* horizontal, left to right */\nflex-direction: row-reverse; /* horizontal, right to left */\nflex-direction: column;      /* vertical, top to bottom */\nflex-direction: column-reverse; /* vertical, bottom to top */`
  },
  'justify-content': {
    label: 'Justify Content',
    definition: 'Defines how the browser distributes space between and around content items along the main axis of a flex or grid container.',
    usage: `justify-content: flex-start;  /* items packed to the start */\njustify-content: flex-end;      /* items packed to the end */\njustify-content: center;        /* items centered */\njustify-content: space-between; /* items evenly distributed, first at start, last at end */\njustify-content: space-around;  /* items evenly distributed with equal space around them */\njustify-content: space-evenly;  /* items evenly distributed with equal space between them */`
  },
  'align-items': {
    label: 'Align Items',
    definition: 'Aligns flex or grid items along the cross axis (perpendicular to the main axis) of the container.',
    usage: `align-items: stretch;    /* default, items stretch to fill */\nalign-items: flex-start;  /* items aligned to the start */\nalign-items: flex-end;    /* items aligned to the end */\nalign-items: center;      /* items centered */\nalign-items: baseline;    /* items aligned by their baseline */`
  },
  'align-content': {
    label: 'Align Content',
    definition: 'Aligns the flex or grid lines within the container when there is extra space in the cross axis.',
    usage: `align-content: stretch;\nalign-content: flex-start;\nalign-content: flex-end;\nalign-content: center;\nalign-content: space-between;\nalign-content: space-around;\nalign-content: space-evenly;`
  },
  'gap': {
    label: 'Gap',
    definition: 'Specifies the size of the gap between (not around) rows and columns in flex and grid layouts. Flex uses while gap',
    usage: `gap: 16px;         /* both row and column gap */\ngap: 8px 16px;     /* row gap, column gap */\nrow-gap: 8px;\ncolumn-gap: 16px;`
  },
  'flex-wrap': {
    label: 'Flex Wrap',
    definition: 'Specifies whether flex items are forced onto one line or can wrap onto multiple lines.',
    usage: `flex-wrap: nowrap;    /* all items on one line */\nflex-wrap: wrap;      /* items wrap onto multiple lines */\nflex-wrap: wrap-reverse; /* items wrap onto multiple lines in reverse order */`
  },
  'flex-items': {
    label: 'Flex Items',
    definition: 'Controls the number of flex items (children) in the container. Not a CSS property, but a UI control for demonstration.',
    usage: `/* Example: 4 flex items */\n<div class=\"flex\">\n  <div>1</div>\n  <div>2</div>\n  <div>3</div>\n  <div>4</div>\n</div>`
  },
  'flex-grow': {
    label: 'Flex Grow',
    definition: 'Specifies how much a flex item will grow relative to the rest of the flex items inside the same container.',
    usage: `flex-grow: 0; /* do not grow */\nflex-grow: 1; /* grow to fill available space */`
  },
  'grid-template-columns': {
    label: 'Grid Template Columns',
    definition: 'Defines the columns of the grid with a space-separated list of values. Each value specifies the size of the respective column.',
    usage: `grid-template-columns: 100px 1fr 2fr;\ngrid-template-columns: repeat(3, 1fr);\ngrid-template: [row] / [columns];\n// Example:\ngrid-template: 'a a a' 1fr 'b b b' 2fr / 100px 1fr 2fr;`
  },
  'grid-template-rows': {
    label: 'Grid Template Rows',
    definition: 'Defines the rows of the grid with a space-separated list of values. Each value specifies the size of the respective row.',
    usage: `grid-template-rows: 50px 100px;\ngrid-template-rows: repeat(2, 1fr);\ngrid-template: [rows] / [columns];`
  },
  'place-items': {
    label: 'Place Items',
    definition: 'A shorthand to set both align-items and justify-items in grid layouts.',
    usage: `place-items: center;\nplace-items: start stretch;`
  },
  'justify-items': {
    label: 'Justify Items',
    definition: 'Aligns grid items along the inline (row) axis within their grid area.',
    usage: `justify-items: start;\njustify-items: end;\njustify-items: center;\njustify-items: stretch;`
  }
  // Add more as needed
};
