export default function Card({
  children,
  className = "",
}) {
  return (
    <div
      className={`
        rounded-3xl
        border
        border-zinc-800
        bg-zinc-900
        ${className}
      `}
    >
      {children}
    </div>
  );
}