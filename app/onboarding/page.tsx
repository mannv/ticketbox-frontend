"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MobileShell } from "../components/layout/mobile-shell";
import { Button } from "../components/ui/button";
import { SliderDots } from "./_components/slider-dots";
import { NextButton } from "./_components/next-button";
import { useSwipe } from "../hooks/use-swipe";

interface OnboardingStep {
  image: string;
  title: string;
  description: string;
}

const STEPS: OnboardingStep[] = [
  {
    image: "/images/onboarding/onboarding-1.png",
    title: "The biggest international and local film streaming",
    description:
      "Ullamcorper imperdiet urna id non sed est sem. Rhoncus amet, enim purus gravida donec aliquet.",
  },
  {
    image: "/images/onboarding/onboarding-2.png",
    title: "Our service brings together your favorite series",
    description:
      "Ullamcorper imperdiet urna id non sed est sem. Rhoncus amet, enim purus gravida donec aliquet.",
  },
  {
    image: "/images/onboarding/onboarding-3.png",
    title: "Offers ad-free viewing of high quality",
    description:
      "Ullamcorper imperdiet urna id non sed est sem. Rhoncus amet, enim purus gravida donec aliquet.",
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  const isFirstStep = step === 0;
  const isLastStep = step === STEPS.length - 1;
  const current = STEPS[step];

  const goNext = () => {
    if (isLastStep) {
      router.push("/signup");
      return;
    }
    setStep((prev) => prev + 1);
  };

  const goBack = () => setStep((prev) => Math.max(0, prev - 1));

  const skip = () => router.push("/signup");

  // Swipe left = next step, swipe right = previous step.
  // On the last step, swiping left does nothing (avoid leaving the page by accident).
  const swipeHandlers = useSwipe({
    onSwipeLeft: () => {
      if (!isLastStep) setStep((prev) => prev + 1);
    },
    onSwipeRight: goBack,
  });

  return (
    <MobileShell>
      <main
        className="flex flex-1 flex-col touch-pan-y select-none"
        {...swipeHandlers}
      >
        {/* Poster area */}
        <div className="relative h-[52vh] min-h-[320px] w-full overflow-hidden">
          <Image
            src={current.image}
            alt=""
            fill
            priority
            draggable={false}
            sizes="(max-width: 480px) 100vw, 480px"
            className="object-cover"
          />
          {/* Gradient fade into the dark background */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-dark/20 to-dark" />

          {/* Back button — only after the first step */}
          {!isFirstStep && (
            <button
              type="button"
              onClick={goBack}
              aria-label="Back"
              className="absolute left-6 top-6 flex h-9 w-9 items-center justify-center rounded-full bg-dark/40 text-white outline-none backdrop-blur transition-colors hover:bg-dark/70 focus-visible:ring-2 focus-visible:ring-blue-accent"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M15 6l-6 6 6 6"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}

          {/* Skip link (web affordance) */}
          <button
            type="button"
            onClick={skip}
            className="absolute right-6 top-6 rounded-full px-3 py-1 text-sm font-medium text-white-grey outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-blue-accent"
          >
            Skip
          </button>
        </div>

        {/* Text + controls */}
        <div className="flex flex-1 flex-col items-center gap-8 px-6 pb-10 text-center">
          <div className="flex flex-col items-center gap-4">
            <h1 className="font-heading text-2xl font-semibold leading-snug text-white">
              {current.title}
            </h1>
            <p className="max-w-xs text-sm leading-relaxed text-grey">
              {current.description}
            </p>
          </div>

          {/* Dots are clickable to jump between steps */}
          <SliderDots
            total={STEPS.length}
            activeIndex={step}
            onSelect={setStep}
          />

          <div className="mt-auto flex w-full flex-col items-center gap-4">
            {isLastStep ? (
              <Button variant="primary" fullWidth onClick={goNext}>
                Sign Up
              </Button>
            ) : (
              <NextButton step={step} total={STEPS.length} onClick={goNext} />
            )}

            {/* Text back control below the primary action */}
            {!isFirstStep && (
              <button
                type="button"
                onClick={goBack}
                className="rounded-full px-3 py-1 text-sm font-medium text-grey outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-blue-accent"
              >
                Back
              </button>
            )}
          </div>
        </div>
      </main>
    </MobileShell>
  );
}
