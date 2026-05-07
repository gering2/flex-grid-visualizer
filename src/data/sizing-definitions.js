export const SIZING_DEFINITIONS = {
  'intrinsic-width': {
    label: 'min-content, max-content, fit-content()',
    definition:
      'Intrinsic sizing keywords let content influence width calculation. min-content wraps aggressively, max-content avoids wrapping, and fit-content() clamps growth with a limit.',
    usage: `.chip-min {
  width: min-content;
}

.chip-max {
  width: max-content;
}

.chip-fit {
  width: fit-content(280px);
}`,
  },
  'auto-fit-minmax': {
    label: 'auto-fit + minmax()',
    definition:
      'repeat(auto-fit, minmax()) creates as many tracks as will fit, while preserving a minimum card width. This is a robust pattern for responsive card galleries.',
    usage: `.gallery {
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
}`,
  },
  'ratio-object-fit': {
    label: 'aspect-ratio + object-fit',
    definition:
      'aspect-ratio reserves predictable geometry for media blocks. object-fit controls how replaced content such as images fills that reserved frame.',
    usage: `.media-frame {
  aspect-ratio: 16 / 9;
  overflow: hidden;
}

.media-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}`,
  },
};
