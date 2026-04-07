const gapRem = (gap) => `gap-[${gap * 0.25}rem]`;

export function useFlexGrid(mode, flex, grid) {
  const flexDirectionClass =
    flex.flexDirection === 'row' ? 'flex-row'
    : flex.flexDirection === 'row-reverse' ? 'flex-row-reverse'
    : flex.flexDirection === 'col' ? 'flex-col'
    : flex.flexDirection === 'col-reverse' ? 'flex-col-reverse'
    : '';

  const flexWrapClass = flex.wrap ? 'flex-wrap' : 'flex-nowrap';

  const flexClasses = [
    'flex',
    flexDirectionClass,
    flexWrapClass,
    `justify-${flex.justifyContent}`,
    `items-${flex.alignItems}`,
    `content-${flex.alignContent}`,
    gapRem(flex.gap),
  ].join(' ');

  const gridClasses = [
    'grid',
    `grid-cols-${grid.gridCols}`,
    `grid-rows-${grid.gridRows}`,
    `place-items-${grid.placeItems}`,
    gapRem(grid.gap),
  ].join(' ');

  const previewClasses = mode === 'flex' ? flexClasses : gridClasses;
  const previewFlexDirection = mode === 'flex' ? flex.flexDirection : undefined;

  const childCss = flex.grow
    .map((grow, idx) => grow !== 0 ? `.item-${idx + 1} { flex-grow: ${grow}; }` : null)
    .filter(Boolean)
    .join('\n');

  const cssOutput = mode === 'flex'
    ? [
        'display: flex;',
        `flex-direction: ${flex.flexDirection};`,
        `justify-content: ${flex.justifyContent};`,
        `align-items: ${flex.alignItems};`,
        `gap: ${flex.gap * 0.25}rem;`,
        `flex-wrap: ${flex.wrap === true ? 'wrap' : 'nowrap'}`,
        ...(childCss ? ['', childCss] : []),
      ].join('\n')
    : [
        'display: grid;',
        `grid-template-columns: repeat(${grid.gridCols}, minmax(0, 1fr));`,
        `grid-template-rows: repeat(${grid.gridRows}, minmax(0, 1fr));`,
        `place-items: ${grid.placeItems};`,
        `gap: ${grid.gap * 0.25}rem;`,
      ].join('\n');

  return { previewClasses, previewFlexDirection, cssOutput };
}
