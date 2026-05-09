import { useState, useMemo } from 'react';
import { ControlButton, ControlGroup } from '../components/ControlPanel/ControlButton';
import CssOutput from '../components/CssOutput/CssOutput';

const FONT_FAMILIES = [
  { label: 'Inter',    value: "'Inter', sans-serif" },
  { label: 'Poppins',  value: "'Poppins', sans-serif" },
  { label: 'Georgia',  value: "'Georgia', serif" },
  { label: 'Mono',     value: "ui-monospace, 'Courier New', monospace" },
];

const FONT_WEIGHTS = [
  { label: 'Light',     value: 300 },
  { label: 'Regular',   value: 400 },
  { label: 'Medium',    value: 500 },
  { label: 'SemiBold',  value: 600 },
  { label: 'Bold',      value: 700 },
];

const TEXT_ALIGNS    = ['left', 'center', 'right', 'justify'];
const TEXT_TRANSFORMS = ['none', 'uppercase', 'lowercase', 'capitalize'];

const SAMPLE_PARAGRAPH = `The quick brown fox jumps over the lazy dog. Typography shapes how readers feel before they understand a single word — a good type hierarchy guides the eye, sets the tone, and makes content effortlessly readable.`;

export default function TypographyPage() {
  const [fontFamily, setFontFamily]       = useState(FONT_FAMILIES[0].value);
  const [fontSize, setFontSize]           = useState(16);
  const [fontWeight, setFontWeight]       = useState(400);
  const [lineHeight, setLineHeight]       = useState(1.6);
  const [letterSpacing, setLetterSpacing] = useState(0);
  const [textAlign, setTextAlign]         = useState('left');
  const [textTransform, setTextTransform] = useState('none');

  const cssOutput = useMemo(() => {
    const ls = letterSpacing === 0 ? 'normal' : `${letterSpacing}em`;
    const lh = lineHeight.toFixed(1);
    return [
      '.text {',
      `  font-family: ${fontFamily};`,
      `  font-size: ${fontSize}px;`,
      `  font-weight: ${fontWeight};`,
      `  line-height: ${lh};`,
      `  letter-spacing: ${ls};`,
      `  text-align: ${textAlign};`,
      ...(textTransform !== 'none' ? [`  text-transform: ${textTransform};`] : []),
      '}',
    ].join('\n');
  }, [fontFamily, fontSize, fontWeight, lineHeight, letterSpacing, textAlign, textTransform]);

  const previewStyle = {
    fontFamily,
    fontSize: `${fontSize}px`,
    fontWeight,
    lineHeight,
    letterSpacing: letterSpacing === 0 ? 'normal' : `${letterSpacing}em`,
    textAlign,
    textTransform,
    color: 'var(--text-strong)',
    transition: 'all 200ms ease',
  };

  return (
    <div className="overflow-y-auto xl:overflow-hidden xl:h-full xl:flex xl:flex-col">
      <div className="p-3 sm:p-4 flex flex-col gap-4 lg:grid lg:grid-cols-[21rem_minmax(0,1fr)] lg:auto-rows-auto xl:flex-1 xl:min-h-0 xl:grid-cols-[21rem_minmax(0,1fr)]">

        {/* Controls */}
        <aside className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 flex flex-col gap-5 xl:overflow-y-auto min-w-0">

            <ControlGroup label="Font Family">
              <div className="flex flex-wrap gap-1.5 w-full">
                {FONT_FAMILIES.map((f) => (
                  <ControlButton key={f.label} active={fontFamily === f.value} onClick={() => setFontFamily(f.value)} label={f.label} />
                ))}
              </div>
            </ControlGroup>

            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
                Font Size — <span className="text-[var(--accent-strong)]">{fontSize}px</span>
              </div>
              <input
                type="range" min="10" max="60" step="1"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full accent-[var(--accent)]"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>10px</span><span>60px</span>
              </div>
            </div>

            <ControlGroup label="Font Weight">
              <div className="flex flex-wrap gap-1.5 w-full">
                {FONT_WEIGHTS.map((w) => (
                  <ControlButton key={w.value} active={fontWeight === w.value} onClick={() => setFontWeight(w.value)} label={w.label} />
                ))}
              </div>
            </ControlGroup>

            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
                Line Height — <span className="text-[var(--accent-strong)]">{lineHeight.toFixed(1)}</span>
              </div>
              <input
                type="range" min="1" max="3" step="0.1"
                value={lineHeight}
                onChange={(e) => setLineHeight(Number(e.target.value))}
                className="w-full accent-[var(--accent)]"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>1.0</span><span>3.0</span>
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
                Letter Spacing — <span className="text-[var(--accent-strong)]">{letterSpacing === 0 ? 'normal' : `${letterSpacing}em`}</span>
              </div>
              <input
                type="range" min="-0.1" max="0.5" step="0.01"
                value={letterSpacing}
                onChange={(e) => setLetterSpacing(Number(e.target.value))}
                className="w-full accent-[var(--accent)]"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>−0.1em</span><span>0.5em</span>
              </div>
            </div>

            <ControlGroup label="Text Align">
              <div className="flex flex-wrap gap-1.5 w-full">
                {TEXT_ALIGNS.map((a) => (
                  <ControlButton key={a} active={textAlign === a} onClick={() => setTextAlign(a)} label={a} />
                ))}
              </div>
            </ControlGroup>

            <ControlGroup label="Text Transform">
              <div className="flex flex-wrap gap-1.5 w-full">
                {TEXT_TRANSFORMS.map((t) => (
                  <ControlButton key={t} active={textTransform === t} onClick={() => setTextTransform(t)} label={t} />
                ))}
              </div>
            </ControlGroup>

        </aside>

        {/* Preview + Output */}
        <div className="flex-1 xl:min-h-0 min-w-0 flex flex-col gap-4">
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 flex flex-col gap-3 xl:flex-1 xl:min-h-0 overflow-hidden">
            <div className="min-h-[14rem] xl:flex-1 xl:min-h-0 overflow-auto rounded-xl p-6 sm:p-10" style={{ background: 'var(--surface-2)' }}>
              <p style={previewStyle}>{SAMPLE_PARAGRAPH}</p>
            </div>
          </section>

          <div className="min-h-[18rem] xl:h-72 xl:flex-shrink-0 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            <CssOutput cssOutput={cssOutput} className="h-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
