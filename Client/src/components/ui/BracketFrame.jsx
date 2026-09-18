function BracketFrame({
  children,
  className = "",
  size = 14,
  inset = -8,
  thickness = 1,
  bordered = false,
}) {
  const tick = { width: size, height: size, borderColor: "var(--foreground)" };

  return (
    <div className={`relative ${bordered ? "border theme-border" : ""} ${className}`}>
      <span
        className="absolute"
        style={{ ...tick, top: inset, left: inset, borderTopWidth: thickness, borderLeftWidth: thickness, borderTopStyle: "solid", borderLeftStyle: "solid" }}
      />
      <span
        className="absolute"
        style={{ ...tick, top: inset, right: inset, borderTopWidth: thickness, borderRightWidth: thickness, borderTopStyle: "solid", borderRightStyle: "solid" }}
      />
      <span
        className="absolute"
        style={{ ...tick, bottom: inset, left: inset, borderBottomWidth: thickness, borderLeftWidth: thickness, borderBottomStyle: "solid", borderLeftStyle: "solid" }}
      />
      <span
        className="absolute"
        style={{ ...tick, bottom: inset, right: inset, borderBottomWidth: thickness, borderRightWidth: thickness, borderBottomStyle: "solid", borderRightStyle: "solid" }}
      />
      {children}
    </div>
  );
}

export default BracketFrame;