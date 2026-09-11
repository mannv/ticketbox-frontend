interface CinemaxLogoProps {
  /** Icon size in px. */
  size?: number;
  /** Show the CINEMAX wordmark under the icon. */
  showWordmark?: boolean;
  className?: string;
}

/**
 * Cinemax brand logo: a "live TV" glyph plus the CINEMAX wordmark.
 * Icon uses currentColor so it inherits the surrounding text color.
 */
export function CinemaxLogo({
  size = 88,
  showWordmark = true,
  className = "",
}: CinemaxLogoProps) {
  return (
    <div
      className={`flex flex-col items-center gap-6 text-blue-accent ${className}`}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 88 88"
        fill="none"
        role="img"
        aria-label="Cinemax"
      >
        <rect
          x="6"
          y="24"
          width="76"
          height="52"
          rx="10"
          stroke="currentColor"
          strokeWidth="6"
        />
        <path
          d="M30 12L44 26L58 12"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M38 39L56 50L38 61V39Z"
          fill="currentColor"
        />
      </svg>
      {showWordmark && (
        <span className="font-heading text-[28px] font-semibold tracking-wide">
          CINEMAX
        </span>
      )}
    </div>
  );
}
