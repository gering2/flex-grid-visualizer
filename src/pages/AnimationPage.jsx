import { useMemo, useState } from 'react';
import { ControlButton, ControlGroup } from '../components/ControlPanel/ControlButton';
import CssOutput from '../components/CssOutput/CssOutput';
import PropertyDefinitionPanel from '../components/PropertyDefinitionPanel';
import { ANIMATION_DEFINITIONS } from '../data/animation-definitions';

const ANIMATION_PRESETS = {
  pulse: {
    label: 'Pulse',
    keyframeName: 'pulseCard',
    definitionKey: '@keyframes',
    keyframes: ({ startOpacity, peakOpacity }) => `@keyframes pulseCard {
  0%,
  100% {
    transform: scale(1);
    opacity: ${startOpacity};
    box-shadow: 0 12px 24px rgba(24, 24, 27, 0.16);
  }

  50% {
    transform: scale(1.08);
    opacity: ${peakOpacity};
    box-shadow: 0 16px 30px rgba(24, 24, 27, 0.22);
  }
}`,
  },
  drift: {
    label: 'Drift',
    keyframeName: 'driftCard',
    definitionKey: '@keyframes',
    keyframes: ({ startOpacity, peakOpacity }) => `@keyframes driftCard {
  0% {
    transform: translateX(-34px) rotate(-4deg);
    opacity: ${startOpacity};
  }

  60% {
    opacity: ${peakOpacity};
  }

  100% {
    transform: translateX(34px) rotate(4deg);
    opacity: ${peakOpacity};
  }
}`,
  },
  orbit: {
    label: 'Orbit',
    keyframeName: 'orbitCard',
    definitionKey: '@keyframes',
    keyframes: ({ startOpacity, peakOpacity }) => `@keyframes orbitCard {
  from {
    transform: rotate(0deg) translateX(64px) rotate(0deg);
    opacity: ${startOpacity};
  }

  to {
    transform: rotate(360deg) translateX(64px) rotate(-360deg);
    opacity: ${peakOpacity};
  }
}`,
  },
};

const TIMINGS = ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out', 'steps(4, end)'];
const DIRECTIONS = ['normal', 'reverse', 'alternate', 'alternate-reverse'];
const FILL_MODES = ['none', 'forwards', 'backwards', 'both'];
const ITERATION_OPTIONS = [1, 2, 3, 'infinite'];

const TIMING_LABELS = {
  linear: 'linear',
  ease: 'ease',
  'ease-in': 'ease-in',
  'ease-out': 'ease-out',
  'ease-in-out': 'ease-in-out',
  'steps(4, end)': 'steps(4)',
};

const DIRECTION_LABELS = {
  normal: 'normal',
  reverse: 'reverse',
  alternate: 'alternate',
  'alternate-reverse': 'alt-reverse',
};

