import ControlGroup from './ControlGroup';
import { ControlButton } from './ControlButton.jsx';
import { FLEX_DIRECTIONS, JUSTIFY_CONTENT, ALIGN_ITEMS, GAP_VALUES, ALIGN_CONTENT } from '../../data/constants.js';

export default function FlexControls({ flex, setFlex, onPropertySelect, selectedPropertyKey }) {
  const setFlexItems = (count) => {
    setFlex(f => ({ ...f, items: count, grow: Array(count).fill(0) }));
  };

  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 space-y-4">
        <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">Flex Flow</div>
        <ControlGroup label="Flex Direction" propertyKey="flex-direction" onPropertySelect={onPropertySelect} selectedPropertyKey={selectedPropertyKey}>
          {FLEX_DIRECTIONS.map(opt => (
            <ControlButton
              key={opt.value}
              active={flex.flexDirection === opt.value}
              onClick={() => setFlex(f => ({ ...f, flexDirection: opt.value }))}
              label={opt.label}
            />
          ))}
        </ControlGroup>
        <ControlGroup label="Flex Wrap" propertyKey="flex-wrap" onPropertySelect={onPropertySelect} selectedPropertyKey={selectedPropertyKey}>
          <ControlButton
            active={flex.wrap}
            onClick={() => setFlex(f => ({ ...f, wrap: !f.wrap }))}
            label={flex.wrap ? 'Wrap' : 'No Wrap'}
          />
        </ControlGroup>
        <ControlGroup label="Gap" propertyKey="gap" onPropertySelect={onPropertySelect} selectedPropertyKey={selectedPropertyKey}>
          {GAP_VALUES.map(val => (
            <ControlButton
              key={val}
              active={flex.gap === val}
              onClick={() => setFlex(f => ({ ...f, gap: val }))}
              label={val}
            />
          ))}
        </ControlGroup>
      </div>

      <div className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 space-y-4">
        <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">Item Alignment</div>
        <ControlGroup label="Justify Content" propertyKey="justify-content" onPropertySelect={onPropertySelect} selectedPropertyKey={selectedPropertyKey}>
          {JUSTIFY_CONTENT.map(opt => (
            <ControlButton
              key={opt.value}
              active={flex.justifyContent === opt.value}
              onClick={() => setFlex(f => ({ ...f, justifyContent: opt.value }))}
              label={opt.label}
            />
          ))}
        </ControlGroup>
        <ControlGroup label="Align Items" propertyKey="align-items" onPropertySelect={onPropertySelect} selectedPropertyKey={selectedPropertyKey}>
          {ALIGN_ITEMS.map(opt => (
            <ControlButton
              key={opt.value}
              active={flex.alignItems === opt.value}
              onClick={() => setFlex(f => ({ ...f, alignItems: opt.value }))}
              label={opt.label}
            />
          ))}
        </ControlGroup>
        <ControlGroup label="Align Content" propertyKey="align-content" onPropertySelect={onPropertySelect} selectedPropertyKey={selectedPropertyKey}>
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
      </div>

      <div className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-3 space-y-4">
        <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gray-500">Items</div>
        <ControlGroup label="Flex Items" propertyKey="flex-items" onPropertySelect={onPropertySelect} selectedPropertyKey={selectedPropertyKey}>
          {[2, 3, 4, 5, 6].map(val => (
            <ControlButton
              key={val}
              active={flex.items === val}
              onClick={() => setFlexItems(val)}
              label={val}
            />
          ))}
        </ControlGroup>
        <ControlGroup label="Flex Grow (Children)" propertyKey="flex-grow" onPropertySelect={onPropertySelect} selectedPropertyKey={selectedPropertyKey}>
          <div className="w-full grid grid-cols-1 gap-2">
            {Array.from({ length: flex.items }, (_, idx) => (
              <div key={idx} className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-2.5 py-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Item {idx + 1}</span>
                <div className="inline-flex items-center gap-1.5 px-0.5 py-0.5">
                  <button
                    className="h-6 w-6 rounded-md bg-transparent text-sm font-bold text-gray-700 hover:bg-gray-200/70 cursor-pointer focus-ring transition leading-none"
                    onClick={() => setFlex(f => ({ ...f, grow: f.grow.map((g, i) => i === idx ? Math.max(0, g - 1) : g) }))}
                    type="button"
                    aria-label={`Decrease flex-grow for item ${idx + 1}`}
                  >−</button>
                  <span className="min-w-5 text-center text-sm font-semibold text-gray-700">{flex.grow[idx] ?? 0}</span>
                  <button
                    className="h-6 w-6 rounded-md bg-transparent text-sm font-bold text-gray-700 hover:bg-gray-200/70 cursor-pointer focus-ring transition leading-none"
                    onClick={() => setFlex(f => ({ ...f, grow: f.grow.map((g, i) => i === idx ? g + 1 : g) }))}
                    type="button"
                    aria-label={`Increase flex-grow for item ${idx + 1}`}
                  >+</button>
                </div>
              </div>
            ))}

            <button
              onClick={() => setFlex(f => ({ ...f, grow: Array(f.items).fill(0) }))}
              className="btn-secondary focus-ring justify-self-start px-3 py-1.5 text-sm font-semibold cursor-pointer"
              type="button"
            >
              Reset Values
            </button>
          </div>
        </ControlGroup>
      </div>
    </div>
  );
}