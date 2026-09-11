interface SliderDotsProps {
  total: number;
  activeIndex: number;
  /** When provided, dots become buttons that jump to a step. */
  onSelect?: (index: number) => void;
}

/**
 * Progress dots for the onboarding slider.
 * The active dot is an elongated blue pill; the rest are muted dots.
 * When `onSelect` is given, dots are clickable/keyboard-operable buttons.
 */
export function SliderDots({ total, activeIndex, onSelect }: SliderDotsProps) {
  return (
    <div
      className="flex items-center gap-2"
      role="tablist"
      aria-label="Onboarding progress"
    >
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index === activeIndex;
        const bar = (
          <span
            className={`block h-2 rounded-full transition-all duration-300 ${
              isActive ? "w-6 bg-blue-accent" : "w-2 bg-white/20"
            }`}
          />
        );

        if (!onSelect) {
          return (
            <span key={index} role="tab" aria-selected={isActive}>
              {bar}
            </span>
          );
        }

        return (
          <button
            key={index}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={`Go to step ${index + 1}`}
            onClick={() => onSelect(index)}
            className="flex items-center rounded-full p-1 outline-none focus-visible:ring-2 focus-visible:ring-blue-accent"
          >
            {bar}
          </button>
        );
      })}
    </div>
  );
}
