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
        "h-13.5 rounded-xl px-4 bg-primary",
        "text-[18px] font-semibold leading-[120%] tracking-[-0.01em] text-white",
        "transition-opacity hover:opacity-90 disabled:opacity-50 focus:outline-none",
        fullWidth && "w-full",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
