import { useState, useMemo } from 'react';
import { LAYOUT_TEMPLATES } from '../data/template-definitions';
import CssOutput from '../components/CssOutput/CssOutput';

function TemplatePreview({ template }) {
  // Parse gridTemplateAreas into a usable style value
  const gridTemplateAreasValue = template.gridTemplateAreas
    .split('\n')
    .map((row) => row.trim())
    .join(' ');

  const containerStyle = {
    display: 'grid',
    gridTemplateAreas: gridTemplateAreasValue,
    gridTemplateColumns: template.gridTemplateColumns,
    gridTemplateRows: template.gridTemplateRows,
    gap: '0.5rem',
  };

  // Deduplicate areas for rendering (one box per unique grid-area)
  const renderedAreas = [];
  const seen = new Set();
  for (const area of template.areas) {
    if (!seen.has(area.name)) {
      seen.add(area.name);
      renderedAreas.push(area);
    }
  }

  return (
    <div className="w-full h-full min-h-[14rem]" style={containerStyle}>
      {renderedAreas.map((area) => (
        <div
          key={area.name}
          style={{ gridArea: area.name }}
          className={`${area.bg} ${area.border} ${area.text} border-2 rounded-xl flex items-center justify-center font-bold text-sm tracking-wide transition-all duration-200`}
        >
          {area.label}
        </div>
      ))}
    </div>
  );
}

function buildCssOutput(template) {
  const uniqueAreas = [...new Set(template.areas.map((a) => a.name))];
  const itemRules = uniqueAreas
    .map((name) => `.${name} { grid-area: ${name}; }`)
    .join('\n');

  return [
    '.container {',
    '  display: grid;',
    `  grid-template-columns: ${template.gridTemplateColumns};`,
    `  grid-template-rows: ${template.gridTemplateRows};`,
    '  grid-template-areas:',
    ...template.gridTemplateAreas.split('\n').map((row) => `    ${row};`),
    '  gap: 0.5rem;',
    '}',
    '',
    itemRules,
  ].join('\n');
}

export default function LayoutTemplatesPage() {
  const [selectedId, setSelectedId] = useState('sidebar');
  const template = LAYOUT_TEMPLATES.find((t) => t.id === selectedId);
  const cssOutput = useMemo(() => buildCssOutput(template), [template]);

  return (
    <div className="w-full bg-gray-50 font-poppins flex flex-col p-3 sm:p-4 gap-4 min-h-screen">
      <div className="mx-auto w-full max-w-7xl">
        {/* Header */}
        <div className="mb-2">
          <h1 className="text-xl font-bold text-[var(--text-strong)]">Grid Template Areas</h1>
          <p className="text-sm text-[var(--muted)] mt-1">
            Explore how <code className="font-mono text-[var(--accent-strong)]">grid-template-areas</code> defines explicit layout structure — unlike Flexbox which adapts to content flow.
          </p>
        </div>

        {/* Preset Selector */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 flex flex-col gap-3">
          <div className="text-xs font-semibold uppercase tracking-widest text-gray-500">Choose a Preset</div>
          <div className="flex flex-wrap gap-2">
            {LAYOUT_TEMPLATES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setSelectedId(t.id)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-all duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring)] ${
                  selectedId === t.id
                    ? 'bg-[var(--accent)] text-white border-[var(--accent)] shadow-sm'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-[var(--accent-border)] hover:text-[var(--accent-strong)]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
          {template && (
            <p className="text-xs text-[var(--muted)]">{template.description}</p>
          )}
        </div>

        {/* Main layout: Preview + CSS Output */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-4">
          {/* Preview */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 flex flex-col gap-3 min-h-[22rem]">
            <div className="flex items-center justify-between">
              <div className="section-title">Preview</div>
              <span className="rounded-full bg-[var(--accent-bg)] text-[var(--accent-strong)] text-xs font-semibold px-2.5 py-1 uppercase tracking-[0.08em]">Grid</span>
            </div>
            <div className="flex-1 min-h-0 p-2">
              {template && <TemplatePreview template={template} />}
            </div>
          </div>

          {/* CSS Output */}
          <div className="min-h-[22rem] overflow-hidden rounded-2xl">
            <CssOutput cssOutput={cssOutput} className="h-full" />
          </div>
        </div>

        {/* Explainer */}
        <div className="mt-4 bg-white rounded-2xl shadow-sm border border-gray-200 p-4">
          <div className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">How It Works</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-[var(--text)]">
            <div>
              <p className="font-semibold text-[var(--text-strong)] mb-1">Flexbox (content-driven)</p>
              <p>Items flow naturally based on their content size. The container adapts around the items — great for dynamic, unknown-length content.</p>
            </div>
            <div>
              <p className="font-semibold text-[var(--text-strong)] mb-1">Grid Template Areas (structure-driven)</p>
              <p>The layout is defined first. Items are placed into named regions regardless of their content size — ideal for page-level structure.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
