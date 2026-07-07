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
import GiftFab from "@/components/GiftFab";
import WishesToast from "@/components/WishesToast";
import EnvelopeIntro from "@/components/EnvelopeIntro";
import type { Locale } from "@/lib/i18n";

/**
 * The full invitation page, rendered in the given language. Both routes reuse
 * this: `/` passes lang="vi" (the original copy) and `/en` passes lang="en".
 */
export default function SiteContent({ lang }: { lang: Locale }) {
  return (
    <PageFade>
      <EnvelopeIntro lang={lang} />
      <Navbar lang={lang} />
      <main>
        <Hero lang={lang} />
        <Story lang={lang} />
        <Couple lang={lang} />
        <Itinerary lang={lang} />
        <Gallery lang={lang} />
        <WelcomeRemarks lang={lang} />
        <Rsvp lang={lang} />
      </main>
      <Footer lang={lang} />
      <GiftFab lang={lang} />
      <MusicPlayer lang={lang} />
      <WishesToast lang={lang} />
    </PageFade>
  );
}
