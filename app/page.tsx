import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import Couple from "@/components/Couple";
import Itinerary from "@/components/Itinerary";
import Gallery from "@/components/Gallery";
import WelcomeRemarks from "@/components/WelcomeRemarks";
import Rsvp from "@/components/Rsvp";
import Footer from "@/components/Footer";
import PageFade from "@/components/PageFade";
import MusicPlayer from "@/components/MusicPlayer";
import WishesToast from "@/components/WishesToast";
import EnvelopeIntro from "@/components/EnvelopeIntro";

export default function Home() {
  return (
    <PageFade>
      <EnvelopeIntro />
      <Navbar />
      <main>
        <Hero />
        <Story />
        <Couple />
        <Itinerary />
        <Gallery />
        <WelcomeRemarks />
        <Rsvp />
      </main>
      <Footer />
      <MusicPlayer />
      <WishesToast />
    </PageFade>
  );
}
