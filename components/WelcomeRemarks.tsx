import FadeIn from "./FadeIn";
import { getDict, type Locale } from "@/lib/i18n";

export default function WelcomeRemarks({ lang }: { lang: Locale }) {
  const t = getDict(lang).welcome;
  return (
    <section
      className="py-section-gap px-margin-edge bg-custom-light text-center"
      id="welcome"
    >
      <FadeIn className="max-w-3xl mx-auto">
        <h2 className="font-headline-lg text-headline-lg text-primary italic mb-8">
          {t.heading}
        </h2>
        <p className="font-display-lg-mobile text-display-lg-mobile text-on-surface-variant leading-relaxed opacity-80">
          &ldquo;{t.quote}&rdquo;
        </p>
      </FadeIn>
    </section>
  );
}
