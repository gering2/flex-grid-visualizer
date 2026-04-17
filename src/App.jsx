import { useState } from "react";
import FlexGridPage from "./pages/FlexGridPage";
import PositioningPage from "./pages/PositioningPage";

export default function App() {
  const [activeView, setActiveView] = useState("layout");

  return (
    <div className="flex min-h-screen flex-col font-poppins bg-gray-50 lg:h-screen lg:flex-row">
      {/* Sidebar */}
      <aside className="w-full border-b border-gray-300 bg-gray-100 p-4 lg:h-full lg:w-56 lg:border-b-0 lg:border-r">
        <div className="text-xl font-bold mb-4 lg:mb-8">CSS Playground</div>
        <nav className="grid grid-cols-2 gap-2 lg:flex lg:flex-col">
            <button
            className={`text-left cursor-pointer px-3 py-2 rounded-lg transition ${
              activeView === "positioning"
                ? "bg-white text-accent font-semibold shadow"
                : "hover:bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveView("positioning")}
          >
            Positioning
          </button>
          <button
            className={`text-left cursor-pointer px-3 py-2 rounded-lg transition ${
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
      <main className="flex-1 overflow-y-scroll">
        {activeView === "layout" && <FlexGridPage />}
        {activeView === "positioning" && <PositioningPage />}
      </main>
    </div>
  );
}

