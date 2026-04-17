export const POSITION_DEFINITIONS = {
  static: {
    label: "static",
    definition: "The default position; elements are positioned according to the normal document flow. Top/left/right/bottom/z-index have no effect.",
    usage: `position: static;`
  },
  relative: {
    label: "relative",
    definition: "The element is positioned relative to its normal position. Offsets (top/left/right/bottom) move it, but it still takes up space in the flow.",
    usage: `position: relative;\ntop: 20px;\nleft: 10px;`
  },
  absolute: {
    label: "absolute",
    definition: "The element is removed from the normal flow and positioned relative to the nearest positioned ancestor (not static). If none, it uses the initial containing block (viewport).",
    usage: `position: absolute;\ntop: 10px;\nleft: 20px;`
  },
  fixed: {
    label: "fixed",
    definition: "The element is removed from the flow and positioned relative to the viewport. It stays fixed when scrolling.",
    usage: `position: fixed;\nbottom: 0;\nright: 0;`
  },
  sticky: {
    label: "sticky",
    definition: "The element is treated as relative until it crosses a threshold, then becomes fixed within its scrollable ancestor. Requires a top/left/right/bottom value and a scrollable parent.",
    usage: `position: sticky;\ntop: 0;`
  },
};
