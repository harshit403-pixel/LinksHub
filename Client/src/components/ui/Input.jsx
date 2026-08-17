import { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      label,
      type = "text",
      className = "",
      ...props
    },
    ref
  ) => {
    const isFile = type === "file";

    return (
      <div className="relative">
        <input
          ref={ref}
          type={type}
          placeholder={
            isFile ? undefined : " "
          }
          className={`
            ${
              isFile
                ? `
                  w-full
                  rounded-2xl
                  border
                  theme-border
                  theme-surface
                  p-4
                  theme-text

                  file:mr-4
                  file:rounded-xl
                  file:border-0
                  file:theme-accent-bg
                  file:px-4
                  file:py-2
                  file:font-semibold
                `
                : `
                  peer
                  w-full
                  bg-transparent
                  border-b
                  theme-border
                  py-4
                  theme-text
                  outline-none
                  transition-all
                  duration-200

                  focus:border-[var(--accent)]
                `
            }

            ${className}
          `}
          {...props}
        />

        {!isFile && (
          <label
            className="
              pointer-events-none
              absolute
              left-0
              top-4
              theme-muted
              transition-all
              duration-200

              peer-focus:-top-2
              peer-focus:text-xs
              peer-focus:text-[var(--accent)]

              peer-not-placeholder-shown:-top-2
              peer-not-placeholder-shown:text-xs
            "
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;