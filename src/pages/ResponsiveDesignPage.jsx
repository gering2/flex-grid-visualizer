import { useMemo, useState } from 'react';
import { ControlButton, ControlGroup } from '../components/ControlPanel/ControlButton';
import CssOutput from '../components/CssOutput/CssOutput';
import PropertyDefinitionPanel from '../components/PropertyDefinitionPanel';
import { RESPONSIVE_DEFINITIONS } from '../data/responsive-definitions';

const SM_PRESET = [
  { label: '1 col', value: 1 },
  { label: '2 col', value: 2 },
];

const MD_PRESET = [
  { label: '2 col', value: 2 },
  { label: '3 col', value: 3 },
];

const LG_PRESET = [
  { label: '3 col', value: 3 },
  { label: '4 col', value: 4 },
  { label: '6 col', value: 6 },
];

const CARDS = [
  { title: 'Traffic', value: '128k', delta: '+12%' },
  { title: 'Sales', value: '$24.1k', delta: '+6%' },
  { title: 'Subscriptions', value: '3.8k', delta: '+9%' },
  { title: 'Bounce Rate', value: '28%', delta: '-3%' },
  { title: 'Session Time', value: '4m 12s', delta: '+11%' },
  { title: 'Conversion', value: '5.1%', delta: '+1.4%' },
];