export default function AnimationPage() {
  const [selectedDefinitionKey, setSelectedDefinitionKey] = useState('@keyframes');
  const [preset, setPreset] = useState('pulse');
  const [duration, setDuration] = useState(1200);
  const [delay, setDelay] = useState(0);
  const [timing, setTiming] = useState('ease-in-out');
  const [direction, setDirection] = useState('alternate');
  const [fillMode, setFillMode] = useState('both');
  const [iterationCount, setIterationCount] = useState('infinite');
  const [playState, setPlayState] = useState('running');
  const [startOpacity, setStartOpacity] = useState(0.45);
  const [peakOpacity, setPeakOpacity] = useState(1);
  const selectedDefinition = ANIMATION_DEFINITIONS[selectedDefinitionKey] ?? null;
  const presetConfig = ANIMATION_PRESETS[preset];
  const keyframes = presetConfig.keyframes({ startOpacity: startOpacity.toFixed(2), peakOpacity: peakOpacity.toFixed(2) });

  const animationValue = `${presetConfig.keyframeName} ${duration}ms ${timing} ${delay}ms ${iterationCount} ${direction} ${fillMode} ${playState}`;
  const animationSummary = `${presetConfig.label} · ${duration}ms · ${TIMING_LABELS[timing]} · ${iterationCount}x`;

  const cssOutput = useMemo(() => {
    return [
      keyframes,
      '',
      '.animation-card {',
      `  animation: ${animationValue};`,
      '}',
    ].join('\n');
  }, [animationValue, keyframes]);

  const onReset = () => {
    setSelectedDefinitionKey('@keyframes');
    setPreset('pulse');
    setDuration(1200);
    setDelay(0);
    setTiming('ease-in-out');
    setDirection('alternate');
    setFillMode('both');
    setIterationCount('infinite');
    setPlayState('running');
    setStartOpacity(0.45);
    setPeakOpacity(1);
  };

  return (
    <div className="overflow-y-auto xl:overflow-hidden xl:h-full p-3 sm:p-4 flex flex-col gap-4 lg:grid lg:grid-cols-[21rem_minmax(0,1fr)] lg:auto-rows-auto xl:min-h-0 xl:grid-cols-[21rem_minmax(0,1.2fr)_24rem] xl:grid-rows-[1fr_auto]">
      <aside className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 flex flex-col gap-5 min-w-0 xl:overflow-y-auto">
          <section className="control-section space-y-4">
            <div>
              <div className="control-section-kicker">Keyframes Lab</div>
              <p className="mt-1 text-xs text-[var(--muted)]">Build an animation from a timeline, then inspect the shorthand that drives it.</p>
            </div>

            <ControlGroup label="Animation Preset">
              <div className="flex flex-wrap gap-1.5 w-full">
                {Object.entries(ANIMATION_PRESETS).map(([key, option]) => (
                  <ControlButton
                    key={key}
                    active={preset === key}
                    onClick={() => {
                      setSelectedDefinitionKey(option.definitionKey);
                      setPreset(key);
                    }}
                    label={option.label}
                  />
                ))}
              </div>
            </ControlGroup>

            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
                Duration - <span className="text-[var(--accent-strong)]">{duration}ms</span>
              </div>
              <input
                type="range"
                min="300"
                max="4000"
                step="50"
                value={duration}
                onChange={(event) => {
                  setSelectedDefinitionKey('animation');
                  setDuration(Number(event.target.value));
                }}
                className="w-full accent-[var(--accent)]"
              />
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
                Delay - <span className="text-[var(--accent-strong)]">{delay}ms</span>
              </div>
              <input
                type="range"
                min="0"
                max="1200"
                step="50"
                value={delay}
                onChange={(event) => {
                  setSelectedDefinitionKey('animation');
                  setDelay(Number(event.target.value));
                }}
                className="w-full accent-[var(--accent)]"
              />
            </div>

            <ControlGroup label="Iteration Count">
              <div className="flex flex-wrap gap-1.5 w-full">
                {ITERATION_OPTIONS.map((option) => (
                  <ControlButton
                    key={option}
                    active={iterationCount === option}
                    onClick={() => {
                      setSelectedDefinitionKey('animation');
                      setIterationCount(option);
                    }}
                    label={String(option)}
                  />
                ))}
              </div>
            </ControlGroup>

            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
                Start opacity - <span className="text-[var(--accent-strong)]">{startOpacity.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1"
                step="0.05"
                value={startOpacity}
                onChange={(event) => {
                  setSelectedDefinitionKey('opacity');
                  const next = Number(event.target.value);
                  setStartOpacity(next);
                  if (next > peakOpacity) {
                    setPeakOpacity(next);
                  }
                }}
                className="w-full accent-[var(--accent)]"
              />
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
                Peak opacity - <span className="text-[var(--accent-strong)]">{peakOpacity.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="1"
                step="0.05"
                value={peakOpacity}
                onChange={(event) => {
                  setSelectedDefinitionKey('opacity');
                  const next = Number(event.target.value);
                  setPeakOpacity(next);
                  if (next < startOpacity) {
                    setStartOpacity(next);
                  }
                }}
                className="w-full accent-[var(--accent)]"
              />
            </div>
          </section>

          <section className="control-section space-y-4">
            <div>
              <div className="control-section-kicker">Playback Controls</div>
              <p className="mt-1 text-xs text-[var(--muted)]">Timing, direction, and fill mode change how the same keyframes feel.</p>
            </div>

            <ControlGroup label="Timing Function">
              <div className="flex flex-wrap gap-1.5 w-full">
                {TIMINGS.map((option) => (
                  <ControlButton
                    key={option}
                    active={timing === option}
                    onClick={() => {
                      setSelectedDefinitionKey('animation-timing-function');
                      setTiming(option);
                    }}
                    label={TIMING_LABELS[option]}
                  />
                ))}
              </div>
            </ControlGroup>

            <ControlGroup label="Direction">
              <div className="flex flex-wrap gap-1.5 w-full">
                {DIRECTIONS.map((option) => (
                  <ControlButton
                    key={option}
                    active={direction === option}
                    onClick={() => {
                      setSelectedDefinitionKey('animation-direction');
                      setDirection(option);
                    }}
                    label={DIRECTION_LABELS[option]}
                  />
                ))}
              </div>
            </ControlGroup>

            <ControlGroup label="Fill Mode">
              <div className="flex flex-wrap gap-1.5 w-full">
                {FILL_MODES.map((option) => (
                  <ControlButton
                    key={option}
                    active={fillMode === option}
                    onClick={() => {
                      setSelectedDefinitionKey('animation-fill-mode');
                      setFillMode(option);
                    }}
                    label={option}
                  />
                ))}
              </div>
            </ControlGroup>

            <ControlGroup label="Play State">
              <div className="flex flex-wrap gap-1.5 w-full">
                {['running', 'paused'].map((option) => (
                  <ControlButton
                    key={option}
                    active={playState === option}
                    onClick={() => {
                      setSelectedDefinitionKey('animation');
                      setPlayState(option);
                    }}
                    label={option}
                  />
                ))}
              </div>
            </ControlGroup>
          </section>
        </aside>

      <div className="min-w-0 flex flex-col gap-4 xl:min-h-0">
        <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 flex flex-col gap-4 xl:flex-1 xl:min-h-0 overflow-auto">

            <div className="rounded-xl border border-gray-200 bg-[var(--surface-2)] p-3 sm:p-4 xl:flex-1 xl:min-h-0">
              <div className="flex items-center justify-between gap-3 text-xs text-[var(--muted)] font-semibold uppercase tracking-[0.14em]">
                <span>Animated stage</span>
                <span>{animationSummary}</span>
              </div>
              <div className="mt-2 rounded-lg border border-[var(--divider)] bg-white px-3 py-2 text-[11px] font-mono text-[var(--muted)] break-words">
                {animationValue}
              </div>

              <div className="mt-4 rounded-xl border border-[var(--divider)] bg-white p-4 sm:p-6 min-h-[20rem] flex items-center justify-center overflow-hidden">
                <div className={`animation-demo-shell ${preset === 'orbit' ? 'animation-demo-shell--orbit' : ''}`}>
                  <div
                    className={`animation-card ${preset === 'orbit' ? 'animation-card--orbit' : ''}`}
                    style={{
                      animationName: presetConfig.keyframeName,
                      animationDuration: `${duration}ms`,
                      animationDelay: `${delay}ms`,
                      animationTimingFunction: timing,
                      animationIterationCount: String(iterationCount),
                      animationDirection: direction,
                      animationFillMode: fillMode,
                      animationPlayState: playState,
                      opacity: startOpacity,
                    }}
                  >
                    <span className="animation-card-kicker">@keyframes</span>
                    <span className="animation-card-title">{presetConfig.label}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

        <div className="min-h-[18rem] xl:h-72 xl:flex-shrink-0 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
          <CssOutput cssOutput={cssOutput} className="h-full" onReset={onReset} />
        </div>
      </div>

      <div className="min-h-[20rem] min-w-0 lg:col-span-2 xl:col-span-1 xl:h-full xl:overflow-y-auto">
        <PropertyDefinitionPanel definition={selectedDefinition} mode="grid" />
      </div>

      <style>
        {`
          ${keyframes}

          .animation-demo-shell {
            position: relative;
            width: min(100%, 32rem);
            min-height: 16rem;
            border-radius: 1.25rem;
            border: 1px dashed rgba(148, 163, 184, 0.4);
            background: var(--surface-2);
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
          }

          .animation-demo-shell--orbit::before {
            content: '';
            position: absolute;
            width: 8.5rem;
            height: 8.5rem;
            border-radius: 999px;
            border: 1px dashed rgba(148, 163, 184, 0.44);
          }

          .animation-card {
            width: 8.5rem;
            height: 8.5rem;
            border-radius: 1.5rem;
            background: var(--accent);
            box-shadow: 0 8px 20px rgba(24, 24, 27, 0.2);
            color: white;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 0.35rem;
            text-align: center;
          }

          .animation-card--orbit {
            position: absolute;
          }

          .animation-card-kicker {
            font-size: 0.68rem;
            font-weight: 700;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            opacity: 0.76;
          }

          .animation-card-title {
            font-size: 1rem;
            font-weight: 700;
            letter-spacing: -0.02em;
          }
        `}
      </style>
    </div>
  );
}