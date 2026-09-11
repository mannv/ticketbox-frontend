interface NextButtonProps {
  /** Current step index (0-based). */
  step: number;
  /** Total number of steps. */
  total: number;
  onClick: () => void;
}

/**
 * Circular "Next" button with a progress ring, matching the onboarding design.
 * The ring fills as the user advances through the steps.
 */
export function NextButton({ step, total, onClick }: NextButtonProps) {
  const size = 80;
  const stroke = 4;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (step + 1) / total;
  const dashOffset = circumference * (1 - progress);

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Next"
      className="relative flex items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-blue-accent focus-visible:ring-offset-2 focus-visible:ring-offset-dark"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        className="absolute -rotate-90"
        aria-hidden="true"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          className="text-white/10"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          className="text-blue-accent transition-[stroke-dashoffset] duration-300"
        />
      </svg>
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-accent text-white">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M9 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
  );
}
