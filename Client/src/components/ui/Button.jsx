function Button({
  children,
  disabled = false,
  className = "",
  ...props
}) {
  return (
    <button
      disabled={disabled}
      className={`
        w-full
        py-4
        rounded-2xl
        bg-lime-400
        text-black
        font-semibold
        transition-all
        hover:bg-lime-300
        hover:scale-[1.01]
        active:scale-[0.98]
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;