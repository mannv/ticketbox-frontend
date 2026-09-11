import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "orange" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  children: ReactNode;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-blue-accent text-white hover:bg-blue-accent/90 focus-visible:ring-blue-accent",
  orange:
    "bg-orange text-white hover:bg-orange/90 focus-visible:ring-orange",
  outline:
    "border border-blue-accent text-blue-accent hover:bg-blue-accent/10 focus-visible:ring-blue-accent",
};

/**
 * Pill button matching the Cinemax design.
 * Includes hover + keyboard focus states required for web.
 */
export function Button({
  variant = "primary",
  fullWidth = false,
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex min-h-[52px] items-center justify-center gap-2 rounded-pill px-6 text-base font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-dark disabled:opacity-60 ${
        VARIANT_CLASSES[variant]
      } ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
