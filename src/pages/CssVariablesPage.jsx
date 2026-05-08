import { useMemo, useState } from 'react';
import { ControlButton, ControlGroup } from '../components/ControlPanel/ControlButton';
import CssOutput from '../components/CssOutput/CssOutput';
import PropertyDefinitionPanel from '../components/PropertyDefinitionPanel';
import { VARIABLE_DEFINITIONS } from '../data/variables-definitions';

const PALETTES = [
  { label: 'Violet', accent: '#7c3aed', accentSoft: 'rgba(124, 58, 237, 0.14)' },
  { label: 'Teal', accent: '#0f766e', accentSoft: 'rgba(15, 118, 110, 0.14)' },
  { label: 'Coral', accent: '#ea580c', accentSoft: 'rgba(234, 88, 12, 0.14)' },
];

const RADIUS_OPTIONS = ['0.5rem', '0.75rem', '1rem', '1.25rem'];
const SPACE_OPTIONS = ['0.5rem', '0.75rem', '1rem', '1.25rem', '1.5rem'];

export default function CssVariablesPage() {
  const [selectedDefinitionKey, setSelectedDefinitionKey] = useState('custom-properties');
  const [palette, setPalette] = useState(PALETTES[0]);
  const [radius, setRadius] = useState('1rem');
  const [space, setSpace] = useState('1rem');
  const [shadow, setShadow] = useState(0.18);
  const [useFallback, setUseFallback] = useState(false);
  const selectedDefinition = VARIABLE_DEFINITIONS[selectedDefinitionKey] ?? null;

  const cssOutput = useMemo(() => {
    return [
      '.token-scope {',
      `  --demo-accent: ${palette.accent};`,
      `  --demo-accent-soft: ${palette.accentSoft};`,
      `  --demo-radius: ${radius};`,
      `  --demo-space: ${space};`,
      `  --demo-shadow: 0 16px 34px rgba(15, 23, 42, ${shadow.toFixed(2)});`,
      '}',
      '',
      '.token-card {',
      '  border: 1px solid var(--demo-accent-soft);',
      '  border-radius: var(--demo-radius);',
      '  padding: var(--demo-space);',
      '  box-shadow: var(--demo-shadow);',
      `  color: var(${useFallback ? '--missing-token' : '--demo-accent'}, #0f172a);`,
      '}',
      '',
      '.token-card--local {',
      '  --demo-accent: #0f766e;',
      '}',
    ].join('\n');
  }, [palette, radius, shadow, space, useFallback]);

  const onReset = () => {
    setSelectedDefinitionKey('custom-properties');
    setPalette(PALETTES[0]);
    setRadius('1rem');
    setSpace('1rem');
    setShadow(0.18);
    setUseFallback(false);
  };

  return (
    <div className="overflow-y-auto xl:overflow-hidden xl:h-full xl:flex xl:flex-col">
      <div className="p-3 sm:p-4 flex flex-col gap-4 lg:grid lg:grid-cols-[21rem_minmax(0,1fr)] lg:auto-rows-auto xl:flex-1 xl:min-h-0 xl:grid-cols-[21rem_minmax(0,1.35fr)_19rem] xl:grid-rows-[1fr_auto]">
        <aside className="xl:w-[21rem] xl:flex-shrink-0 bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 flex flex-col gap-5 xl:overflow-y-auto">
          <section className="control-section space-y-4">
            <div>
              <div className="control-section-kicker">Token Scope</div>
              <p className="mt-1 text-xs text-[var(--muted)]">Define reusable values once and consume them through var().</p>
            </div>

            <ControlGroup label="Accent Token">
              <div className="flex flex-wrap gap-1.5 w-full">
                {PALETTES.map((entry) => (
                  <ControlButton
                    key={entry.label}
                    active={palette.label === entry.label}
                    onClick={() => {
                      setSelectedDefinitionKey('custom-properties');
                      setPalette(entry);
                    }}
                    label={entry.label}
                  />
                ))}
              </div>
            </ControlGroup>

            <ControlGroup label="Radius Token">
              <div className="flex flex-wrap gap-1.5 w-full">
                {RADIUS_OPTIONS.map((entry) => (
                  <ControlButton
                    key={entry}
                    active={radius === entry}
                    onClick={() => {
                      setSelectedDefinitionKey('custom-properties');
                      setRadius(entry);
                    }}
                    label={entry}
                  />
                ))}
              </div>
            </ControlGroup>

            <ControlGroup label="Spacing Token">
              <div className="flex flex-wrap gap-1.5 w-full">
                {SPACE_OPTIONS.map((entry) => (
                  <ControlButton
                    key={entry}
                    active={space === entry}
                    onClick={() => {
                      setSelectedDefinitionKey('custom-properties');
                      setSpace(entry);
                    }}
                    label={entry}
                  />
                ))}
              </div>
            </ControlGroup>

            <div>
              <div className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-2">
                Shadow Alpha - <span className="text-[var(--accent-strong)]">{shadow.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.35"
                step="0.01"
                value={shadow}
                onChange={(event) => {
                  setSelectedDefinitionKey('custom-properties');
                  setShadow(Number(event.target.value));
                }}
                className="w-full accent-[var(--accent)]"
              />
            </div>
          </section>

          <section className="control-section space-y-4">
            <div>
              <div className="control-section-kicker">var() Fallback</div>
              <p className="mt-1 text-xs text-[var(--muted)]">Toggle a missing token to see fallback values in action.</p>
            </div>

            <ControlGroup label="Fallback Mode">
              <div className="flex flex-wrap gap-1.5 w-full">
                <ControlButton
                  active={!useFallback}
                  onClick={() => {
                    setSelectedDefinitionKey('var');
                    setUseFallback(false);
                  }}
                  label="Token Exists"
                />
                <ControlButton
                  active={useFallback}
                  onClick={() => {
                    setSelectedDefinitionKey('var');
                    setUseFallback(true);
                  }}
                  label="Use Fallback"
                />
              </div>
            </ControlGroup>

            <ControlGroup label="Definition Focus">
              <div className="flex flex-wrap gap-1.5 w-full">
                <ControlButton
                  active={selectedDefinitionKey === 'custom-properties'}
                  onClick={() => setSelectedDefinitionKey('custom-properties')}
                  label="Tokens"
                />
                <ControlButton
                  active={selectedDefinitionKey === 'var'}
                  onClick={() => setSelectedDefinitionKey('var')}
                  label="var()"
                />
                <ControlButton
                  active={selectedDefinitionKey === 'local-scope'}
                  onClick={() => setSelectedDefinitionKey('local-scope')}
                  label="Scope"
                />
              </div>
            </ControlGroup>
          </section>
        </aside>

        <div className="flex-1 xl:min-h-0 min-w-0 flex flex-col gap-4">
          <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 flex flex-col gap-4 xl:flex-1 xl:min-h-0 overflow-auto">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gray-400">CSS Variables</div>
              <p className="mt-1 text-sm text-[var(--muted)]">The top card consumes shared tokens. The lower card overrides a local token to demonstrate cascade scope.</p>
            </div>

            <div
              className="rounded-xl border border-gray-200 bg-[var(--surface-2)] p-3 sm:p-4 xl:flex-1"
              style={{
                '--demo-accent': palette.accent,
                '--demo-accent-soft': palette.accentSoft,
                '--demo-radius': radius,
                '--demo-space': space,
                '--demo-shadow': `0 16px 34px rgba(15, 23, 42, ${shadow.toFixed(2)})`,
              }}
            >
              <article
                className="rounded-xl border bg-white"
                style={{
                  borderColor: 'var(--demo-accent-soft)',
                  borderRadius: 'var(--demo-radius)',
                  padding: 'var(--demo-space)',
                  boxShadow: 'var(--demo-shadow)',
                  color: useFallback ? 'var(--missing-token, #0f172a)' : 'var(--demo-accent, #0f172a)',
                }}
              >
                <div className="text-xs uppercase tracking-[0.12em] opacity-70">Shared tokens</div>
                <div className="mt-1 text-lg font-semibold">Design token card</div>
                <p className="mt-1 text-sm opacity-80">Every style here reads from custom properties so one token update fans out across the whole module.</p>
                <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] opacity-75">
                  <span>accent {palette.label}</span>
                  <span>radius {radius}</span>
                  <span>space {space}</span>
                </div>
              </article>

              <article
                className="mt-3 rounded-xl border bg-white"
                style={{
                  '--demo-accent': '#0f766e',
                  borderColor: 'var(--demo-accent-soft)',
                  borderRadius: 'var(--demo-radius)',
                  padding: 'var(--demo-space)',
                  color: 'var(--demo-accent)',
                }}
                onMouseEnter={() => setSelectedDefinitionKey('local-scope')}
                onClick={() => setSelectedDefinitionKey('local-scope')}
              >
                <div className="text-xs uppercase tracking-[0.12em] opacity-70">Local override</div>
                <div className="mt-1 text-base font-semibold">Nested scope</div>
                <p className="mt-1 text-sm opacity-80">This card overrides one token locally while inheriting all other variables from the parent token scope.</p>
              </article>
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
    </div>
  );
}
