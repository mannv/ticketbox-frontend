import Link from "next/link";
import { MobileShell } from "../components/layout/mobile-shell";
import { Button } from "../components/ui/button";
import { CinemaxLogo } from "../components/brand/cinemax-logo";
import { SocialButton } from "./_components/social-button";
import {
  AppleIcon,
  FacebookIcon,
  GoogleIcon,
} from "./_components/social-icons";

/**
 * Auth landing screen ("Log in/Sign up").
 * Entry point after onboarding: brand, primary Sign Up CTA,
 * a link to Login, and social sign-in options.
 */
export default function AuthLandingPage() {
  return (
    <MobileShell className="bg-night">
      <main className="flex flex-1 flex-col px-6 pb-10 pt-16">
        {/* Brand */}
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <CinemaxLogo size={88} />
          <p className="max-w-[16rem] text-center text-sm leading-relaxed text-grey">
            Enter your registered account to sign up
          </p>
        </div>

        {/* Primary actions */}
        <div className="flex flex-col gap-6">
          <Button asChild variant="primary" fullWidth>
            <Link href="/register">Sign Up</Link>
          </Button>

          <p className="text-center text-sm text-grey">
            I already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-blue-accent outline-none hover:underline focus-visible:underline"
            >
              Login
            </Link>
          </p>
        </div>

        {/* Divider */}
        <div className="my-8 flex items-center gap-4">
          <span className="h-px flex-1 bg-white/10" />
          <span className="text-sm text-grey">Or sign up with</span>
          <span className="h-px flex-1 bg-white/10" />
        </div>

        {/* Social sign-in */}
        <div className="flex items-center justify-center gap-6">
          <SocialButton label="Sign up with Google" icon={<GoogleIcon />} />
          <SocialButton label="Sign up with Facebook" icon={<FacebookIcon />} />
          <SocialButton label="Sign up with Apple" icon={<AppleIcon />} />
        </div>
      </main>
    </MobileShell>
  );
}