export default function ResponsiveDesignPage() {
  const [selectedDefinitionKey, setSelectedDefinitionKey] = useState('media-queries');
  const [canvasWidth, setCanvasWidth] = useState(920);
  const [smBreakpoint, setSmBreakpoint] = useState(640);
  const [lgBreakpoint, setLgBreakpoint] = useState(1024);
  const [smallCols, setSmallCols] = useState(1);
  const [mediumCols, setMediumCols] = useState(2);
  const [largeCols, setLargeCols] = useState(4);
  const [gap, setGap] = useState(16);
  const [typeMin, setTypeMin] = useState(1.05);
  const [typeMax, setTypeMax] = useState(2);
  const [containerWidth, setContainerWidth] = useState(480);
  const [containerSwitch, setContainerSwitch] = useState(520);
  const selectedDefinition = RESPONSIVE_DEFINITIONS[selectedDefinitionKey] ?? null;

  const activeColumns = useMemo(() => {
    if (canvasWidth >= lgBreakpoint) {
      return largeCols;
    }

    if (canvasWidth >= smBreakpoint) {
      return mediumCols;
    }

    return smallCols;
  }, [canvasWidth, lgBreakpoint, largeCols, mediumCols, smBreakpoint, smallCols]);

  const canvasLabel = useMemo(() => {
    if (canvasWidth >= lgBreakpoint) {
      return 'Large breakpoint active';
    }

    if (canvasWidth >= smBreakpoint) {
      return 'Medium breakpoint active';
    }

    return 'Small breakpoint active';
  }, [canvasWidth, lgBreakpoint, smBreakpoint]);

  const cssOutput = useMemo(() => {
    const fluidType = `clamp(${typeMin.toFixed(2)}rem, 1.1vw + 0.9rem, ${typeMax.toFixed(2)}rem)`;

    return [
      '.dashboard {',
      `  display: grid;`,
      `  gap: ${gap}px;`,
      `  grid-template-columns: repeat(${smallCols}, minmax(0, 1fr));`,
      '}',
      '',
      `@media (min-width: ${smBreakpoint}px) {`,
      '  .dashboard {',
      `    grid-template-columns: repeat(${mediumCols}, minmax(0, 1fr));`,
      '  }',
      '}',
      '',
      `@media (min-width: ${lgBreakpoint}px) {`,
      '  .dashboard {',
      `    grid-template-columns: repeat(${largeCols}, minmax(0, 1fr));`,
      '  }',
      '}',
      '',
      '.dashboard-title {',
      `  font-size: ${fluidType};`,
      '}',
      '',
      '.feature-shell {',
      '  container-type: inline-size;',
      '}',
      '',
      `@container (min-width: ${containerSwitch}px) {`,
      '  .feature-card {',
      '    flex-direction: row;',
      '    align-items: center;',
      '  }',
      '}',
    ].join('\n');
  }, [gap, largeCols, lgBreakpoint, mediumCols, smBreakpoint, smallCols, typeMax, typeMin, containerSwitch]);

  return (
    <div className="overflow-y-auto xl:overflow-hidden xl:h-full xl:flex xl:flex-col">
      <div className="p-3 sm:p-4 flex flex-col gap-4 xl:flex-1 xl:min-h-0 xl:grid xl:grid-cols-[24rem_minmax(0,1fr)_26rem] xl:grid-rows-[1fr_auto]">
        <aside className="xl:w-[24rem] xl:flex-shrink-0 bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 flex flex-col gap-5 xl:overflow-y-auto">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
              Simulated viewport - <span className="text-[var(--accent-strong)]">{canvasWidth}px</span>
            </div>
            <input
              type="range"
              min="320"
              max="1400"
              step="10"
              value={canvasWidth}
              onChange={(event) => {
                setSelectedDefinitionKey('media-queries');
                setCanvasWidth(Number(event.target.value));
              }}
              className="w-full accent-[var(--accent)]"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>320px</span>
              <span>1400px</span>
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
              Gap - <span className="text-[var(--accent-strong)]">{gap}px</span>
            </div>
            <input
              type="range"
              min="8"
              max="40"
              step="2"
              value={gap}
              onChange={(event) => {
                setSelectedDefinitionKey('media-queries');
                setGap(Number(event.target.value));
              }}
              className="w-full accent-[var(--accent)]"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>8px</span>
              <span>40px</span>
            </div>
          </div>

          <ControlGroup label="Small breakpoint columns">
            <div className="flex flex-wrap gap-1.5 w-full">
              {SM_PRESET.map((preset) => (
                <ControlButton
                  key={preset.value}
                  active={smallCols === preset.value}
                  onClick={() => {
                    setSelectedDefinitionKey('media-queries');
                    setSmallCols(preset.value);
                  }}
                  label={preset.label}
                />
              ))}
            </div>
          </ControlGroup>

          <ControlGroup label="Medium breakpoint columns">
            <div className="flex flex-wrap gap-1.5 w-full">
              {MD_PRESET.map((preset) => (
                <ControlButton
                  key={preset.value}
                  active={mediumCols === preset.value}
                  onClick={() => {
                    setSelectedDefinitionKey('media-queries');
                    setMediumCols(preset.value);
                  }}
                  label={preset.label}
                />
              ))}
            </div>
          </ControlGroup>

          <ControlGroup label="Large breakpoint columns">
            <div className="flex flex-wrap gap-1.5 w-full">
              {LG_PRESET.map((preset) => (
                <ControlButton
                  key={preset.value}
                  active={largeCols === preset.value}
                  onClick={() => {
                    setSelectedDefinitionKey('media-queries');
                    setLargeCols(preset.value);
                  }}
                  label={preset.label}
                />
              ))}
            </div>
          </ControlGroup>

          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
              Small breakpoint - <span className="text-[var(--accent-strong)]">{smBreakpoint}px</span>
            </div>
            <input
              type="range"
              min="480"
              max="900"
              step="10"
              value={smBreakpoint}
              onChange={(event) => {
                setSelectedDefinitionKey('media-queries');
                const next = Number(event.target.value);
                setSmBreakpoint(next);
                if (next >= lgBreakpoint) {
                  setLgBreakpoint(next + 120);
                }
              }}
              className="w-full accent-[var(--accent)]"
            />
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
              Large breakpoint - <span className="text-[var(--accent-strong)]">{lgBreakpoint}px</span>
            </div>
            <input
              type="range"
              min="760"
              max="1300"
              step="10"
              value={lgBreakpoint}
              onChange={(event) => {
                setSelectedDefinitionKey('media-queries');
                const next = Number(event.target.value);
                setLgBreakpoint(next);
                if (next <= smBreakpoint) {
                  setSmBreakpoint(Math.max(480, next - 120));
                }
              }}
              className="w-full accent-[var(--accent)]"
            />
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
              Clamp min - <span className="text-[var(--accent-strong)]">{typeMin.toFixed(2)}rem</span>
            </div>
            <input
              type="range"
              min="0.8"
              max="1.5"
              step="0.05"
              value={typeMin}
              onChange={(event) => {
                setSelectedDefinitionKey('fluid-type');
                const next = Number(event.target.value);
                setTypeMin(next);
                if (next > typeMax) {
                  setTypeMax(next);
                }
              }}
              className="w-full accent-[var(--accent)]"
            />
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
              Clamp max - <span className="text-[var(--accent-strong)]">{typeMax.toFixed(2)}rem</span>
            </div>
            <input
              type="range"
              min="1.4"
              max="3"
              step="0.05"
              value={typeMax}
              onChange={(event) => {
                setSelectedDefinitionKey('fluid-type');
                const next = Number(event.target.value);
                setTypeMax(next);
                if (next < typeMin) {
                  setTypeMin(next);
                }
              }}
              className="w-full accent-[var(--accent)]"
            />
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
              Container width - <span className="text-[var(--accent-strong)]">{containerWidth}px</span>
            </div>
            <input
              type="range"
              min="260"
              max="760"
              step="10"
              value={containerWidth}
              onChange={(event) => {
                setSelectedDefinitionKey('container-queries');
                setContainerWidth(Number(event.target.value));
              }}
              className="w-full accent-[var(--accent)]"
            />
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
              Container switch - <span className="text-[var(--accent-strong)]">{containerSwitch}px</span>
            </div>
            <input
              type="range"
              min="320"
              max="680"
              step="10"
              value={containerSwitch}
              onChange={(event) => {
                setSelectedDefinitionKey('container-queries');
                setContainerSwitch(Number(event.target.value));
              }}
              className="w-full accent-[var(--accent)]"
            />
          </div>

          <ControlGroup label="Definition focus">
            <div className="flex flex-wrap gap-1.5 w-full">
              <ControlButton
                active={selectedDefinitionKey === 'media-queries'}
                onClick={() => setSelectedDefinitionKey('media-queries')}
                label="Media Queries"
              />
              <ControlButton
                active={selectedDefinitionKey === 'container-queries'}
                onClick={() => setSelectedDefinitionKey('container-queries')}
                label="Container Queries"
              />
              <ControlButton
                active={selectedDefinitionKey === 'fluid-type'}
                onClick={() => setSelectedDefinitionKey('fluid-type')}
                label="clamp()"
              />
            </div>
          </ControlGroup>
        </aside>

        <div className="flex-1 xl:min-h-0 min-w-0 flex flex-col gap-4">
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 flex flex-col gap-4 xl:flex-1 xl:min-h-0 overflow-auto">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gray-400">Responsive design and queries</div>
              <p className="mt-1 text-sm text-[var(--muted)]">Tune breakpoints, fluid type, and container query behavior in a single playground.</p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-[var(--surface-2)] p-3">
              <div className="flex items-center justify-between gap-3 text-xs text-[var(--muted)] font-semibold uppercase tracking-[0.14em]">
                <span>Media query canvas</span>
                <span>{canvasLabel}</span>
              </div>
              <div className="mt-3 overflow-auto">
                <div
                  className="rounded-xl border border-[var(--divider)] bg-white p-3 sm:p-4 transition-all"
                  style={{ width: `${canvasWidth}px`, maxWidth: '100%' }}
                >
                  <div
                    className="font-semibold text-[var(--text-strong)]"
                    style={{ fontSize: `clamp(${typeMin.toFixed(2)}rem, 1.1vw + 0.9rem, ${typeMax.toFixed(2)}rem)` }}
                  >
                    Team Dashboard
                  </div>
                  <div className="mt-3 grid" style={{ gap: `${gap}px`, gridTemplateColumns: `repeat(${activeColumns}, minmax(0, 1fr))` }}>
                    {CARDS.map((card) => (
                      <article key={card.title} className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
                        <div className="text-xs text-[var(--muted)] uppercase tracking-[0.12em]">{card.title}</div>
                        <div className="mt-1 text-lg font-semibold text-[var(--text-strong)]">{card.value}</div>
                        <div className="text-xs text-emerald-600 font-semibold">{card.delta}</div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-[var(--surface-2)] p-3">
              <div className="flex items-center justify-between gap-3 text-xs text-[var(--muted)] font-semibold uppercase tracking-[0.14em]">
                <span>Container query card</span>
                <span>{containerWidth >= containerSwitch ? 'Expanded layout' : 'Stacked layout'}</span>
              </div>
              <div className="mt-3 overflow-auto">
                <div style={{ width: `${containerWidth}px`, maxWidth: '100%' }} className="responsive-cq-shell rounded-xl border border-[var(--divider)] bg-white p-3">
                  <div className="responsive-cq-card flex flex-col gap-3 rounded-lg border border-gray-200 bg-white p-3">
                    <div className="responsive-cq-thumb h-24 rounded-lg bg-gradient-to-br from-indigo-200 via-violet-200 to-fuchsia-200" />
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-[var(--text-strong)]">Container aware module</div>
                      <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
                        The card stacks in narrow containers and shifts to a horizontal composition when the parent has enough inline space.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="min-h-[18rem] xl:h-72 xl:flex-shrink-0 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            <CssOutput cssOutput={cssOutput} className="h-full" />
          </div>
        </div>

        <div className="min-h-[20rem] xl:h-full overflow-y-auto">
          <PropertyDefinitionPanel definition={selectedDefinition} mode="grid" />
        </div>
      </div>

      <style>
        {`
          .responsive-cq-shell {
            container-type: inline-size;
          }

          @container (min-width: ${containerSwitch}px) {
            .responsive-cq-card {
              flex-direction: row;
              align-items: center;
            }

            .responsive-cq-thumb {
              width: 36%;
              height: 7.5rem;
              flex-shrink: 0;
            }
          }
        `}
      </style>
    </div>
  );
}
