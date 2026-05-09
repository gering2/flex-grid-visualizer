import { useMemo, useState } from "react";
import FlexGridPage from "./pages/FlexGridPage";
import PositioningPage from "./pages/PositioningPage";
import LayoutTemplatesPage from "./pages/LayoutTemplatesPage";
import BoxModelPage from "./pages/BoxModelPage";
import TransitionsPage from "./pages/TransitionsPage";
import TypographyPage from "./pages/TypographyPage";
import ResponsiveDesignPage from "./pages/ResponsiveDesignPage";
import SizingIntrinsicPage from "./pages/SizingIntrinsicPage";
import AnimationPage from "./pages/AnimationPage";
import TransformPage from "./pages/TransformPage";
import CssVariablesPage from "./pages/CssVariablesPage";
import NavButton from "./components/Nav/NavButton";
import NavTitle from "./components/Nav/NavTitle";
import logoMark from "./assets/css-playground-logo.svg";

const GridIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <rect x="1.5" y="1.5" width="5" height="5" rx="1.2" />
    <rect x="9.5" y="1.5" width="5" height="5" rx="1.2" />
    <rect x="1.5" y="9.5" width="5" height="5" rx="1.2" />
    <rect x="9.5" y="9.5" width="5" height="5" rx="1.2" />
  </svg>
);

const PositionIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M8 14s4-4.4 4-8a4 4 0 1 0-8 0c0 3.6 4 8 4 8Z" />
    <circle cx="8" cy="6" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);

const BoxIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <rect x="2" y="2" width="12" height="12" rx="2" />
    <rect x="5.25" y="5.25" width="5.5" height="5.5" rx="1" fill="currentColor" stroke="none" opacity="0.4" />
  </svg>
);

const MotionIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
    <path d="M2 11.5c2 0 2-7 6-7s4 7 6 7" />
    <circle cx="8" cy="8" r="1.4" fill="currentColor" stroke="none" />
  </svg>
);

const TypeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 3h10" />
    <path d="M8 3v10" />
    <path d="M5 13h6" />
  </svg>
);

const ResponsiveIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="1.5" y="2" width="9" height="7" rx="1.5" />
    <rect x="5.5" y="10" width="9" height="4.5" rx="1.4" />
    <path d="M4 12.2h2.4" />
    <path d="M8 4.8h2" />
  </svg>
);

const SizingIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="3" width="12" height="10" rx="1.8" />
    <path d="M5 6.5h6" />
    <path d="M5 9.5h4" />
    <path d="M2.8 13.8h3.5" />
    <path d="M9.7 13.8h3.5" />
  </svg>
);

const NAV_GROUPS = [
  {
    title: "Flexbox & Grid",
    icon: <GridIcon />,
    items: [
      { key: "layout", label: "Interactive", caption: "Live flex and grid controls" },
      { key: "templates", label: "Layout Templates", caption: "Named-area grid presets" },
    ],
  },
  {
    title: "Responsive Design",
    icon: <ResponsiveIcon />,
    items: [{ key: "responsive", label: "Interactive", caption: "Media and container query strategies" }],
  },
  {
    title: "Sizing & Intrinsic",
    icon: <SizingIcon />,
    items: [{ key: "sizing", label: "Interactive", caption: "min-content, fit-content, minmax, ratios" }],
  },
  {
    title: "Positioning",
    icon: <PositionIcon />,
    items: [{ key: "positioning", label: "Interactive", caption: "Static, absolute, fixed, sticky" }],
  },
  {
    title: "Box Model",
    icon: <BoxIcon />,
    items: [{ key: "boxmodel", label: "Interactive", caption: "Margin, border, padding, sizing" }],
  },
  {
    title: "Motion",
    icon: <MotionIcon />,
    items: [
      { key: "transitions", label: "Transitions", caption: "Timing, delay, easing, hover state changes" },
      { key: "animation", label: "Animation", caption: "@keyframes, direction, fill mode, playback" },
      { key: "transform", label: "Transforms", caption: "Translate, rotate, scale, skew, origin" },
    ],
  },
  {
    title: "Typography",
    icon: <TypeIcon />,
    items: [
      { key: "typography", label: "Interactive", caption: "Scale, spacing, weight, rhythm" },
      { key: "variables", label: "CSS Variables", caption: "Custom properties, var() fallback, local scope" },
    ],
  },
];

function MenuIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
      <path d="M2.5 4h11" />
      <path d="M2.5 8h11" />
      <path d="M2.5 12h11" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden="true">
      <path d="M3.5 3.5 12.5 12.5" />
      <path d="M12.5 3.5 3.5 12.5" />
    </svg>
  );
}

function getViewMeta(activeView) {
  for (const group of NAV_GROUPS) {
    const item = group.items.find((entry) => entry.key === activeView);
    if (item) {
      return {
        section: group.title,
        label: item.label,
        caption: item.caption,
      };
    }
  }

  return {
    section: "Workspace",
    label: "Overview",
    caption: "CSS Playground",
  };
}

