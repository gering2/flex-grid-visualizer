export default function NavTitle({ children, icon }) {
  return (
    <div className="nav-title-row">
      {icon && <span className="nav-title-icon flex-shrink-0">{icon}</span>}
      <p className="nav-title-text text-xs font-semibold tracking-[0.04em] text-[var(--text-strong)]">
        {children}
      </p>
    </div>
  );
}
