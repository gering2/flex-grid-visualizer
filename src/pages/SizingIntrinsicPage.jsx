import { useMemo, useState } from 'react';
import { ControlButton, ControlGroup } from '../components/ControlPanel/ControlButton';
import CssOutput from '../components/CssOutput/CssOutput';
import PropertyDefinitionPanel from '../components/PropertyDefinitionPanel';
import { SIZING_DEFINITIONS } from '../data/sizing-definitions';

const RATIO_PRESETS = ['1 / 1', '4 / 3', '16 / 9', '21 / 9'];
const OBJECT_FIT_MODES = ['cover', 'contain'];
const TRACK_PRESETS = [120, 160, 220, 280];

const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 960 540'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%2399f6e4'/%3E%3Cstop offset='0.5' stop-color='%23bfdbfe'/%3E%3Cstop offset='1' stop-color='%23fbcfe8'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='960' height='540' fill='url(%23g)'/%3E%3Ccircle cx='190' cy='110' r='76' fill='%23ffffff' fill-opacity='0.45'/%3E%3Ccircle cx='760' cy='440' r='95' fill='%23ffffff' fill-opacity='0.35'/%3E%3Crect x='280' y='170' width='420' height='200' rx='30' fill='%23ffffff' fill-opacity='0.6'/%3E%3C/svg%3E";

const DEMO_TEXT = 'intrinsic sizing keeps components resilient supercalifragilisticexpialidocious';

