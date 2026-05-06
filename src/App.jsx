import { useState } from "react";
import FlexGridPage from "./pages/FlexGridPage";
import PositioningPage from "./pages/PositioningPage";
import LayoutTemplatesPage from "./pages/LayoutTemplatesPage";
import BoxModelPage from "./pages/BoxModelPage";
import TransitionsPage from "./pages/TransitionsPage";
import TypographyPage from "./pages/TypographyPage";
import NavButton from "./components/Nav/NavButton";
import NavTitle from "./components/Nav/NavTitle";

const GridIcon = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="1" width="6" height="6" rx="1.5"/>
    <rect x="9" y="1" width="6" height="6" rx="1.5"/>
    <rect x="1" y="9" width="6" height="6" rx="1.5"/>
    <rect x="9" y="9" width="6" height="6" rx="1.5"/>
  </svg>
);

const PinIcon = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 1C5.79 1 4 2.79 4 5c0 3.5 4 9 4 9s4-5.5 4-9c0-2.21-1.79-4-4-4zm0 5.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
  </svg>
);

const BoxIcon = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="12" height="12" rx="2"/>
    <rect x="5.5" y="5.5" width="5" height="5" rx="1" fill="currentColor" fillOpacity="0.45" stroke="none"/>
  </svg>
);

const TransitionIcon = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 12 C4 12 4 4 8 4 C12 4 12 12 14 12"/>
    <circle cx="8" cy="8" r="1.5" fill="currentColor" stroke="none"/>
  </svg>
);

const TypeIcon = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 3h10M8 3v10M5 13h6"/>
  </svg>
);

export default function App() {
  const [activeView, setActiveView] = useState("layout");

  return (
    <div className="flex h-screen overflow-hidden flex-col font-poppins bg-gray-50 lg:flex-row">
      {/* Sidebar */}
      <aside
        className="w-full border-b lg:h-full lg:w-60 lg:border-b-0 lg:border-r flex-shrink-0"
        style={{
          background: 'var(--surface-1)',
          borderColor: 'var(--border)',
        }}
      >
        {/* Logo */}
        <div
          className="px-5 py-5 border-b flex items-center gap-1.5"
          style={{ borderColor: 'var(--divider)' }}
        >
          <span
            className="text-base font-bold tracking-tight"
            style={{ color: 'var(--accent)', fontFamily: 'var(--heading)' }}
          >
            CSS
          </span>
          <span
            className="text-base font-bold tracking-tight"
            style={{ color: 'var(--text-strong)', fontFamily: 'var(--heading)' }}
          >
            Playground
          </span>
        </div>

        {/* Nav */}
        <nav className="p-3 flex flex-col mt-1">

          {/* Flexbox & Grid group */}
          <NavTitle icon={<GridIcon />}>Flexbox &amp; Grid</NavTitle>
          <div className="flex flex-col gap-0.5 mb-4">
            <NavButton active={activeView === "layout"} onClick={() => setActiveView("layout")}>
              Interactive
            </NavButton>
            <NavButton active={activeView === "templates"} onClick={() => setActiveView("templates")}>
              Layout Templates
            </NavButton>
          </div>

          {/* Positioning group */}
          <NavTitle icon={<PinIcon />}>Positioning</NavTitle>
          <div className="flex flex-col gap-0.5 mb-4">
            <NavButton active={activeView === "positioning"} onClick={() => setActiveView("positioning")}>
              Interactive
            </NavButton>
          </div>

          {/* Box Model group */}
          <NavTitle icon={<BoxIcon />}>Box Model</NavTitle>
          <div className="flex flex-col gap-0.5 mb-4">
            <NavButton active={activeView === "boxmodel"} onClick={() => setActiveView("boxmodel")}>
              Interactive
            </NavButton>
          </div>

          {/* Transitions group */}
          <NavTitle icon={<TransitionIcon />}>Transitions</NavTitle>
          <div className="flex flex-col gap-0.5 mb-4">
            <NavButton active={activeView === "transitions"} onClick={() => setActiveView("transitions")}>
              Interactive
            </NavButton>
          </div>

          {/* Typography group */}
          <NavTitle icon={<TypeIcon />}>Typography</NavTitle>
          <div className="flex flex-col gap-0.5">
            <NavButton active={activeView === "typography"} onClick={() => setActiveView("typography")}>
              Interactive
            </NavButton>
          </div>

        </nav>
      </aside>
      {/* Main Content */}
      <main className="w-full overflow-y-auto">
        {activeView === "layout" && <FlexGridPage />}
        {activeView === "positioning" && <PositioningPage />}
        {activeView === "templates" && <LayoutTemplatesPage />}
        {activeView === "boxmodel" && <BoxModelPage />}
        {activeView === "transitions" && <TransitionsPage />}
        {activeView === "typography" && <TypographyPage />}
      </main>
    </div>
  );
}
