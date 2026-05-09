export const VARIABLE_DEFINITIONS = {
  'custom-properties': {
    label: 'Custom Properties',
    definition:
      'CSS custom properties store reusable values like colors, spacing, and radii. They can be defined globally or scoped to a component.',
    usage: `:root {
  --brand: #18181b;
  --radius-md: 0.75rem;
}`,
  },
  var: {
    label: 'var() Function',
    definition:
      'The var() function reads custom properties and can include a fallback in case a variable is missing.',
    usage: `.button {
  color: var(--button-fg, #18181b);
  background: var(--button-bg, #e4e4e7);
}`,
  },
  'local-scope': {
    label: 'Local Scope Overrides',
    definition:
      'Custom properties cascade. A nested element can override a token and descendants inside that scope will inherit the new value.',
    usage: `.card {
  --card-accent: #3f3f46;
}

.card--warning {
  --card-accent: #18181b;
}`,
  },
};
