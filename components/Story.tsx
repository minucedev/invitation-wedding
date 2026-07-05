import FadeIn from "./FadeIn";
import StoryImages from "./StoryImages";
import { getDict, type Locale } from "@/lib/i18n";

export default function Story({ lang }: { lang: Locale }) {
  const t = getDict(lang).story;
  return (
    <section
      className="py-section-gap px-margin-edge max-w-container-max mx-auto overflow-hidden"
      id="story"
    >
      <div className="grid md:grid-cols-12 gap-12 items-center">
        <FadeIn className="md:col-span-5 order-2 md:order-1 relative">
          <div className="absolute -left-12 -top-12 w-32 h-32 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cGF0aCBkPSJNMTAgNTBRMTAgMjAgNTAgMjBUNTAgNTBRNTAgODAgMTAgODBUMTAgNTBaIiBmaWxsPSIjNkExRTI1Ii8+PC9zdmc+')] bg-contain bg-no-repeat pointer-events-none"></div>
          <h2 className="font-headline-lg text-headline-lg text-custom-burgundy italic mb-8">
            {t.heading}
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed mb-6">
            {t.paragraphs[0]}
          </p>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed mb-6">
            {t.paragraphs[1]}
          </p>
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            {t.paragraphs[2]}
          </p>
        </FadeIn>
        <FadeIn className="md:col-span-7 order-1 md:order-2 relative h-[600px]">
          <StoryImages lang={lang} />
        </FadeIn>
      </div>
    </section>
  );
}
