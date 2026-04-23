const gapRem = (gap) => `gap-[${gap * 0.25}rem]`;

const contentValueMap = {
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
};

const toCssContentValue = (value) => contentValueMap[value] ?? value;
const toCssFlexAxisValue = (value) => {
  if (value === 'start') return 'flex-start';
  if (value === 'end') return 'flex-end';
  return toCssContentValue(value);
};

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

  const gridGap = Number(grid.gap) * 0.25;
  const colSize = grid.colSize ?? '1fr';
  const rowSize = grid.rowSize ?? '4rem';

  const gridClasses = [
    'grid',
    'h-full',
  ].join(' ');

  const gridStyle = {
    gridTemplateColumns: `repeat(${grid.gridCols}, ${colSize})`,
    gridTemplateRows: `repeat(${grid.gridRows}, ${rowSize})`,
    justifyItems: grid.justifyItems,
    alignItems: grid.alignItems,
    justifyContent: toCssContentValue(grid.justifyContent),
    alignContent: toCssContentValue(grid.alignContent),
    gap: `${gridGap}rem`,
  };

  const previewClasses = mode === 'flex' ? flexClasses : gridClasses;
  const previewFlexDirection = mode === 'flex' ? flex.flexDirection : undefined;
  const previewStyle = mode === 'grid' ? gridStyle : undefined;

  const childCss = flex.grow
    .map((grow, idx) => grow !== 0 ? `.item-${idx + 1} { flex-grow: ${grow}; }` : null)
    .filter(Boolean)
    .join('\n');

  const cssOutput = mode === 'flex'
    ? [
        'display: flex;',
        `flex-direction: ${flex.flexDirection};`,
        `justify-content: ${toCssFlexAxisValue(flex.justifyContent)};`,
        `align-items: ${toCssFlexAxisValue(flex.alignItems)};`,
        `align-content: ${toCssFlexAxisValue(flex.alignContent)};`,
        `gap: ${flex.gap * 0.25}rem;`,
        `flex-wrap: ${flex.wrap === true ? 'wrap' : 'nowrap'}`,
        ...(childCss ? ['', childCss] : []),
      ].join('\n')
    : [
        'display: grid;',
        `grid-template-columns: repeat(${grid.gridCols}, ${colSize});`,
      `grid-template-rows: repeat(${grid.gridRows}, ${rowSize});`,
        ...(grid.justifyItems === grid.alignItems ? [`place-items: ${grid.justifyItems};`] : []),
        `justify-items: ${grid.justifyItems};`,
        `align-items: ${grid.alignItems};`,
        `justify-content: ${toCssContentValue(grid.justifyContent)};`,
        `align-content: ${toCssContentValue(grid.alignContent)};`,
        `gap: ${gridGap}rem;`,
      ].join('\n');

  return { previewClasses, previewFlexDirection, previewStyle, cssOutput };
}
