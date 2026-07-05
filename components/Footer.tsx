import { getDict, type Locale } from "@/lib/i18n";

export default function Footer({ lang }: { lang: Locale }) {
  const t = getDict(lang).footer;
  return (
    <footer className="bg-surface-container-low w-full py-section-gap border-t border-outline-variant/30 flex flex-col items-center gap-unit px-margin-edge text-center">
      <h2 className="font-headline-md text-headline-md text-primary italic mb-4">
        {t.names}
      </h2>
      <div className="flex gap-6 mb-8">
        <a
          className="font-body-md text-body-md text-on-surface-variant opacity-60 hover:text-secondary transition-colors duration-300"
          href="#"
        >
          {t.gift}
        </a>
        <a
          className="font-body-md text-body-md text-on-surface-variant opacity-60 hover:text-secondary transition-colors duration-300"
          href="#"
        >
          {t.contact}
        </a>
        <a
          className="font-body-md text-body-md text-on-surface-variant opacity-60 hover:text-secondary transition-colors duration-300"
          href="#"
        >
          {t.map}
        </a>
      </div>
      <p className="font-body-md text-body-md text-on-surface-variant opacity-60">
        {t.credit}
      </p>
    </footer>
  );
}
