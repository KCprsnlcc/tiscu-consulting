"use client";

import { ReactNode, useEffect, useState } from "react";
import { useUser, useAuth } from "@clerk/nextjs";
import { useRouter, usePathname } from "next/navigation";
import { ConvexClerkProvider } from "@/components/providers/ConvexClientProvider";
import { Loader2 } from "lucide-react";

function StudioAuthGate({ children }: { children: ReactNode }) {
  const { user, isLoaded: userLoaded } = useUser();
  const { isLoaded: authLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    if (!authLoaded || !userLoaded) return;

    if (!isSignedIn) {
      setChecking(false);
      return;
    }

    const role = user?.publicMetadata?.role as string | undefined;

    if (
      pathname === "/studio/unauthorized" ||
      pathname.startsWith("/studio/sign-in")
    ) {
      setIsAuthorized(true);
      setChecking(false);
      return;
    }

    if (role === "consultant") {
      setIsAuthorized(true);
      setChecking(false);
    } else {
      router.replace("/studio/unauthorized");
      setChecking(false);
    }
  }, [authLoaded, userLoaded, isSignedIn, user, pathname, router]);

  if (!authLoaded || !userLoaded || checking) {
    return (
      <div className="min-h-screen bg-tiscu-bg flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-6 w-6 text-tiscu-steel animate-spin" />
          <span className="font-mono text-xs text-tiscu-steel uppercase tracking-wider">
            Verifying access...
          </span>
        </div>
      </div>
    );
  }

  if (
    !isAuthorized &&
    pathname !== "/studio/unauthorized" &&
    !pathname.startsWith("/studio/sign-in")
  ) {
    return null;
  }

  return <>{children}</>;
}

export default function StudioLayout({ children }: { children: ReactNode }) {
  return (
    <ConvexClerkProvider>
      <StudioAuthGate>{children}</StudioAuthGate>
    </ConvexClerkProvider>
  );
}
