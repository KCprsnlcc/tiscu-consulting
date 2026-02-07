"use client";

import { SignIn } from "@clerk/nextjs";
import { Lock, Shield } from "lucide-react";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-tiscu-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md mx-auto">
        {/* Header Section */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/50 backdrop-blur-sm rounded-full border border-tiscu-navy/10">
            <Shield className="w-4 h-4 text-tiscu-steel" />
            <span className="font-mono text-[10px] text-tiscu-steel uppercase tracking-widest">
              TISCU Studio
            </span>
          </div>
          
          <div className="mt-4">
            <h1 className="font-grotesk text-4xl font-medium text-tiscu-navy tracking-tight">
              Consultant Portal
            </h1>
            <p className="font-mono text-sm text-tiscu-steel mt-2">
              Secure access for authorized consultants. Enter your credentials to continue.
            </p>
          </div>
        </div>

        {/* Clerk Sign-in Component */}
        <div className="mt-8 flex justify-center">
          <div className="w-full">
            <SignIn
              appearance={{
                elements: {
                  // Root container
                  rootBox: "w-full mx-auto",
                  card: "w-full bg-transparent border-0 shadow-none p-0 mx-auto",
                  
                  // Social buttons (hidden for consultant portal)
                  socialButtonsBlock: "hidden",
                  socialButtonsDivider: "hidden",
                  dividerRow: "hidden",
                  
                  // Form fields
                  formFieldLabel: "font-mono text-xs text-tiscu-steel uppercase tracking-wider block mb-2",
                  formFieldInput: 
                    "w-full bg-white/60 border border-tiscu-navy/20 rounded-lg " +
                    "font-mono text-sm text-tiscu-navy placeholder-tiscu-muted/50 " +
                    "px-4 py-3 transition-all duration-200 " +
                    "focus:outline-none focus:border-tiscu-steel focus:ring-2 focus:ring-tiscu-steel/20",
                  
                  // Buttons
                  formButtonPrimary:
                    "w-full bg-tiscu-navy hover:bg-tiscu-steel focus:bg-tiscu-steel " +
                    "text-white font-mono text-xs uppercase tracking-wider py-4 px-6 " +
                    "rounded-lg transition-all duration-200 transform hover:scale-[1.02] " +
                    "shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-tiscu-steel/20",
                  formButtonSecondary: "hidden",
                  
                  // Links and footer
                  footerAction: "mt-4 pt-4 border-t border-tiscu-navy/10",
                  footerActionLink: 
                    "text-tiscu-steel hover:text-tiscu-navy font-mono text-xs " +
                    "transition-colors duration-200 underline decoration-2 underline-offset-4",
                  
                  // 2FA and verification
                  identityPreview: 
                    "bg-tiscu-navy/5 border border-tiscu-navy/10 rounded-lg p-4 mb-2",
                  identityPreviewText: "font-mono text-xs text-tiscu-steel",
                  identityPreviewCard: "bg-transparent border-0 shadow-none p-0",
                  
                  // Error states
                  alertBox: 
                    "bg-tiscu-navy/5 border border-tiscu-steel/20 rounded-lg p-3 mb-2",
                  alertText: "font-mono text-xs text-tiscu-navy",
                  alertIcon: "text-tiscu-steel",
                  
                  // 2FA specific styling
                  formResendCodeLink:
                    "text-tiscu-steel hover:text-tiscu-navy font-mono text-xs " +
                    "transition-colors duration-200 underline decoration-2 underline-offset-4",
                  
                  // Loading states
                  loading: "opacity-50 pointer-events-none",
                  
                  // Additional form elements
                  formButton: "w-full",
                  
                  // Text inputs specific
                  textInput: "w-full",
                  passwordInput: "w-full",
                  
                  // Container styling
                  container: "w-full mx-auto",
                  main: "w-full mx-auto",
                  footer: "text-center mt-2 mx-auto",
                  
                  // Strategy buttons (for 2FA)
                  strategyButton: 
                    "w-full bg-white/60 border border-tiscu-navy/20 rounded-lg " +
                    "font-mono text-sm text-tiscu-navy px-4 py-3 transition-all duration-200 " +
                    "hover:bg-tiscu-navy/5 hover:border-tiscu-steel",
                  strategyButtonSelected: 
                    "w-full bg-tiscu-navy/10 border-tiscu-steel rounded-lg " +
                    "font-mono text-sm text-tiscu-navy px-4 py-3",
                },
              }}
              afterSignInUrl="/studio/dashboard"
              redirectUrl="/studio/dashboard"
              signUpUrl="/studio/sign-up"
              fallbackRedirectUrl="/studio/dashboard"
            />
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-tiscu-navy/5 rounded-lg border border-tiscu-navy/10">
            <Lock className="w-3 h-3 text-tiscu-steel" />
            <p className="font-mono text-xs text-tiscu-steel">
              Authorized consultants only
            </p>
          </div>
        </div>

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
