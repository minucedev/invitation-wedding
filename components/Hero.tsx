import Countdown from "./Countdown";
import { getDict, type Locale } from "@/lib/i18n";

export default function Hero({ lang }: { lang: Locale }) {
  const t = getDict(lang).hero;
  return (
    <section className="relative h-screen w-full flex flex-col justify-center items-center text-center px-4 overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-black/25 z-10"></div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Khung cảnh cưới lãng mạn dưới ánh hoàng hôn: cô dâu và chú rể bên cổng hoa, in bóng trên mặt hồ tĩnh lặng và những ngọn đồi xa."
          className="w-full h-full object-cover object-[center_35%] scale-110"
          src="/images/hero.jpg"
        />
      </div>
      <div className="relative z-20 flex flex-col items-center animate-fade-in-up mt-[14vh] md:mt-[16vh]">
        <span className="font-label-caps text-label-caps text-white/90 tracking-[0.3em] mb-6">
          {t.kicker}
        </span>
        <h1 className="font-display-lg text-display-lg md:text-[80px] text-white mb-8 italic">
          {t.names}
        </h1>
        <Countdown lang={lang} />
      </div>
      <div className="absolute bottom-12 z-20 flex flex-col items-center gap-4">
        <span className="font-label-caps text-[10px] text-white/70 tracking-[0.3em]">
          {t.scrollDown}
        </span>
        <div className="w-[1px] h-12 bg-custom-gold animate-pulse-slow"></div>
      </div>
    </section>
  );
}
