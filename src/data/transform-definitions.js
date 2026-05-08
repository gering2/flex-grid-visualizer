export const TRANSFORM_DEFINITIONS = {
  transform: {
    label: 'transform',
    definition:
      'transform applies one or more geometric operations without affecting normal document flow. Order matters because each function works from the previous result.',
    usage: `.card {
  transform: translate(24px, -12px) rotate(18deg) scale(1.12) skew(6deg, 0deg);
}`,
  },
  translate: {
    label: 'translate()',
    definition:
      'translate() repositions an element along the x and y axes. It changes the painted position, not the layout space reserved in flow.',
    usage: `.card {
  transform: translate(32px, -16px);
}`,
  },
  scale: {
    label: 'scale()',
    definition:
      'scale() resizes an element on the transform plane. Values above 1 enlarge; values below 1 shrink.',
    usage: `.card {
  transform: scale(1.15);
}`,
  },
  rotate: {
    label: 'rotate()',
    definition:
      'rotate() turns an element around its transform origin. Positive angles rotate clockwise in CSS visual coordinates.',
    usage: `.card {
  transform: rotate(18deg);
}`,
  },
  skew: {
    label: 'skew()',
    definition:
      'skew() shears an element by shifting axes. It is useful for explaining the transform matrix even though it is less common in production UI.',
    usage: `.card {
  transform: skew(8deg, 0deg);
}`,
  },
  'transform-origin': {
    label: 'transform-origin',
    definition:
      'transform-origin sets the anchor point used by rotate, scale, and skew. Changing it makes the same transform feel very different.',
    usage: `.card {
  transform-origin: top left;
}`,
  },
};