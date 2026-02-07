"use client";

import { SignIn } from "@clerk/nextjs";
import { Lock } from "lucide-react";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-tiscu-bg flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-12">
          
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
          appearance={{
            elements: {
              rootBox: "mx-auto bg-white/80 backdrop-blur-sm border border-tiscu-navy/10 rounded-2xl shadow-xl p-8",
              card: "shadow-none border-0 bg-transparent",
              headerTitle: "font-grotesk text-tiscu-navy text-xl font-medium",
              headerSubtitle: "font-mono text-tiscu-steel text-xs hidden",
              socialButtonsBlock: "hidden",
              dividerRow: "hidden",
              form: "space-y-5",
              formField: "space-y-2",
              formFieldLabel: "font-mono text-xs text-tiscu-steel uppercase tracking-wider mb-2 block",
              formFieldInput: 
                "border-tiscu-navy/20 bg-white/60 focus:border-tiscu-steel focus:ring-2 focus:ring-tiscu-steel/20 " +
                "font-mono text-sm text-tiscu-navy placeholder-tiscu-muted/50 " +
                "rounded-lg px-4 py-3 transition-all duration-200",
              formButtonPrimary:
                "w-full bg-tiscu-navy hover:bg-tiscu-steel focus:bg-tiscu-steel " +
                "text-white font-mono text-xs uppercase tracking-wider py-3 px-4 " +
                "rounded-lg transition-all duration-200 transform hover:scale-[1.02] " +
                "shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-tiscu-steel/20",
              formButtonSecondary: "hidden",
              footerAction: "mt-6 pt-6 border-t border-tiscu-navy/10",
              footerActionLink: 
                "text-tiscu-steel hover:text-tiscu-navy font-mono text-xs " +
                "transition-colors duration-200 underline decoration-2 underline-offset-4",
              identityPreview: 
                "bg-tiscu-navy/5 border-tiscu-navy/10 rounded-lg p-3 mb-4",
              identityPreviewText: "font-mono text-xs text-tiscu-steel",
              alertBox: 
                "bg-tiscu-navy/5 border-tiscu-steel/20 rounded-lg p-3",
              alertText: "font-mono text-xs text-tiscu-navy",
            },
          }}
          afterSignInUrl="/studio/dashboard"
          redirectUrl="/studio/dashboard"
        />

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="font-mono text-[10px] text-tiscu-muted/60 uppercase tracking-wider">
            Secure Access • TISCU Consulting Platform
          </p>
        </div>
      </div>
    </div>
  );
}
