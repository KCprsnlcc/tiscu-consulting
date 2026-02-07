"use client";

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-tiscu-bg flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span className="font-mono text-[10px] text-tiscu-steel uppercase tracking-widest">
            TISCU Studio
          </span>
          <h1 className="font-grotesk text-2xl font-medium text-tiscu-navy mt-2 tracking-tight">
            Sign In
          </h1>
          <p className="font-mono text-xs text-tiscu-steel mt-1">
            Authorized consultants only
          </p>
        </div>
        <SignIn
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-none border border-tiscu-navy/10 bg-white/60",
              headerTitle: "font-grotesk text-tiscu-navy",
              headerSubtitle: "font-mono text-tiscu-steel text-xs",
              formButtonPrimary:
                "bg-tiscu-navy hover:bg-tiscu-steel transition-colors duration-200 text-sm font-mono uppercase tracking-wider",
              formFieldInput:
                "border-tiscu-navy/15 focus:border-tiscu-steel focus:ring-tiscu-steel/20 font-mono text-sm",
              formFieldLabel: "font-mono text-xs text-tiscu-steel uppercase tracking-wider",
              footerActionLink: "text-tiscu-steel hover:text-tiscu-navy font-mono text-xs",
            },
          }}
          afterSignInUrl="/studio/dashboard"
          signUpUrl="/studio/sign-up"
        />
      </div>
    </div>
  );
}
