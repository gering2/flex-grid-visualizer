import { useState } from "react";
import FlexGridPage from "./FlexGridPage";
import PositioningPage from "./PositioningPage";

export default function App() {
  const [activeView, setActiveView] = useState("layout");

  return (
    <div className="flex h-screen font-poppins bg-gray-50">
      {/* Sidebar */}
      <aside className="w-56 h-full flex flex-col bg-gray-100 border-r border-gray-300 p-4">
        <div className="text-xl font-bold mb-8">CSS Playground</div>
        <nav className="flex flex-col gap-2">
            <button
            className={`text-left cursor-pointer px-3 py-2 rounded transition ${
              activeView === "positioning"
                ? "bg-white text-accent font-semibold shadow"
                : "hover:bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveView("positioning")}
          >
            Positioning
          </button>
          <button
            className={`text-left cursor-pointer px-3 py-2 rounded transition ${
              activeView === "layout"
                ? "bg-white text-accent font-semibold shadow"
                : "hover:bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveView("layout")}
          >
            Flexbox / Grid
          </button>
      
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 min-h-0 overflow-hidden">
        {activeView === "layout" && <FlexGridPage />}
        {activeView === "positioning" && <PositioningPage />}
      </main>
    </div>
  );
}

