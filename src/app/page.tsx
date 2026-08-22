import { HeroGate } from "@/components/navigation/HeroGate";
import { MoveIdentitySection } from "@/components/sections/MoveIdentitySection";
import { GallerySection } from "@/components/sections/GallerySection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ConnectSection } from "@/components/sections/ConnectSection";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main id="main" className="pb-16 md:pb-0">
      <HeroGate />
      <MoveIdentitySection />
      <GallerySection />
      <AboutSection />
      <ConnectSection />
      <Footer />
    </main>
  );
}
