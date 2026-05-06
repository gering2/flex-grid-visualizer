import { useMemo, useState } from 'react';
import CssOutput from '../components/CssOutput/CssOutput';
import BoxModelControls from '../components/BoxModel/BoxModelControls';
import BoxModelPreview from '../components/BoxModel/BoxModelPreview';

const DEFAULTS = {
  width: 240,
  height: 140,
  padding: 20,
  border: 6,
  margin: 24,
  borderRadius: 14,
  boxSizing: 'content-box',
};

function buildCssOutput(values) {
  return [
    '.box {',
    `  box-sizing: ${values.boxSizing};`,
    `  width: ${values.width}px;`,
    `  height: ${values.height}px;`,
    `  margin: ${values.margin}px;`,
    `  padding: ${values.padding}px;`,
    `  border: ${values.border}px solid rgba(124, 58, 237, 0.38);`,
    `  border-radius: ${values.borderRadius}px;`,
    '}',
  ].join('\n');
}

export default function BoxModelPage() {
  const [values, setValues] = useState(DEFAULTS);

  const onChange = (key, value) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const cssOutput = useMemo(() => buildCssOutput(values), [values]);

  return (
    <div className="overflow-y-auto xl:overflow-hidden xl:h-full xl:flex xl:flex-col">
      <div className="p-3 sm:p-4 flex flex-col gap-4 xl:flex-1 xl:min-h-0 xl:grid xl:grid-cols-[22rem_minmax(0,1fr)] xl:items-stretch">
        <div className="xl:overflow-y-auto">
          <BoxModelControls values={values} onChange={onChange} />
        </div>

        <div className="flex flex-col gap-4 xl:grid xl:grid-rows-[1fr_22rem] xl:h-full xl:min-h-0">
          <div className="min-h-[18rem] xl:min-h-0">
            <BoxModelPreview values={values} />
          </div>
          <div className="h-[22rem] xl:h-auto xl:min-h-0 overflow-hidden rounded-2xl">
            <CssOutput cssOutput={cssOutput} className="h-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
