export default function NavButton({ active, onClick, children, caption }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`nav-button text-left cursor-pointer w-full px-3 py-3 rounded-xl text-sm transition-all border ${
        active
          ? "nav-button-active"
          : "nav-button-idle"
      }`}
    >
      <span className="block text-sm font-semibold leading-5">{children}</span>
      {caption ? <span className="mt-0.5 block text-[12px] leading-4 opacity-80">{caption}</span> : null}
    </button>
  );
}
