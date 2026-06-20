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
    return (
      <div className="relative">
        <input
          ref={ref}
          type={type}
          placeholder=" "
          className={`
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
            ${className}
          `}
          {...props}
        />

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
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;