import ControlGroup from './ControlGroup';
import { ControlButton } from './ControlButton.jsx';
import { FLEX_DIRECTIONS, JUSTIFY_CONTENT, ALIGN_ITEMS, GAP_VALUES, ALIGN_CONTENT } from '../../constants';

export default function FlexControls({ flex, setFlex }) {
  const setFlexItems = (count) => {
    setFlex(f => ({ ...f, items: count, grow: Array(count).fill(0) }));
  };

  return (
    <div className="space-y-2">
      <ControlGroup label="Flex Direction" propertyKey="flex-direction">
        {FLEX_DIRECTIONS.map(opt => (
          <ControlButton
            key={opt.value}
            active={flex.flexDirection === opt.value}
            onClick={() => setFlex(f => ({ ...f, flexDirection: opt.value }))}
            label={opt.label}
          />
        ))}
      </ControlGroup>
      <ControlGroup label="Justify Content" propertyKey="justify-content">
        {JUSTIFY_CONTENT.map(opt => (
          <ControlButton
            key={opt.value}
            active={flex.justifyContent === opt.value}
            onClick={() => setFlex(f => ({ ...f, justifyContent: opt.value }))}
            label={opt.label}
          />
        ))}
      </ControlGroup>
      <ControlGroup label="Align Items" propertyKey="align-items">
        {ALIGN_ITEMS.map(opt => (
          <ControlButton
            key={opt.value}
            active={flex.alignItems === opt.value}
            onClick={() => setFlex(f => ({ ...f, alignItems: opt.value }))}
            label={opt.label}
          />
        ))}
      </ControlGroup>
      <ControlGroup label="Gap" propertyKey="gap">
        {GAP_VALUES.map(val => (
          <ControlButton
            key={val}
            active={flex.gap === val}
            onClick={() => setFlex(f => ({ ...f, gap: val }))}
            label={val}
          />
        ))}
      </ControlGroup>

      <ControlGroup label="Align Content" propertyKey="align-content">
        {ALIGN_CONTENT.map(opt => (
          <ControlButton
            key={opt.value}
            active={flex.alignContent === opt.value}
            onClick={() => setFlex(f => ({ ...f, alignContent: opt.value }))}
            label={opt.label}
            disabled={!flex.wrap}
          />
        ))}
      </ControlGroup>
      <ControlGroup label="Flex Wrap" propertyKey="flex-wrap">
        <ControlButton
          active={flex.wrap}
          onClick={() => setFlex(f => ({ ...f, wrap: !f.wrap }))}
          label={flex.wrap ? 'Wrap' : 'No Wrap'}
        />
      </ControlGroup>
      <ControlGroup label="Flex Items" propertyKey="flex-items">
        {[2, 3, 4, 5, 6].map(val => (
          <ControlButton
            key={val}
            active={flex.items === val}
            onClick={() => setFlexItems(val)}
            label={val}
          />
        ))}
      </ControlGroup>
      <ControlGroup label="Flex Grow (Children)" propertyKey="flex-grow">
       <div className="flex gap-2 items-center flex-wrap">
          {Array.from({ length: flex.items }, (_, idx) => (
            <div key={idx} className="flex items-center gap-1">
              <button
                className="w-5 h-5 rounded flex items-center justify-center text-accent text-sm font-bold hover:bg-accent/10 cursor-pointer focus-visible:outline-none transition leading-none"
                onClick={() => setFlex(f => ({ ...f, grow: f.grow.map((g, i) => i === idx ? Math.max(0, g - 1) : g) }))}
                type="button"
                aria-label={`Decrease flex-grow for item ${idx + 1}`}
              >−</button>
              <span className="w-4 text-center text-sm font-semibold text-gray-700">{flex.grow[idx] ?? 0}</span>
              <button
                className="w-5 h-5 rounded flex items-center justify-center text-accent text-sm font-bold hover:bg-accent/10 cursor-pointer focus-visible:outline-none transition leading-none"
                onClick={() => setFlex(f => ({ ...f, grow: f.grow.map((g, i) => i === idx ? g + 1 : g) }))}
                type="button"
                aria-label={`Increase flex-grow for item ${idx + 1}`}
              >+</button>
            </div>
          ))}
          <button
            onClick={() => setFlex(f => ({ ...f, grow: Array(f.items).fill(0) }))}
            className="ml-2 px-2 cursor-pointer py-1 text-accent text-s border rounded-md border-accent hover:bg-purple-100 font-semibold bg-transparent   focus-visible:outline-none"
            type="button"
          >
            Reset
          </button>
        
        </div>
      </ControlGroup>
    </div>
  );
}