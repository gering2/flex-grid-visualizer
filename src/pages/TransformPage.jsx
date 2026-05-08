import { useMemo, useState } from 'react';
import { ControlButton, ControlGroup } from '../components/ControlPanel/ControlButton';
import CssOutput from '../components/CssOutput/CssOutput';
import PropertyDefinitionPanel from '../components/PropertyDefinitionPanel';
import { TRANSFORM_DEFINITIONS } from '../data/transform-definitions';

const ORIGIN_OPTIONS = [
  { label: 'Center', value: '50% 50%' },
  { label: 'Top Left', value: '0% 0%' },
  { label: 'Top Right', value: '100% 0%' },
  { label: 'Bottom Left', value: '0% 100%' },
  { label: 'Bottom Right', value: '100% 100%' },
];

const ORDER_OPTIONS = [
  {
    key: 'translate-rotate-scale-skew',
    label: 'Move -> Rotate -> Scale',
    detail: 'translate -> rotate -> scale -> skew',
    build: ({ translateX, translateY, rotate, scale, skewX, skewY }) =>
      `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg) scale(${scale.toFixed(2)}) skew(${skewX}deg, ${skewY}deg)`,
  },
  {
    key: 'scale-rotate-translate-skew',
    label: 'Scale -> Rotate -> Move',
    detail: 'scale -> rotate -> translate -> skew',
    build: ({ translateX, translateY, rotate, scale, skewX, skewY }) =>
      `scale(${scale.toFixed(2)}) rotate(${rotate}deg) translate(${translateX}px, ${translateY}px) skew(${skewX}deg, ${skewY}deg)`,
  },
];