export default function SizingIntrinsicPage() {
  const [selectedDefinitionKey, setSelectedDefinitionKey] = useState('intrinsic-width');
  const [canvasWidth, setCanvasWidth] = useState(920);
  const [fitLimit, setFitLimit] = useState(280);
  const [minTrack, setMinTrack] = useState(180);
  const [ratio, setRatio] = useState('16 / 9');
  const [objectFit, setObjectFit] = useState('cover');
  const selectedDefinition = SIZING_DEFINITIONS[selectedDefinitionKey] ?? null;

  const cssOutput = useMemo(() => {
    return [
      '.chip-min-content {',
      '  width: min-content;',
      '}',
      '',
      '.chip-max-content {',
      '  width: max-content;',
      '}',
      '',
      '.chip-fit-content {',
      `  width: fit-content(${fitLimit}px);`,
      '}',
      '',
      '.gallery {',
      '  display: grid;',
      '  gap: 0.75rem;',
      `  grid-template-columns: repeat(auto-fit, minmax(${minTrack}px, 1fr));`,
      '}',
      '',
      '.media-frame {',
      `  aspect-ratio: ${ratio};`,
      '}',
      '',
      '.media-frame img {',
      `  object-fit: ${objectFit};`,
      '  width: 100%;',
      '  height: 100%;',
      '}',
    ].join('\n');
  }, [fitLimit, minTrack, objectFit, ratio]);

  return (
    <div className="overflow-y-auto xl:overflow-hidden xl:h-full xl:flex xl:flex-col">
      <div className="p-3 sm:p-4 flex flex-col gap-4 xl:flex-1 xl:min-h-0 xl:grid xl:grid-cols-[24rem_minmax(0,1fr)_26rem] xl:grid-rows-[1fr_auto]">
        <aside className="xl:w-[24rem] xl:flex-shrink-0 bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 flex flex-col gap-5 xl:overflow-y-auto">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
              Canvas width - <span className="text-[var(--accent-strong)]">{canvasWidth}px</span>
            </div>
            <input
              type="range"
              min="320"
              max="1400"
              step="10"
              value={canvasWidth}
              onChange={(event) => {
                setSelectedDefinitionKey('intrinsic-width');
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
              fit-content limit - <span className="text-[var(--accent-strong)]">{fitLimit}px</span>
            </div>
            <input
              type="range"
              min="140"
              max="420"
              step="10"
              value={fitLimit}
              onChange={(event) => {
                setSelectedDefinitionKey('intrinsic-width');
                setFitLimit(Number(event.target.value));
              }}
              className="w-full accent-[var(--accent)]"
            />
          </div>

          <ControlGroup label="minmax track floor">
            <div className="flex flex-wrap gap-1.5 w-full">
              {TRACK_PRESETS.map((value) => (
                <ControlButton
                  key={value}
                  active={minTrack === value}
                  onClick={() => {
                    setSelectedDefinitionKey('auto-fit-minmax');
                    setMinTrack(value);
                  }}
                  label={`${value}px`}
                />
              ))}
            </div>
          </ControlGroup>

          <ControlGroup label="Aspect ratio">
            <div className="flex flex-wrap gap-1.5 w-full">
              {RATIO_PRESETS.map((preset) => (
                <ControlButton
                  key={preset}
                  active={ratio === preset}
                  onClick={() => {
                    setSelectedDefinitionKey('ratio-object-fit');
                    setRatio(preset);
                  }}
                  label={preset}
                />
              ))}
            </div>
          </ControlGroup>

          <ControlGroup label="Object fit">
            <div className="flex flex-wrap gap-1.5 w-full">
              {OBJECT_FIT_MODES.map((mode) => (
                <ControlButton
                  key={mode}
                  active={objectFit === mode}
                  onClick={() => {
                    setSelectedDefinitionKey('ratio-object-fit');
                    setObjectFit(mode);
                  }}
                  label={mode}
                />
              ))}
            </div>
          </ControlGroup>

          <ControlGroup label="Definition focus">
            <div className="flex flex-wrap gap-1.5 w-full">
              <ControlButton
                active={selectedDefinitionKey === 'intrinsic-width'}
                onClick={() => setSelectedDefinitionKey('intrinsic-width')}
                label="Intrinsic Width"
              />
              <ControlButton
                active={selectedDefinitionKey === 'auto-fit-minmax'}
                onClick={() => setSelectedDefinitionKey('auto-fit-minmax')}
                label="auto-fit + minmax"
              />
              <ControlButton
                active={selectedDefinitionKey === 'ratio-object-fit'}
                onClick={() => setSelectedDefinitionKey('ratio-object-fit')}
                label="Aspect Ratio"
              />
            </div>
          </ControlGroup>
        </aside>

        <div className="flex-1 xl:min-h-0 min-w-0 flex flex-col gap-4">
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 flex flex-col gap-4 xl:flex-1 xl:min-h-0 overflow-auto">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gray-400">Sizing and intrinsic layout</div>
              <p className="mt-1 text-sm text-[var(--muted)]">Explore min-content, max-content, fit-content, auto-fit grids, and aspect-ratio media frames.</p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-[var(--surface-2)] p-3">
              <div className="text-xs text-[var(--muted)] font-semibold uppercase tracking-[0.14em]">Intrinsic width keywords</div>
              <div className="mt-3 overflow-auto">
                <div className="rounded-lg border border-[var(--divider)] bg-white p-3" style={{ width: `${canvasWidth}px`, maxWidth: '100%' }}>
                  <div className="flex flex-col gap-3 min-w-max">
                    <div className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm" style={{ width: 'min-content' }}>
                      <span className="font-semibold text-[var(--text-strong)]">min-content</span>
                      <div className="text-xs text-[var(--muted)] mt-1">{DEMO_TEXT}</div>
                    </div>
                    <div className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm" style={{ width: 'max-content' }}>
                      <span className="font-semibold text-[var(--text-strong)]">max-content</span>
                      <div className="text-xs text-[var(--muted)] mt-1">{DEMO_TEXT}</div>
                    </div>
                    <div className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm" style={{ width: `fit-content(${fitLimit}px)` }}>
                      <span className="font-semibold text-[var(--text-strong)]">fit-content({fitLimit}px)</span>
                      <div className="text-xs text-[var(--muted)] mt-1">{DEMO_TEXT}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-[var(--surface-2)] p-3">
              <div className="text-xs text-[var(--muted)] font-semibold uppercase tracking-[0.14em]">auto-fit + minmax grid</div>
              <div className="mt-3 overflow-auto">
                <div className="rounded-lg border border-[var(--divider)] bg-white p-3" style={{ width: `${canvasWidth}px`, maxWidth: '100%' }}>
                  <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(auto-fit, minmax(${minTrack}px, 1fr))` }}>
                    {Array.from({ length: 8 }).map((_, index) => (
                      <div key={index} className="rounded-lg border border-gray-200 bg-gradient-to-br from-cyan-50 to-indigo-50 p-3">
                        <div className="text-xs text-[var(--muted)] uppercase tracking-[0.12em]">Card {index + 1}</div>
                        <div className="mt-1 text-sm font-semibold text-[var(--text-strong)]">minmax({minTrack}px, 1fr)</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-[var(--surface-2)] p-3">
              <div className="text-xs text-[var(--muted)] font-semibold uppercase tracking-[0.14em]">Aspect ratio media frame</div>
              <div className="mt-3 rounded-lg border border-[var(--divider)] bg-white p-3">
                <div className="w-full max-w-[32rem] overflow-hidden rounded-lg border border-gray-200" style={{ aspectRatio: ratio }}>
                  <img
                    src={PLACEHOLDER_IMAGE}
                    alt="Intrinsic sizing demo"
                    className="h-full w-full"
                    style={{ objectFit }}
                  />
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
    </div>
  );
}
