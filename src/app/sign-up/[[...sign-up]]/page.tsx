import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_50%_40%,rgba(200,140,50,0.06),transparent)]" />
      <div className="relative z-10">
        <SignUp fallbackRedirectUrl="/dashboard" signInUrl="/sign-in" />
      </div>
    </div>
  );
}
