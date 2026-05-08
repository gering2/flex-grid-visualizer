export default function NavButton({ active, onClick, children, caption }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`nav-button text-left cursor-pointer w-full px-3 py-2.5 rounded-lg text-sm transition-all border ${
        active
          ? "nav-button-active"
          : "nav-button-idle"
      }`}
    >
      <span className="nav-button-label block text-sm font-semibold leading-5">{children}</span>
      {caption ? <span className="nav-button-caption mt-1 block text-[11px] leading-4">{caption}</span> : null}
    </button>
  );
}
