import React, { useState } from "react";
import ControlGroup from "../components/ControlPanel/ControlGroup";
import { ControlButton } from "../components/ControlPanel/ControlButton";
import PositionDefinitionPanel from "../components/PositionDefinitionPanel";

const POSITION_TYPES = ["static", "relative", "absolute", "fixed", "sticky"];
const PARENT_POSITIONS = ["static", "relative"];
const PARENT_OVERFLOWS = ["visible", "hidden", "scroll"];

function PositioningPage() {
    // Track if we auto-set overflow for sticky mode
    const [autoScrollEnabled, setAutoScrollEnabled] = useState(false);

  const [position, setPosition] = useState("static");
  const [showDefinition, setShowDefinition] = useState(false);
  const [offsets, setOffsets] = useState({ top: "", left: "", right: "", bottom: "" });
  const [parentPosition, setParentPosition] = useState("static");
  const [parentOverflow, setParentOverflow] = useState("visible");
  const [showOutline, setShowOutline] = useState(true);
  const [showGhost, setShowGhost] = useState(false);
  const [showStacking, setShowStacking] = useState(false);
  const [showReference, setShowReference] = useState(false);
const handleSetPosition = (newPos) => {
  setPosition(newPos);
  setOffsets({ top: "", left: "", right: "", bottom: "" });
};
  // Sticky scroll demo mode
  const isSticky = position === "sticky";
  // Use a default top offset if not set
  let stickyTop = offsets.top !== "" ? Number(offsets.top) : 40;
  // Spacers for scroll demo (always present)
  const topSpacer = 120;
  const bottomSpacer = 1800;

  // Clamp stickyTop if too large for container
  const parentMaxHeight = isSticky ? 350 : 400;
  let stickyTopClamped = stickyTop;
  let stickyWarning = null;
  if (stickyTop > parentMaxHeight - 80) { // 80px fudge for sticky element height
    stickyTopClamped = Math.max(0, parentMaxHeight - 80);
    stickyWarning = `Sticky offset (${stickyTop}px) is too large for the container height (${parentMaxHeight}px). Clamped to ${stickyTopClamped}px.`;
  }

  // Parent style
  const parentStyle = {
    position: parentPosition,
    overflow: parentOverflow,
    minHeight: 300,
    maxHeight: parentMaxHeight,
    minWidth: 300,
    border: showOutline ? "2px dashed #2563eb" : "2px solid transparent",
    borderRadius: "0.75rem",
    background: "#f3f4f6",
    padding: "1rem 0.5rem",
    margin: "auto",
    maxWidth: 500,
    display: "block",
    position: "relative",
    boxSizing: "border-box",
  };

  // Inline style for target element
    const targetStyle = {
    position,
    ...(isSticky
        ? (offsets.top ? { top: `${stickyTopClamped}px` } : {})
        : {
            top: offsets.top ? `${offsets.top}px` : undefined,
            left: offsets.left ? `${offsets.left}px` : undefined,
            right: offsets.right ? `${offsets.right}px` : undefined,
            bottom: offsets.bottom ? `${offsets.bottom}px` : undefined,
        }),
    zIndex: showStacking ? 10 : undefined,
    background: "#fbbf24",
    color: "#78350f",
    border: "2px solid #f59e42",
    borderRadius: "0.5rem",
    fontWeight: "bold",
    padding: "1rem",
    maxWidth: "15rem"
    };

  return (
    <div className="flex flex-row items-center gap-8 w-full justify-center p-4  ">
      {/* Sidebar Controls Panel */}
      <aside className="w-140  bg-white rounded-2xl shadow border border-gray-200 p-12 flex flex-col gap-6 items-stretch">
        {/* Position Type */}
        <ControlGroup label="Position Type">
          <div className="flex flex-wrap gap-2">
            {POSITION_TYPES.map((type) => (
                <ControlButton
                    key={type}
                    active={position === type}
                    onClick={() => handleSetPosition(type)}
                    label={type.charAt(0).toUpperCase() + type.slice(1)}
                />
            ))}
          </div>
        </ControlGroup>
        {/* Offsets */}
        <ControlGroup label="Offsets">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs text-gray-400 mb-1">Top</label>
              <input type="number" className="w-full px-2 py-1 border rounded text-sm" placeholder="Top" value={offsets.top} onChange={e => setOffsets(o => ({ ...o, top: e.target.value }))} disabled={position === 'static' || (position === 'sticky' && 'top' !== 'top')} />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Left</label>
              <input type="number" className="w-full px-2 py-1 border rounded text-sm" placeholder="Left" value={offsets.left} onChange={e => setOffsets(o => ({ ...o, left: e.target.value }))} disabled={position === 'static' || (position === 'sticky' && 'left' !== 'top')} />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Right</label>
              <input type="number" className="w-full px-2 py-1 border rounded text-sm" placeholder="Right" value={offsets.right} onChange={e => setOffsets(o => ({ ...o, right: e.target.value }))} disabled={position === 'static' || (position === 'sticky' && 'right' !== 'top')} />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Bottom</label>
              <input type="number" className="w-full px-2 py-1 border rounded text-sm" placeholder="Bottom" value={offsets.bottom} onChange={e => setOffsets(o => ({ ...o, bottom: e.target.value }))} disabled={position === 'static' || (position === 'sticky' && 'bottom' !== 'top')} />
            </div>
          </div>
        </ControlGroup>
        {/* Environment */}
        <ControlGroup label="Environment">
         
          <div className="flex flex-col gap-3">
            <div>
              <div className="text-xs text-gray-400 mb-1">Parent Position</div>
              <div className="flex gap-2">
                {PARENT_POSITIONS.map((type) => (
                  <ControlButton
                    key={type}
                    active={parentPosition === type}
                    onClick={() => setParentPosition(type)}
                    label={type.charAt(0).toUpperCase() + type.slice(1)}
                  />
                ))}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-400 mb-1">Parent Overflow</div>
              <div className="flex gap-2">
                {PARENT_OVERFLOWS.map((type) => (
                  <ControlButton
                    key={type}
                    active={parentOverflow === type}
                    onClick={() => setParentOverflow(type)}
                    label={type.charAt(0).toUpperCase() + type.slice(1)}
                  />
                ))}
              </div>
            </div>
          </div>
        </ControlGroup>
        {/* Visual Aids */}
        <ControlGroup label="Visual Aids">
          <div className="flex flex-col gap-2">
            <ControlButton
              active={showOutline}
              onClick={() => setShowOutline(v => !v)}
              label={(showOutline ? 'Hide' : 'Show') + ' Container Outline'}
            />
            <ControlButton
              active={showGhost}
              onClick={() => setShowGhost(v => !v)}
              label={(showGhost ? 'Hide' : 'Show') + ' Original Position'}
            />
            <ControlButton
              active={showStacking}
              onClick={() => setShowStacking(v => !v)}
              label={(showStacking ? 'Hide' : 'Show') + ' Stacking Context'}
            />
            <ControlButton
              active={showReference}
              onClick={() => setShowReference(v => !v)}
              label={(showReference ? 'Hide' : 'Show') + ' Reference'}
            />
          </div>
        </ControlGroup>
      </aside>
      {/* Main Controls and Preview Area */}
      <div className=" min-h-0 flex items-center justify-center">
        <div style={parentStyle} className="relative  h-full">
          {/* Top spacer for scroll demo (always present) */}
          <div style={{ height: topSpacer, width: "100%", display: "block" }} />
          {/* Sibling element */}
          <div className="bg-gray-200 text-gray-500 rounded px-4 py-2 mb-2 w-full" style={{display: "block"}}>
            Sibling Element
          </div>
          {/* Sticky threshold indicator (tied to scroll container) */}
          {isSticky && (
            <div style={{
              position: "relative",
              width: "100%",
              height: 0,
              top: stickyTopClamped,
              borderTop: "2px dashed #2563eb",
              zIndex: 20,
              pointerEvents: "none"
            }}>
              <span style={{
                position: "absolute",
                left: 0,
                top: -18,
                fontSize: 12,
                color: "#2563eb",
                background: "#fff",
                padding: "0 4px",
                borderRadius: 4,
                fontWeight: 600,
              }}>
                Stick Boundary
              </span>
            </div>
          )}
          {/* Target element */}
          <div
            className={isSticky ? "sticky" : position ?? undefined}
            style={{
              ...targetStyle,
              width: "100%",
              marginBottom: isSticky ? 0 : undefined,
              zIndex: showStacking ? 10 : undefined,
            }}
          >
            Target Element
            {/* Fixed position note */}
            {position === "fixed" && (
              <div style={{ fontSize: 12, color: "#b91c1c", marginTop: 4 }}>
                (Fixed: This element is positioned relative to the viewport, not the container.)
              </div>
            )}
          </div>
          {/* Sticky offset warning */}
          {isSticky && stickyWarning && (
            <div className="text-xs text-red-500 mt-2 font-semibold">
              {stickyWarning}
            </div>
          )}
          {/* Bottom spacer for scroll demo (always present) */}
          <div style={{ height: bottomSpacer, width: "100%", display: "block" }} />
          {/* Sticky hint if not scrollable */}
          {position === "sticky" && parentOverflow === "visible" && (
            <div className="text-xs text-red-500 mt-2 font-semibold">
              Sticky requires a scrollable container to activate
            </div>
          )}
          {/* Ghost element for relative */}
          {showGhost && position === "relative" && (
            <div
              className="absolute left-0 top-0 bg-purple-200/40 border border-dashed border-purple-400 rounded px-4 py-2 pointer-events-none"
              style={{
                zIndex: 1,
                width: "auto",
                height: "auto",
              }}
            >
              Original Position
            </div>
          )}
          {/* Reference highlight */}
          {showReference && (
            <div className="absolute inset-0 border-2 border-blue-400 border-dotted pointer-events-none z-0" />
          )}
        </div>
      </div>
      {/* Definition Panel - always show for active position */}
      <div className="hidden md:flex flex-col w-80 flex-shrink-0 items-stretch">
        <PositionDefinitionPanel
          positionType={position}
          onClose={() => {}}
        />
      </div>

    </div>
  );

}

export default PositioningPage;
