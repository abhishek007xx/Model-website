import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SmoothScrollProvider } from "@/components/portfolio/smooth-scroll-provider";
import { CursorFollower } from "@/components/portfolio/cursor-follower";
import { Preloader } from "@/components/portfolio/preloader";
import { ScrollProgress } from "@/components/portfolio/scroll-progress";
import { GlobalGrain } from "@/components/portfolio/global-grain";
import { NavDots } from "@/components/portfolio/nav-dots";
import { ScrollProgressRail } from "@/components/portfolio/scroll-velocity";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Mizuhara — Fashion Model & Editorial Muse",
  description:
    "Mizuhara is an international fashion model represented for editorial, runway, and campaign work. Explore the portfolio, vital stats, and booking information.",
  keywords: [
    "Mizuhara",
    "fashion model",
    "editorial model",
    "runway model",
    "model portfolio",
    "fashion portfolio",
    "booking",
  ],
  authors: [{ name: "Mizuhara" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Mizuhara — Fashion Model & Editorial Muse",
    description:
      "International fashion model. Editorial, runway & campaign portfolio.",
    siteName: "Mizuhara",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mizuhara — Fashion Model & Editorial Muse",
    description:
      "International fashion model. Editorial, runway & campaign portfolio.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${playfair.variable} antialiased bg-background text-foreground`}
      >
        <SmoothScrollProvider>
          <Preloader />
          <CursorFollower />
          <ScrollProgress />
          <ScrollProgressRail />
          <NavDots />
          <GlobalGrain />
          {children}
          <Toaster />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
