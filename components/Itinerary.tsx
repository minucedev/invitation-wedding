import FadeIn from "./FadeIn";
import EventActions from "./EventActions";
import { events } from "@/lib/events";

export default function Itinerary() {
  const [morning, evening] = events;

  return (
    <section
      className="py-section-gap px-margin-edge max-w-container-max mx-auto"
      id="events"
    >
      <FadeIn>
        <h2 className="font-headline-lg text-headline-lg text-center text-primary italic mb-16">
          Chương Trình
        </h2>
        <div className="flex flex-col gap-0 max-w-3xl mx-auto relative">
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-[0.5px] bg-custom-gold -translate-x-1/2 hidden md:block"></div>

          {/* Morning Event */}
          <div className="py-12 hairline-t relative grid md:grid-cols-2 gap-8 items-center">
            <div className="md:text-right md:pr-12">
              <h4 className="font-display-lg-mobile text-display-lg-mobile text-custom-burgundy mb-2">
                {morning.displayTime}
              </h4>
              <p className="font-label-caps text-label-caps tracking-widest text-on-surface-variant">
                {morning.displayDate}
              </p>
              <p className="font-label-caps text-[10px] tracking-widest text-custom-gold mt-1">
                {morning.lunarDate}
              </p>
            </div>
            <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full border border-custom-gold bg-custom-light z-10"></div>
            <div className="md:pl-12">
              <h3 className="font-headline-md text-headline-md text-primary mb-4">
                {morning.title}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                {morning.description}
              </p>
              <p className="font-body-md text-body-md text-primary mb-6">
                {morning.locationName}
                <br />
                {morning.locationDetail}
              </p>
              <EventActions event={morning} />
            </div>
          </div>

          {/* Evening Event */}
          <div className="py-12 hairline-t hairline-b relative grid md:grid-cols-2 gap-8 items-center">
            <div className="md:text-right md:pr-12 md:order-1 order-2">
              <h3 className="font-headline-md text-headline-md text-primary mb-4">
                {evening.title}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                {evening.description}
              </p>
              <p className="font-body-md text-body-md text-primary mb-6">
                {evening.locationName}
                <br />
                {evening.locationDetail}
              </p>
              <div className="md:flex md:justify-end">
                <EventActions event={evening} />
              </div>
            </div>
            <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full border border-custom-gold bg-custom-light z-10"></div>
            <div className="md:pl-12 md:order-2 order-1">
              <h4 className="font-display-lg-mobile text-display-lg-mobile text-custom-burgundy mb-2">
                {evening.displayTime}
              </h4>
              <p className="font-label-caps text-label-caps tracking-widest text-on-surface-variant">
                {evening.displayDate}
              </p>
              <p className="font-label-caps text-[10px] tracking-widest text-custom-gold mt-1">
                {evening.lunarDate}
              </p>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
