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
                  border-zinc-700
                  bg-transparent
                  p-4
                  text-white
                  file:mr-4
                  file:rounded-xl
                  file:border-0
                  file:bg-lime-400
                  file:px-4
                  file:py-2
                  file:text-black
                  file:font-semibold
                `
                : `
                  peer
                  w-full
                  bg-transparent
                  border-b
                  border-zinc-700
                  py-4
                  text-white
                  outline-none
                  transition-all
                  focus:border-lime-400
                `
            }

            ${className}
          `}
          {...props}
        />

        {!isFile && (
          <label
            className="
              absolute
              left-0
              top-4
              text-zinc-500
              pointer-events-none
              transition-all
              duration-200

              peer-focus:-top-2
              peer-focus:text-xs
              peer-focus:text-lime-400

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