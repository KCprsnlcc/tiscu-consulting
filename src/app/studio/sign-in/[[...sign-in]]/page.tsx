"use client";

import { SignIn } from "@clerk/nextjs";
import { Lock } from "lucide-react";

export default function SignInPage() {
  return (
    <>
      {/* Header Section */}
      <div>
        
        <div className="space-y-3">
          <span className="font-mono text-[10px] text-tiscu-steel uppercase tracking-widest block">
            TISCU Studio
          </span>
          <h1 className="font-grotesk text-3xl font-medium text-tiscu-navy tracking-tight">
            Consultant Portal
          </h1>
          <div className="flex items-center justify-center gap-2 text-tiscu-steel">
            <Lock className="w-3 h-3" />
            <p className="font-mono text-xs">
              Authorized consultants only
            </p>
          </div>
        </div>
      </div>

      {/* Sign-in Form */}
      <SignIn
        afterSignInUrl="/studio/dashboard"
        redirectUrl="/studio/dashboard"
      />

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="font-mono text-[10px] text-tiscu-muted/60 uppercase tracking-wider">
          Secure Access • TISCU Consulting Platform
        </p>
      </div>
    </>
  );
}
