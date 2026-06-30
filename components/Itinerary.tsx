"use client";

import { Fragment, useState } from "react";
import FadeIn from "./FadeIn";
import EventActions from "./EventActions";
import { events, type WeddingEvent } from "@/lib/events";

const brideEvents = events.filter((e) => e.side === "bride");
const groomEvents = events.filter((e) => e.side === "groom");
const rowCount = Math.max(brideEvents.length, groomEvents.length);

function EventCard({
  event,
  className,
}: {
  event?: WeddingEvent;
  className?: string;
}) {
  // Empty placeholder keeps the grid aligned when a side has fewer events.
  if (!event) return <div className={className} />;
  return (
    <div
      className={`py-10 hairline-t flex-col items-center text-center h-full ${
        className ?? ""
      }`}
    >
      <h4 className="font-display-lg-mobile text-display-lg-mobile text-custom-burgundy mb-1">
        {event.displayTime}
      </h4>
      <p className="font-label-caps text-label-caps tracking-widest text-on-surface-variant">
        {event.displayDate}
      </p>
      <p className="font-label-caps text-[10px] tracking-widest text-custom-gold mt-1 mb-5">
        {event.lunarDate}
      </p>
      <h3 className="font-headline-md text-headline-md text-primary mb-3">
        {event.title}
      </h3>
      <p className="font-body-md text-body-md text-on-surface-variant mb-4 max-w-sm">
        {event.description}
      </p>

      {/* Location + actions anchored to the bottom so both columns line up
          regardless of description length → balanced rows. */}
      <div className="mt-auto w-full flex flex-col items-center">
        <p className="font-body-md text-body-md text-primary mb-6">
          {event.locationName}
          <br />
          {event.locationDetail}
        </p>
        <EventActions event={event} />
      </div>
    </div>
  );
}

type Side = WeddingEvent["side"];

export default function Itinerary() {
  const [active, setActive] = useState<Side>("bride");

  // On mobile only the active side shows (toggled below); on md+ both show.
  const showBride = active === "bride" ? "flex" : "hidden";
  const showGroom = active === "groom" ? "flex" : "hidden";

  const tabClass = (side: Side) =>
    `px-6 py-2 font-label-caps text-label-caps tracking-widest transition-colors duration-300 ${
      active === side
        ? "bg-custom-burgundy text-white"
        : "text-custom-burgundy hover:bg-custom-burgundy/10"
    }`;

  return (
    <section
      className="py-section-gap px-margin-edge max-w-container-max mx-auto"
      id="events"
    >
      <FadeIn>
        <h2 className="font-headline-lg text-headline-lg text-center text-primary italic mb-16">
          Chương Trình
        </h2>

        {/* Mobile toggle — switch between the two families */}
        <div className="flex md:hidden justify-center mb-10">
          <div className="inline-flex border border-custom-gold">
            <button
              type="button"
              onClick={() => setActive("bride")}
              className={tabClass("bride")}
              aria-pressed={active === "bride"}
            >
              Nhà Gái
            </button>
            <button
              type="button"
              onClick={() => setActive("groom")}
              className={tabClass("groom")}
              aria-pressed={active === "groom"}
            >
              Nhà Trai
            </button>
          </div>
        </div>

        <div className="relative grid md:grid-cols-2 gap-x-10 max-w-4xl mx-auto">
          {/* Continuous vertical divider between the two sides (desktop only) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-custom-gold/30 -translate-x-1/2"></div>

          {/* Column headers (desktop only — mobile uses the toggle above) */}
          <h3 className="hidden md:block font-label-caps text-label-caps tracking-[0.3em] text-custom-gold text-center md:pr-10">
            Nhà Gái
          </h3>
          <h3 className="hidden md:block font-label-caps text-label-caps tracking-[0.3em] text-custom-gold text-center md:pl-10">
            Nhà Trai
          </h3>

          {/* Event rows — each row stretches so both sides share its height */}
          {Array.from({ length: rowCount }).map((_, i) => (
            <Fragment key={i}>
              <EventCard
                event={brideEvents[i]}
                className={`${showBride} md:flex md:pr-10`}
              />
              <EventCard
                event={groomEvents[i]}
                className={`${showGroom} md:flex md:pl-10`}
              />
            </Fragment>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
