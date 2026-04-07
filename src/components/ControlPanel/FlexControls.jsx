import { ControlGroup, ControlButton } from './ControlButton';
import { FLEX_DIRECTIONS, JUSTIFY_CONTENT, ALIGN_ITEMS, GAP_VALUES, ALIGN_CONTENT } from '../../constants';

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

      <ControlGroup label="Align Content">
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
        {/* ...existing code for flex grow controls if present... */}
      </ControlGroup>
    </div>
  );
}