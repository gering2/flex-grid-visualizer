export const LAYOUT_TEMPLATES = [
  {
    id: 'header',
    label: 'Header Layout',
    description: 'A simple two-row layout with a header spanning full width above main content.',
    gridTemplateAreas: `"header header"\n"main main"`,
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '4rem 1fr',
    areas: [
      { name: 'header', label: 'Header', bg: 'bg-violet-100', border: 'border-violet-300', text: 'text-violet-700', span: 'col-span-2' },
      { name: 'main',   label: 'Main',   bg: 'bg-blue-100',   border: 'border-blue-300',   text: 'text-blue-700'   },
      { name: 'main',   label: 'Main',   bg: 'bg-blue-100',   border: 'border-blue-300',   text: 'text-blue-700'   },
    ],
  },
  {
    id: 'sidebar',
    label: 'Sidebar Layout',
    description: 'Header on top, with a sidebar and main content area side by side.',
    gridTemplateAreas: `"header header"\n"sidebar main"`,
    gridTemplateColumns: '12rem 1fr',
    gridTemplateRows: '4rem 1fr',
    areas: [
      { name: 'header',  label: 'Header',  bg: 'bg-violet-100', border: 'border-violet-300', text: 'text-violet-700' },
      { name: 'sidebar', label: 'Sidebar', bg: 'bg-emerald-100', border: 'border-emerald-300', text: 'text-emerald-700' },
      { name: 'main',    label: 'Main',    bg: 'bg-blue-100',   border: 'border-blue-300',   text: 'text-blue-700'   },
    ],
  },
  {
    id: 'holy-grail',
    label: 'Holy Grail',
    description: 'Classic layout: full-width header and footer, with sidebar, main, and aside column.',
    gridTemplateAreas: `"header header header"\n"sidebar main aside"\n"footer footer footer"`,
    gridTemplateColumns: '10rem 1fr 10rem',
    gridTemplateRows: '4rem 1fr 3rem',
    areas: [
      { name: 'header',  label: 'Header',  bg: 'bg-violet-100',  border: 'border-violet-300',  text: 'text-violet-700'  },
      { name: 'sidebar', label: 'Sidebar', bg: 'bg-emerald-100', border: 'border-emerald-300', text: 'text-emerald-700' },
      { name: 'main',    label: 'Main',    bg: 'bg-blue-100',    border: 'border-blue-300',    text: 'text-blue-700'    },
      { name: 'aside',   label: 'Aside',   bg: 'bg-amber-100',   border: 'border-amber-300',   text: 'text-amber-700'   },
      { name: 'footer',  label: 'Footer',  bg: 'bg-rose-100',    border: 'border-rose-300',    text: 'text-rose-700'    },
    ],
  },
];