function AppSidebar({ activeView, onSelect, className = "", onClose }) {
  return (
    <>
      <div className="nav-brand border-b">
        <div className="nav-brand-mark" aria-hidden="true">
          <img src={logoMark} alt="" className="h-9 w-9" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="nav-brand-kicker">Design Lab</div>
          <div className="nav-brand-title">
            <span className="nav-brand-accent">CSS</span> Playground
          </div>
          <p className="nav-brand-copy">Interactive references for layout, spacing, motion, and type.</p>
        </div>
        {onClose ? (
          <button type="button" onClick={onClose} className="lg:hidden nav-close-button" aria-label="Close navigation drawer">
            <CloseIcon />
          </button>
        ) : null}
      </div>

      <nav className={`nav-scroll flex-1 min-h-0 px-3 py-3 sm:px-4 sm:py-4 ${className}`} aria-label="Primary">
        <div className="flex flex-col gap-3">
          {NAV_GROUPS.map((group) => (
            <section key={group.title} className="nav-group">
              <NavTitle icon={group.icon}>{group.title}</NavTitle>
              <div className="flex flex-col gap-1.5">
                {group.items.map((item) => (
                  <NavButton
                    key={item.key}
                    active={activeView === item.key}
                    onClick={() => onSelect(item.key)}
                    caption={item.caption}
                  >
                    {item.label}
                  </NavButton>
                ))}
              </div>
            </section>
          ))}
        </div>
      </nav>
    </>
  );
}

export default function App() {
  const [activeView, setActiveView] = useState("layout");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const activeMeta = useMemo(() => getViewMeta(activeView), [activeView]);

  const handleSelectView = (view) => {
    setActiveView(view);
    setMobileNavOpen(false);
  };

  return (
    <div className="app-shell flex min-h-screen overflow-hidden flex-col bg-[var(--bg)] lg:h-screen lg:flex-row">
      <aside className="nav-shell hidden lg:flex lg:h-full lg:w-[18rem] lg:border-r lg:flex-col lg:flex-shrink-0">
        <AppSidebar activeView={activeView} onSelect={handleSelectView} />
      </aside>

      {mobileNavOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/20 motion-fade-in"
            onClick={() => setMobileNavOpen(false)}
            aria-label="Close navigation backdrop"
          />
          <aside className="nav-shell absolute inset-y-0 left-0 w-[16rem] max-w-[78vw] border-r flex flex-col overflow-hidden motion-slide-in-left">
            <AppSidebar activeView={activeView} onSelect={handleSelectView} onClose={() => setMobileNavOpen(false)} />
          </aside>
        </div>
      ) : null}

      <div className="min-w-0 flex-1 flex flex-col app-content-shell min-h-0">
        <div className="lg:hidden border-b border-[var(--divider)] px-4 py-2.5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <img src={logoMark} alt="CSS Playground" className="h-8 w-8 rounded-sm border border-[var(--border)] p-1" style={{ background: 'var(--surface-2)' }} />
              <div className="min-w-0">
                <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--muted)]" style={{ fontFamily: 'var(--mono)' }}>Design Lab</div>
                <div className="truncate text-sm font-bold tracking-tight text-[var(--text-strong)]">CSS Playground</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setMobileNavOpen(true)}
              className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-md border border-[var(--border)] bg-white text-[var(--text-strong)]"
              aria-label="Open navigation drawer"
            >
              <MenuIcon />
            </button>
          </div>
        </div>

        <header className="app-topbar border-b border-[var(--divider)] px-4 py-2 sm:px-6">
          <div className="flex items-center justify-between gap-4 min-w-0">
            <div className="truncate text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]" style={{ fontFamily: 'var(--mono)' }}>
              {activeMeta.section}
            </div>
            <span className="hidden sm:block truncate text-[10px] tracking-[0.05em] text-[var(--muted)]" style={{ fontFamily: 'var(--mono)' }}>
              {activeMeta.caption}
            </span>
          </div>
        </header>

        <main className="app-stage w-full flex-1 min-h-0 overflow-y-auto overflow-x-hidden touch-pan-y">
          {activeView === "layout" && <FlexGridPage />}
          {activeView === "positioning" && <PositioningPage />}
          {activeView === "templates" && <LayoutTemplatesPage />}
          {activeView === "boxmodel" && <BoxModelPage />}
          {activeView === "transitions" && <TransitionsPage />}
          {activeView === "animation" && <AnimationPage />}
          {activeView === "transform" && <TransformPage />}
          {activeView === "typography" && <TypographyPage />}
          {activeView === "variables" && <CssVariablesPage />}
          {activeView === "responsive" && <ResponsiveDesignPage />}
          {activeView === "sizing" && <SizingIntrinsicPage />}
        </main>
      </div>
    </div>
  );
}

