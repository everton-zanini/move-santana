import type { Metadata } from "next";
import { Anton, Chakra_Petch, Inter } from "next/font/google";
import { LazyMotion, domAnimation, MotionConfig } from "motion/react";
import { site } from "@/data/site";
import { ReducedMotionProvider } from "@/providers/ReducedMotionProvider";
import { ExplorationProvider } from "@/providers/ExplorationProvider";
import { ActiveSectionProvider } from "@/providers/ActiveSectionProvider";
import { GameOverlayProvider } from "@/providers/GameOverlayProvider";
import { MusicPlayerProvider } from "@/providers/MusicPlayerProvider";
import { SkipToContent } from "@/components/navigation/SkipToContent";
import { GrainOverlay } from "@/components/effects/GrainOverlay";
import { CustomCursor } from "@/components/effects/CustomCursor";
import { BackgroundInertGate } from "@/components/navigation/BackgroundInertGate";
import "./globals.css";

const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton" });
const chakraPetch = Chakra_Petch({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-chakra-petch",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.seo.title,
    template: `%s | ${site.name}`,
  },
  description: site.seo.description,
  openGraph: {
    title: site.seo.title,
    description: site.seo.description,
    url: site.url,
    siteName: site.name,
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.seo.title,
    description: site.seo.description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${anton.variable} ${chakraPetch.variable} ${inter.variable} h-full`}
    >
      <body
        className="min-h-full bg-move-black font-sans text-move-white antialiased"
        suppressHydrationWarning
      >
        <LazyMotion features={domAnimation} strict>
          <MotionConfig reducedMotion="user">
            <ReducedMotionProvider>
              <ExplorationProvider>
                <ActiveSectionProvider>
                  <GameOverlayProvider>
                    <MusicPlayerProvider>
                      <BackgroundInertGate>
                        <SkipToContent />
                        <GrainOverlay />
                        <CustomCursor />
                        {children}
                      </BackgroundInertGate>
                    </MusicPlayerProvider>
                  </GameOverlayProvider>
                </ActiveSectionProvider>
              </ExplorationProvider>
            </ReducedMotionProvider>
          </MotionConfig>
        </LazyMotion>
      </body>
    </html>
  );
}
