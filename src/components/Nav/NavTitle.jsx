export default function NavTitle({ children, icon }) {
  return (
    <div className="nav-title-row">
      {icon && <span className="nav-title-icon flex-shrink-0">{icon}</span>}
      <p className="nav-title-text text-xs font-bold uppercase tracking-[0.14em] text-[var(--text-strong)]">
        {children}
      </p>
    </div>
  );
}
