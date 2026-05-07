import { useState, useMemo } from 'react';
import { ControlButton, ControlGroup } from '../components/ControlPanel/ControlButton';
import CssOutput from '../components/CssOutput/CssOutput';

const PROPERTIES = ['all', 'opacity', 'transform', 'background-color', 'color', 'border-radius', 'box-shadow'];
const EASINGS = ['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear'];
const EASING_DEFINITIONS = {
  ease: 'Starts gently, speeds up in the middle, then slows down. Good default for natural UI motion.',
  'ease-in': 'Starts slowly and accelerates. Good when an element is entering or building momentum.',
  'ease-out': 'Starts quickly and slows at the end. Good for hover states and motion that needs a soft landing.',
  'ease-in-out': 'Starts slowly, speeds up, then slows again. Good for larger state changes that should feel balanced.',
  linear: 'Moves at a constant speed from start to finish. Good for loaders or motion that should feel mechanical.',
};

export default function TransitionsPage() {
  const [property, setProperty] = useState('all');
  const [duration, setDuration] = useState(400);
  const [easing, setEasing] = useState('ease');
  const [delay, setDelay] = useState(0);
  const [hovered, setHovered] = useState(false);

  const transitionValue = `${property} ${duration}ms ${easing}${delay > 0 ? ` ${delay}ms` : ''}`;

  const isActive = (prop) => prop === 'all' || property === prop || property === 'all';

  const cssOutput = useMemo(() => {
    return [
      '.element {',
      `  transition: ${transitionValue};`,
      '}',
      '',
      '.element:hover {',
      ...(isActive('opacity')          ? ['  opacity: 0.4;']                                      : []),
      ...(isActive('transform')         ? ['  transform: scale(1.1) rotate(4deg);']                : []),
      ...(isActive('background-color')  ? ['  background-color: #7c3aed;']                         : []),
      ...(isActive('color')             ? ['  color: #ffffff;']                                    : []),
      ...(isActive('border-radius')     ? ['  border-radius: 50%;']                                : []),
      ...(isActive('box-shadow')        ? ['  box-shadow: 0 12px 32px rgba(124,58,237,0.35);']     : []),
      '}',
    ].join('\n');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transitionValue, property]);

  const previewStyle = {
    transition: transitionValue,
    opacity:         hovered && isActive('opacity')         ? 0.4  : 1,
    transform:       hovered && isActive('transform')       ? 'scale(1.1) rotate(4deg)' : 'scale(1) rotate(0deg)',
    backgroundColor: hovered && isActive('background-color') ? '#7c3aed' : '#ede9fe',
    color:           hovered && (isActive('background-color') || isActive('color')) ? '#ffffff' : '#5b21b6',
    borderRadius:    hovered && isActive('border-radius')   ? '50%' : '14px',
    boxShadow:       hovered && isActive('box-shadow')      ? '0 12px 32px rgba(124,58,237,0.35)' : '0 2px 8px rgba(0,0,0,0.06)',
    width: '9rem',
    height: '9rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    fontSize: '0.875rem',
    cursor: 'pointer',
    userSelect: 'none',
  };

  const easingGuide = (
    <section className="rounded-2xl border border-gray-200 bg-[var(--surface-2)] p-4 flex flex-col gap-3">
      <div>
        <div className="text-xs font-semibold uppercase tracking-widest text-gray-500">Easing Guide</div>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Timing functions control how motion accelerates and decelerates, not just how long it lasts.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        {EASINGS.map((entry) => (
          <div
            key={entry}
            className={`rounded-xl border px-3 py-2 transition-colors ${easing === entry ? 'border-[var(--accent-border)] bg-[var(--accent-bg)]' : 'border-gray-200 bg-white'}`}
          >
            <div className="text-sm font-semibold text-[var(--text-strong)]">{entry}</div>
            <p className="mt-1 text-xs leading-5 text-[var(--muted)]">{EASING_DEFINITIONS[entry]}</p>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="overflow-y-auto xl:overflow-hidden xl:h-full xl:flex xl:flex-col">
      <div className="p-3 sm:p-4 flex flex-col gap-4 xl:flex-1 xl:min-h-0 xl:grid xl:grid-cols-[24rem_minmax(0,1fr)_22rem]">

          {/* Controls */}
          <aside className="xl:w-[24rem] xl:flex-shrink-0 bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 flex flex-col gap-5 xl:overflow-y-auto">

            <ControlGroup label="Transition Property">
              <div className="flex flex-wrap gap-1.5 w-full">
                {PROPERTIES.map((p) => (
                  <ControlButton key={p} active={property === p} onClick={() => setProperty(p)} label={p} />
                ))}
              </div>
            </ControlGroup>

            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
                Duration — <span className="text-[var(--accent-strong)]">{duration}ms</span>
              </div>
              <input
                type="range" min="50" max="2000" step="50"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full accent-[var(--accent)]"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>50ms</span><span>2000ms</span>
              </div>
            </div>

            <ControlGroup label="Timing Function">
              <div className="flex flex-wrap gap-1.5 w-full">
                {EASINGS.map((e) => (
                  <ControlButton key={e} active={easing === e} onClick={() => setEasing(e)} label={e} />
                ))}
              </div>
            </ControlGroup>

            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
                Delay — <span className="text-[var(--accent-strong)]">{delay}ms</span>
              </div>
              <input
                type="range" min="0" max="1000" step="50"
                value={delay}
                onChange={(e) => setDelay(Number(e.target.value))}
                className="w-full accent-[var(--accent)]"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>0ms</span><span>1000ms</span>
              </div>
            </div>

            <div className="xl:hidden">
              {easingGuide}
            </div>

          </aside>

          {/* Preview + Output */}
          <div className="flex-1 xl:min-h-0 min-w-0 flex flex-col gap-4">
            <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 flex flex-col gap-3 xl:flex-1 xl:min-h-0">
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gray-400">
                Preview — hover the box
              </div>
              <div
                className="flex items-center justify-center rounded-xl min-h-[14rem] xl:flex-1 xl:min-h-0"
                style={{ background: '#f5f3ff', minHeight: '10rem' }}
              >
                <div
                  style={previewStyle}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                >
                  Hover me
                </div>
              </div>
            </section>

            <div className="min-h-[24rem] xl:h-72 xl:flex-shrink-0 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
              <CssOutput cssOutput={cssOutput} className="h-full" />
            </div>
          </div>

          <aside className="hidden xl:block min-h-[20rem] xl:h-full overflow-y-auto">
            {easingGuide}
          </aside>
      </div>
    </div>
  );
}
