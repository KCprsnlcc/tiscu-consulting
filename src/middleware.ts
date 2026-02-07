import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/studio",
  "/studio/sign-in(.*)",
  "/studio/unauthorized",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req)) {
    return;
  }
  
  // For protected routes, check authentication
  const { userId } = await auth();
  if (!userId) {
    // Redirect to sign-in page
    const signInUrl = new URL("/studio/sign-in", req.url);
    return Response.redirect(signInUrl);
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|xml)).*)",
    "/(api|trpc)(.*)",
  ],
};
