import { ControlGroup, ControlButton } from './ControlButton';
import { FLEX_DIRECTIONS, JUSTIFY_CONTENT, ALIGN_ITEMS, GAP_VALUES } from '../constants';

export default function FlexControls({ flex, setFlex }) {
  const setFlexItems = (count) => {
    setFlex(f => ({ ...f, items: count, grow: Array(count).fill(0) }));
  };

  return (
    <div className="space-y-2">
      <ControlGroup label="Flex Direction">
        {FLEX_DIRECTIONS.map(opt => (
          <ControlButton
            key={opt.value}
            active={flex.flexDirection === opt.value}
            onClick={() => setFlex(f => ({ ...f, flexDirection: opt.value }))}
            label={opt.label}
          />
        ))}
      </ControlGroup>
      <ControlGroup label="Justify Content">
        {JUSTIFY_CONTENT.map(opt => (
          <ControlButton
            key={opt.value}
            active={flex.justifyContent === opt.value}
            onClick={() => setFlex(f => ({ ...f, justifyContent: opt.value }))}
            label={opt.label}
          />
        ))}
      </ControlGroup>
      <ControlGroup label="Align Items">
        {ALIGN_ITEMS.map(opt => (
          <ControlButton
            key={opt.value}
            active={flex.alignItems === opt.value}
            onClick={() => setFlex(f => ({ ...f, alignItems: opt.value }))}
            label={opt.label}
          />
        ))}
      </ControlGroup>
      <ControlGroup label="Gap">
        {GAP_VALUES.map(val => (
          <ControlButton
            key={val}
            active={flex.gap === val}
            onClick={() => setFlex(f => ({ ...f, gap: val }))}
            label={val}
          />
        ))}
      </ControlGroup>
      <ControlGroup label="Flex Wrap">
        <ControlButton
          active={flex.wrap}
          onClick={() => setFlex(f => ({ ...f, wrap: !f.wrap }))}
          label={flex.wrap ? 'Wrap' : 'No Wrap'}
        />
      </ControlGroup>
      <ControlGroup label="Flex Items">
        {[2, 3, 4, 5, 6].map(val => (
          <ControlButton
            key={val}
            active={flex.items === val}
            onClick={() => setFlexItems(val)}
            label={val}
          />
        ))}
      </ControlGroup>
      <ControlGroup label="Flex Grow (Children)">
        {Array.from({ length: 6 }, (_, idx) => {
          const value = flex.grow[idx] ?? 0;
          const visible = idx < flex.items;
          return (
            <div key={idx} className={`flex items-center gap-1.5 rounded-lg  border border-gray-200 px-2 py-1.5${visible ? '' : ' invisible'}`}>
              <button
                className="w-5 h-5 rounded flex items-center justify-center text-accent text-sm font-bold hover:bg-accent/10 cursor-pointer focus-visible:outline-none transition leading-none"
                onClick={() => setFlex(f => ({ ...f, grow: f.grow.map((g, i) => i === idx ? Math.max(0, g - 1) : g) }))}
                type="button" tabIndex={visible ? 0 : -1}
                aria-label={`Decrease flex-grow for item ${idx + 1}`}
              >−</button>
              <span className="w-4 text-center text-sm font-semibold text-gray-700">{value}</span>
              <button
                className="w-5 h-5 rounded flex items-center justify-center text-accent text-sm font-bold hover:bg-accent/10 cursor-pointer focus-visible:outline-none transition leading-none"
                onClick={() => setFlex(f => ({ ...f, grow: f.grow.map((g, i) => i === idx ? g + 1 : g) }))}
                type="button" tabIndex={visible ? 0 : -1}
                aria-label={`Increase flex-grow for item ${idx + 1}`}
              >+</button>
            </div>
          );
        })}
     
      </ControlGroup>
        <button
          onClick={() => setFlex(f => ({ ...f, grow: Array(f.items).fill(0) }))}
          className="px-3 py-1 rounded border border-accent text-accent bg-transparent transition-all duration-150 cursor-pointer hover:bg-accent/10 active:scale-95"
          type="button"
        >
          Reset
        </button>
    </div>
  );
}
