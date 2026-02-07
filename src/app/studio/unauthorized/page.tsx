"use client";

import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";
import { ShieldX, ArrowLeft, LogOut } from "lucide-react";

export default function UnauthorizedPage() {
  const router = useRouter();
  const { signOut } = useClerk();

  return (
    <div className="min-h-screen bg-tiscu-bg flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 border border-tiscu-navy/15 flex items-center justify-center mx-auto mb-6">
          <ShieldX className="h-8 w-8 text-tiscu-steel" />
        </div>

        <h1 className="font-grotesk text-2xl font-medium text-tiscu-navy mb-3 tracking-tight">
          Access Restricted
        </h1>

        <p className="font-mono text-sm text-tiscu-steel leading-relaxed mb-8">
          This area is reserved for authorized TISCU consultants only. If you
          believe this is an error, please contact your administrator.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => router.push("/")}
            className="inline-flex items-center justify-center gap-2 border border-tiscu-navy/15 px-5 py-3 font-mono text-xs text-tiscu-navy uppercase tracking-wider transition-all duration-200 hover:border-tiscu-steel hover:bg-tiscu-steel/5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-tiscu-steel/20"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Home
          </button>
          <button
            onClick={() => signOut({ redirectUrl: "/" })}
            className="inline-flex items-center justify-center gap-2 border border-tiscu-navy bg-tiscu-navy px-5 py-3 font-mono text-xs text-tiscu-bg uppercase tracking-wider transition-all duration-200 hover:bg-transparent hover:text-tiscu-navy cursor-pointer focus:outline-none focus:ring-2 focus:ring-tiscu-steel/20"
          >
            <LogOut className="h-3.5 w-3.5" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
