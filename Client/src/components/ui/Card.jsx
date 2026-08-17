export default function Card({
  children,
  className = "",
}) {
  return (
    <div
      className={`
        rounded-3xl
        border
        theme-border
        theme-surface

        transition-colors
        duration-250

        ${className}
      `}
    >
      {children}
    </div>
  );
}