"use client";

import { useUser, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function StudioPage() {
  const { user, isSignedIn, isLoaded: userLoaded } = useUser();
  const { isLoaded: authLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoaded || !userLoaded) return;

    if (isSignedIn && user) {
      // Check user role before redirecting
      const role = user?.publicMetadata?.role as string | undefined;
      
      if (role === "consultant") {
        router.replace("/studio/dashboard");
      } else {
        // Non-consultant users go to unauthorized page
        router.replace("/studio/unauthorized");
      }
    } else {
      router.replace("/studio/sign-in");
    }
  }, [isSignedIn, authLoaded, userLoaded, user, router]);

  if (!authLoaded || !userLoaded) {
    return (
      <div className="min-h-screen bg-tiscu-bg flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-6 w-6 text-tiscu-steel animate-spin" />
          <span className="font-mono text-xs text-tiscu-steel uppercase tracking-wider">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-tiscu-bg flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-6 w-6 text-tiscu-steel animate-spin" />
        <span className="font-mono text-xs text-tiscu-steel uppercase tracking-wider">
          Redirecting...
        </span>
      </div>
    </div>
  );
}
