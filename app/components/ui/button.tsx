import type { ButtonHTMLAttributes, ReactElement, ReactNode } from "react";
import { cloneElement, isValidElement } from "react";

type ButtonVariant = "primary" | "orange" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  fullWidth?: boolean;
  /**
   * Render the single child element (e.g. a Next.js <Link>) with the button
   * styles instead of a <button>. Use for navigation actions so the correct
   * <a> semantics are preserved.
   */
  asChild?: boolean;
  children: ReactNode;
}

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary:
    "bg-blue-accent text-white hover:bg-blue-accent/90 focus-visible:ring-blue-accent",
  orange: "bg-orange text-white hover:bg-orange/90 focus-visible:ring-orange",
  outline:
    "border border-blue-accent text-blue-accent hover:bg-blue-accent/10 focus-visible:ring-blue-accent",
};

const BASE_CLASSES =
  "inline-flex min-h-[52px] items-center justify-center gap-2 rounded-pill px-6 text-base font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-dark disabled:opacity-60";

/**
 * Pill button matching the Cinemax design.
 * Includes hover + keyboard focus states required for web.
 * Set `asChild` to apply the styles to a child element (e.g. <Link>).
 */
export function Button({
  variant = "primary",
  fullWidth = false,
  asChild = false,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const classes = `${BASE_CLASSES} ${VARIANT_CLASSES[variant]} ${
    fullWidth ? "w-full" : ""
  } ${className}`;

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<{ className?: string }>;
    return cloneElement(child, {
      className: `${classes} ${child.props.className ?? ""}`.trim(),
    });
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
