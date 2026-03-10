import { clsx } from "clsx";
import { type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
}

export function Button({
  fullWidth,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "h-13.5 rounded-xl px-4",
        "text-[18px] font-semibold leading-[120%] tracking-[-0.01em] text-white",
        "transition-opacity hover:opacity-90 disabled:opacity-50 focus:outline-none",
        "[background:linear-gradient(to_bottom,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0)_100%),#242EDB]",
        "[box-shadow:inset_0_0_0_1px_#367AFF]",
        fullWidth && "w-full",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
