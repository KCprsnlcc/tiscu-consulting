import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { ClerkProvider } from "@clerk/nextjs";
import LenisProvider from "@/components/providers/LenisProvider";
import PageTransitionProvider from "@/components/providers/PageTransitionProvider";
import { ConvexPublicProvider } from "@/components/providers/ConvexClientProvider";
import PageLoader from "@/components/ui/PageLoader";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "TISCU | Business Architecture + Strategy",
  description:
    "TISCU offers expert business architecture, strategy consulting, and management advisory services. Book a consultation today.",
  keywords: ["business architecture", "strategy consulting", "management advisory", "business consulting", "strategic planning"],
  authors: [{ name: "TISCU" }],
  creator: "TISCU",
  publisher: "TISCU",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.tiscuconsulting.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "TISCU | Business Architecture + Strategy",
    description: "TISCU offers expert business architecture, strategy consulting, and management advisory services. Book a consultation today.",
    url: "/",
    siteName: "TISCU",
    images: [
      {
        url: "/icons/logo.svg",
        width: 1200,
        height: 630,
        alt: "TISCU Logo",
        type: "image/svg+xml",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TISCU | Business Architecture + Strategy",
    description: "TISCU offers expert business architecture, strategy consulting, and management advisory services. Book a consultation today.",
    images: ["/icons/logo.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { url: "/icons/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "manifest",
        url: "/icons/site.webmanifest",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased overflow-x-hidden`}
      >
        <ClerkProvider>
          <ConvexPublicProvider>
            <PageTransitionProvider>
              <LenisProvider>
                {children}
                <PageLoader />
              </LenisProvider>
            </PageTransitionProvider>
          </ConvexPublicProvider>
          <Analytics />
        </ClerkProvider>
      </body>
    </html>
  );
}
