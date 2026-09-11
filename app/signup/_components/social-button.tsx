import type { ReactNode } from "react";

interface SocialButtonProps {
  label: string;
  icon: ReactNode;
  onClick?: () => void;
}

/**
 * Circular social sign-in button used on the auth landing screen.
 * `label` is exposed to assistive tech via aria-label.
 */
export function SocialButton({ label, icon, onClick }: SocialButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-soft text-white outline-none transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-blue-accent focus-visible:ring-offset-2 focus-visible:ring-offset-night"
    >
      {icon}
    </button>
  );
}
