"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { MobileShell } from "./components/layout/mobile-shell";
import { CinemaxLogo } from "./components/brand/cinemax-logo";

// Splash duration before redirecting to onboarding (ms).
const SPLASH_DURATION_MS = 2200;

export default function SplashPage() {
  const router = useRouter();

  useEffect(() => {
    // Preload the next route for a smoother transition.
    router.prefetch("/onboarding");
    const timer = setTimeout(() => {
      router.replace("/onboarding");
    }, SPLASH_DURATION_MS);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <MobileShell className="items-center justify-center">
      <main className="flex flex-1 items-center justify-center">
        <CinemaxLogo size={88} />
      </main>
    </MobileShell>
  );
}