export default function TransformPage() {
  const [selectedDefinitionKey, setSelectedDefinitionKey] = useState('transform');
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [rotate, setRotate] = useState(0);
  const [scale, setScale] = useState(1);
  const [skewX, setSkewX] = useState(0);
  const [skewY, setSkewY] = useState(0);
  const [origin, setOrigin] = useState('50% 50%');
  const [order, setOrder] = useState(ORDER_OPTIONS[0].key);
  const selectedDefinition = TRANSFORM_DEFINITIONS[selectedDefinitionKey] ?? null;
  const orderConfig = ORDER_OPTIONS.find((option) => option.key === order) ?? ORDER_OPTIONS[0];

  const transformValue = useMemo(() => {
    return orderConfig.build({ translateX, translateY, rotate, scale, skewX, skewY });
  }, [orderConfig, rotate, scale, skewX, skewY, translateX, translateY]);

  const cssOutput = useMemo(() => {
    return [
      '.transform-card {',
      `  transform-origin: ${origin};`,
      `  transform: ${transformValue};`,
      '}',
    ].join('\n');
  }, [origin, transformValue]);

  const onReset = () => {
    setSelectedDefinitionKey('transform');
    setTranslateX(0);
    setTranslateY(0);
    setRotate(0);
    setScale(1);
    setSkewX(0);
    setSkewY(0);
    setOrigin('50% 50%');
    setOrder(ORDER_OPTIONS[0].key);
  };

  return (
    <div className="overflow-y-auto xl:overflow-hidden xl:h-full xl:flex xl:flex-col">
      <div className="p-3 sm:p-4 flex flex-col gap-4 lg:grid lg:grid-cols-[21rem_minmax(0,1fr)] lg:auto-rows-auto xl:flex-1 xl:min-h-0 xl:grid-cols-[21rem_minmax(0,1.35fr)_19rem] xl:grid-rows-[1fr_auto]">
        <aside className="xl:w-[21rem] xl:flex-shrink-0 bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 flex flex-col gap-5 xl:overflow-y-auto">
          <section className="control-section space-y-4">
            <div>
              <div className="control-section-kicker">Transform Stack</div>
              <p className="mt-1 text-xs text-[var(--muted)]">Combine translate, rotate, scale, and skew to see how transform functions compose in order.</p>
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
                Translate X - <span className="text-[var(--accent-strong)]">{translateX}px</span>
              </div>
              <input
                type="range"
                min="-120"
                max="120"
                step="2"
                value={translateX}
                onChange={(event) => {
                  setSelectedDefinitionKey('translate');
                  setTranslateX(Number(event.target.value));
                }}
                className="w-full accent-[var(--accent)]"
              />
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
                Translate Y - <span className="text-[var(--accent-strong)]">{translateY}px</span>
              </div>
              <input
                type="range"
                min="-120"
                max="120"
                step="2"
                value={translateY}
                onChange={(event) => {
                  setSelectedDefinitionKey('translate');
                  setTranslateY(Number(event.target.value));
                }}
                className="w-full accent-[var(--accent)]"
              />
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
                Rotate - <span className="text-[var(--accent-strong)]">{rotate}deg</span>
              </div>
              <input
                type="range"
                min="-180"
                max="180"
                step="2"
                value={rotate}
                onChange={(event) => {
                  setSelectedDefinitionKey('rotate');
                  setRotate(Number(event.target.value));
                }}
                className="w-full accent-[var(--accent)]"
              />
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
                Scale - <span className="text-[var(--accent-strong)]">{scale.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="1.8"
                step="0.01"
                value={scale}
                onChange={(event) => {
                  setSelectedDefinitionKey('scale');
                  setScale(Number(event.target.value));
                }}
                className="w-full accent-[var(--accent)]"
              />
            </div>
          </section>

          <section className="control-section space-y-4">
            <div>
              <div className="control-section-kicker">Shear and Origin</div>
              <p className="mt-1 text-xs text-[var(--muted)]">Skew exaggerates the matrix effect, and transform-origin reveals where rotation and scale pivot from.</p>
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
                Skew X - <span className="text-[var(--accent-strong)]">{skewX}deg</span>
              </div>
              <input
                type="range"
                min="-30"
                max="30"
                step="1"
                value={skewX}
                onChange={(event) => {
                  setSelectedDefinitionKey('skew');
                  setSkewX(Number(event.target.value));
                }}
                className="w-full accent-[var(--accent)]"
              />
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
                Skew Y - <span className="text-[var(--accent-strong)]">{skewY}deg</span>
              </div>
              <input
                type="range"
                min="-30"
                max="30"
                step="1"
                value={skewY}
                onChange={(event) => {
                  setSelectedDefinitionKey('skew');
                  setSkewY(Number(event.target.value));
                }}
                className="w-full accent-[var(--accent)]"
              />
            </div>

            <ControlGroup label="Transform Origin">
              <div className="flex flex-wrap gap-1.5 w-full">
                {ORIGIN_OPTIONS.map((option) => (
                  <ControlButton
                    key={option.value}
                    active={origin === option.value}
                    onClick={() => {
                      setSelectedDefinitionKey('transform-origin');
                      setOrigin(option.value);
                    }}
                    label={option.label}
                  />
                ))}
              </div>
            </ControlGroup>

            <ControlGroup label="Function Order">
              <div className="flex flex-wrap gap-1.5 w-full">
                {ORDER_OPTIONS.map((option) => (
                  <ControlButton
                    key={option.key}
                    active={order === option.key}
                    onClick={() => {
                      setSelectedDefinitionKey('transform');
                      setOrder(option.key);
                    }}
                    label={option.label}
                  />
                ))}
              </div>
            </ControlGroup>
            <p className="text-[11px] leading-5 text-[var(--muted)]">Current sequence: {orderConfig.detail}. CSS applies functions from right to left, so order changes the final geometry.</p>
          </section>
        </aside>

        <div className="flex-1 xl:min-h-0 min-w-0 flex flex-col gap-4">
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 flex flex-col gap-4 xl:flex-1 xl:min-h-0 overflow-auto">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gray-400">Transforms</div>
              <p className="mt-1 text-sm text-[var(--muted)]">The dashed outline shows the untransformed box. The colored card is the painted result after the full transform stack runs in order.</p>
            </div>

            <div className="rounded-xl border border-gray-200 bg-[var(--surface-2)] p-3 sm:p-4 xl:flex-1 xl:min-h-0">
              <div className="flex items-center justify-between gap-3 text-xs text-[var(--muted)] font-semibold uppercase tracking-[0.14em]">
                <span>Transform canvas</span>
                <span>{orderConfig.label}</span>
              </div>
              <div className="mt-2 rounded-lg border border-[var(--divider)] bg-white px-3 py-2 text-[11px] font-mono text-[var(--muted)] break-words">{transformValue}</div>

              <div className="mt-4 rounded-xl border border-[var(--divider)] bg-white p-4 sm:p-6 min-h-[20rem] flex items-center justify-center overflow-hidden">
                <div className="transform-stage-grid">
                  <div className="transform-baseline" />
                  <div
                    className="transform-card"
                    style={{
                      transformOrigin: origin,
                      transform: transformValue,
                    }}
                  >
                    <span className="transform-card-kicker">transform</span>
                    <span className="transform-card-title">Painted result</span>
                  </div>
                  <div
                    className="transform-origin-dot"
                    style={{
                      left: origin.includes('0%') ? '0%' : origin.includes('100%') ? '100%' : '50%',
                      top: origin.endsWith('0%') ? '0%' : origin.endsWith('100%') ? '100%' : '50%',
                    }}
                  />
                </div>
              </div>
            </div>
          </section>

          <div className="min-h-[18rem] xl:h-72 xl:flex-shrink-0 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            <CssOutput cssOutput={cssOutput} className="h-full" onReset={onReset} />
          </div>
        </div>

        <div className="min-h-[20rem] lg:col-span-2 xl:col-span-1 xl:h-full overflow-y-auto">
          <PropertyDefinitionPanel definition={selectedDefinition} mode="grid" />
        </div>
      </div>

      <style>
        {`
          .transform-stage-grid {
            position: relative;
            width: min(100%, 32rem);
            min-height: 18rem;
            display: grid;
            place-items: center;
            border-radius: 1.25rem;
            border: 1px dashed rgba(148, 163, 184, 0.5);
            background:
              linear-gradient(rgba(226, 232, 240, 0.8) 1px, transparent 1px),
              linear-gradient(90deg, rgba(226, 232, 240, 0.8) 1px, transparent 1px),
              linear-gradient(180deg, rgba(248, 250, 252, 0.96), rgba(241, 245, 249, 0.92));
            background-size: 2.25rem 2.25rem, 2.25rem 2.25rem, auto;
            overflow: visible;
          }

          .transform-baseline {
            width: 8.5rem;
            height: 8.5rem;
            border-radius: 1.5rem;
            border: 2px dashed rgba(99, 102, 241, 0.32);
            background: rgba(99, 102, 241, 0.05);
            grid-area: 1 / 1;
          }

          .transform-card {
            width: 8.5rem;
            height: 8.5rem;
            border-radius: 1.5rem;
            background: linear-gradient(135deg, #f59e0b, #ef4444);
            color: white;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 0.35rem;
            text-align: center;
            box-shadow: 0 24px 36px rgba(239, 68, 68, 0.22);
            grid-area: 1 / 1;
            transition: transform 180ms ease-out;
          }

          .transform-origin-dot {
            position: absolute;
            width: 0.8rem;
            height: 0.8rem;
            border-radius: 999px;
            background: #111827;
            border: 2px solid white;
            box-shadow: 0 4px 12px rgba(15, 23, 42, 0.18);
            transform: translate(-50%, -50%);
          }

          .transform-card-kicker {
            font-size: 0.68rem;
            font-weight: 700;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            opacity: 0.76;
          }

          .transform-card-title {
            font-size: 1rem;
            font-weight: 700;
            letter-spacing: -0.02em;
          }
        `}
      </style>
    </div>
  );
}