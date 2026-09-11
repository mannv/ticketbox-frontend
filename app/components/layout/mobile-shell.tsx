import type { ReactNode } from "react";

interface MobileShellProps {
  children: ReactNode;
  /** Extra classes for the inner container. */
  className?: string;
}

/**
 * Centered mobile-web container.
 * The Figma source is a 375px phone mockup; on web we constrain to a
 * readable max-width and center it, rather than hardcoding 375px.
 */
export function MobileShell({ children, className = "" }: MobileShellProps) {
  return (
    <div className="flex min-h-dvh justify-center bg-dark">
      <div
        className={`relative flex w-full max-w-[480px] flex-1 flex-col ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
