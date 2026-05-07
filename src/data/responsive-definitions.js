export const RESPONSIVE_DEFINITIONS = {
  'media-queries': {
    label: 'Media Queries',
    definition:
      'Media queries apply CSS rules at specific viewport conditions, usually width breakpoints. They let a single component adapt layout and density as the available screen space changes.',
    usage: `/* mobile-first base */
.dashboard {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
}

@media (min-width: 640px) {
  .dashboard {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .dashboard {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}`,
  },
  'container-queries': {
    label: 'Container Queries',
    definition:
      'Container queries respond to the parent container size instead of the viewport. They are ideal for reusable components that can appear in different layout regions.',
    usage: `.feature-shell {
  container-type: inline-size;
}

.feature-card {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

@container (min-width: 520px) {
  .feature-card {
    flex-direction: row;
    align-items: center;
  }
}`,
  },
  'fluid-type': {
    label: 'Fluid Type with clamp()',
    definition:
      'The clamp() function sets a minimum, preferred, and maximum value. It is useful for type that scales with viewport width but stays within accessible bounds.',
    usage: `.dashboard-title {
  font-size: clamp(1.05rem, 1.1vw + 0.9rem, 2rem);
  line-height: 1.15;
}`,
  },
};
