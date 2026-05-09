import { useMemo, useState } from 'react';
import { ControlButton, ControlGroup } from '../components/ControlPanel/ControlButton';
import CssOutput from '../components/CssOutput/CssOutput';
import PropertyDefinitionPanel from '../components/PropertyDefinitionPanel';
import { SIZING_DEFINITIONS } from '../data/sizing-definitions';

const RATIO_PRESETS = ['1 / 1', '4 / 3', '16 / 9', '21 / 9'];
const OBJECT_FIT_MODES = ['cover', 'contain'];
const TRACK_PRESETS = [120, 160, 220, 280];

const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 960 540'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0' stop-color='%23e5e7eb'/%3E%3Cstop offset='0.5' stop-color='%23d4d4d8'/%3E%3Cstop offset='1' stop-color='%23c4c7cf'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='960' height='540' fill='url(%23g)'/%3E%3Ccircle cx='190' cy='110' r='76' fill='%23ffffff' fill-opacity='0.36'/%3E%3Ccircle cx='760' cy='440' r='95' fill='%23ffffff' fill-opacity='0.28'/%3E%3Crect x='280' y='170' width='420' height='200' rx='30' fill='%23ffffff' fill-opacity='0.5'/%3E%3C/svg%3E";

const DEFAULTS = { fitLimit: 280, minTrack: 180, ratio: '16 / 9', objectFit: 'cover', canvasWidth: 920 };

export default function SizingIntrinsicPage() {
  const [selectedDefinitionKey, setSelectedDefinitionKey] = useState('intrinsic-width');
  const [canvasWidth, setCanvasWidth] = useState(DEFAULTS.canvasWidth);
  const [fitLimit, setFitLimit] = useState(DEFAULTS.fitLimit);
  const [minTrack, setMinTrack] = useState(DEFAULTS.minTrack);
  const [ratio, setRatio] = useState(DEFAULTS.ratio);
  const [objectFit, setObjectFit] = useState(DEFAULTS.objectFit);
  const selectedDefinition = SIZING_DEFINITIONS[selectedDefinitionKey] ?? null;

  function onReset() {
    setCanvasWidth(DEFAULTS.canvasWidth);
    setFitLimit(DEFAULTS.fitLimit);
    setMinTrack(DEFAULTS.minTrack);
    setRatio(DEFAULTS.ratio);
    setObjectFit(DEFAULTS.objectFit);
    setSelectedDefinitionKey('intrinsic-width');
  }

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
    <div className="p-3 sm:p-4 flex flex-col gap-4 xl:grid xl:grid-cols-[24rem_minmax(0,1.1fr)_28rem] xl:items-start">

        {/* ── Left sidebar ── */}
        <aside className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 flex flex-col gap-5 min-w-0">

          {/* Canvas width — shared slider */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
              Canvas width — <span className="text-[var(--accent-strong)]">{canvasWidth}px</span>
            </div>
            <input
              type="range"
              min="320"
              max="1400"
              step="10"
              value={canvasWidth}
              onChange={(event) => setCanvasWidth(Number(event.target.value))}
              className="w-full accent-[var(--accent)]"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>320px</span>
              <span>1400px</span>
            </div>
          </div>

          {/* ── Intrinsic Width ── */}
          <div className="flex flex-col gap-3">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent-strong)] border-b border-gray-100 pb-1">
              Intrinsic Width
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
                fit-content limit — <span className="text-[var(--accent-strong)]">{fitLimit}px</span>
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
          </div>

          {/* ── Grid Tracks ── */}
          <div className="flex flex-col gap-3">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent-strong)] border-b border-gray-100 pb-1">
              Grid Tracks
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
          </div>

          {/* ── Media Frame ── */}
          <div className="flex flex-col gap-3">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent-strong)] border-b border-gray-100 pb-1">
              Media Frame
            </div>
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
          </div>
        </aside>

        {/* ── Main preview area ── */}
        <div className="min-w-0 flex flex-col gap-4">
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 flex flex-col gap-4">

            {/* Intrinsic Width */}
            <div className="rounded-xl border border-[var(--border-strong)] bg-white p-3 shadow-sm">
              <div className="flex items-baseline justify-between mb-3">
                <div className="text-xs text-[var(--muted)] font-semibold uppercase tracking-[0.14em]">Intrinsic Width</div>
                <span className="text-xs font-mono text-[var(--accent-strong)]">fit-content({fitLimit}px)</span>
              </div>
              <div className="overflow-auto">
                <div className="rounded-lg border border-[var(--divider)] bg-[var(--surface-2)] p-3" style={{ width: `${canvasWidth}px` }}>
                  <div className="flex flex-col gap-3 min-w-max">
                    <div className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm" style={{ width: 'min-content' }}>
                      <span className="font-semibold text-[var(--text-strong)]" >min-content</span>
                      <div className="text-xs text-[var(--muted)] mt-1">supercalifragilisticexpialidocious</div>
                    </div>
                    <div className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm" style={{ width: 'max-content' }}>
                      <span className="font-semibold text-[var(--text-strong)]" >max-content</span>
                      <div className="text-xs text-[var(--muted)] mt-1">intrinsic sizing keeps components resilient</div>
                    </div>
                    <div className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm" style={{ width: `fit-content(${fitLimit}px)` }}>
                      <span className="font-semibold text-[var(--text-strong)]" >fit-content({fitLimit}px)</span>
                      <div className="text-xs text-[var(--muted)] mt-1">clamped to your chosen limit</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Auto-fit Grid */}
            <div className="rounded-xl border border-[var(--border-strong)] bg-white p-3 shadow-sm">
              <div className="flex items-baseline justify-between mb-3">
                <div className="text-xs text-[var(--muted)] font-semibold uppercase tracking-[0.14em]">Auto-fit Grid</div>
                <span className="text-xs font-mono text-[var(--accent-strong)]">minmax({minTrack}px, 1fr)</span>
              </div>
              <div className="overflow-auto">
                <div className="rounded-lg border border-[var(--divider)] bg-[var(--surface-2)] p-3" style={{ width: `${canvasWidth}px` }}>
                  <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(auto-fit, minmax(${minTrack}px, 1fr))` }}>
                    {Array.from({ length: 6 }).map((_, index) => (
                      <div key={index} className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
                        <div className="text-xs text-[var(--muted)] uppercase tracking-[0.12em]">Card {index + 1}</div>
                        <div className="mt-1 text-sm font-semibold text-[var(--text-strong)]">minmax({minTrack}px, 1fr)</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Aspect Ratio */}
            <div className="rounded-xl border border-[var(--border-strong)] bg-white p-3 shadow-sm">
              <div className="flex items-baseline justify-between mb-3">
                <div className="text-xs text-[var(--muted)] font-semibold uppercase tracking-[0.14em]">Aspect Ratio</div>
                <span className="text-xs font-mono text-[var(--accent-strong)]">{ratio} · {objectFit}</span>
              </div>
              <div className="rounded-lg border border-[var(--divider)] bg-[var(--surface-2)] p-3">
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
            <CssOutput cssOutput={cssOutput} className="h-full" onReset={onReset} />
          </div>
        </div>

        <div className="min-h-[20rem] min-w-0">
          <PropertyDefinitionPanel definition={selectedDefinition} mode="grid" />
        </div>
    </div>
  );
}

