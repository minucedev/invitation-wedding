"use client";

import { useState } from "react";
import FadeIn from "./FadeIn";
import EventActions from "./EventActions";
import { events, type WeddingEvent } from "@/lib/events";

const brideEvents = events.filter((e) => e.side === "bride");
const groomEvents = events.filter((e) => e.side === "groom");

type Side = WeddingEvent["side"];

/** Small gold diamond flourish flanked by hairlines — reused for ornaments. */
function Ornament({ className = "" }: { className?: string }) {
  return (
    <span className={`flex items-center justify-center gap-3 ${className}`}>
      <span className="h-px w-10 bg-custom-gold/50" />
      <span className="h-1.5 w-1.5 rotate-45 bg-custom-gold" />
      <span className="h-px w-10 bg-custom-gold/50" />
    </span>
  );
}

/**
 * One family's timeline. Every event on a side shares the same date, so the date
 * is hoisted into the header (shown once). Events hang off a single vertical gold
 * rail with diamond nodes — soft, editorial, no boxy cards.
 */
function FamilyTimeline({
  label,
  sideEvents,
  className = "",
}: {
  label: string;
  sideEvents: WeddingEvent[];
  className?: string;
}) {
  const first = sideEvents[0];
  if (!first) return null;

  return (
    <div className={className}>
      {/* Header — label, ornament, date + lunar (once per side) */}
      <div className="text-center mb-12">
        <p className="font-label-caps text-label-caps tracking-[0.4em] text-custom-gold">
          {label}
        </p>
        <Ornament className="my-4" />
        <p className="font-headline-md text-[22px] leading-tight text-custom-burgundy">
          {first.displayDate}
        </p>
        <p className="font-label-caps text-[10px] tracking-[0.25em] text-custom-gold mt-2">
          {first.lunarDate}
        </p>
      </div>

      {/* Timeline rail — each item carries the left border so the line is
          continuous; the last item stops the line just past its node. */}
      <div className="mx-auto max-w-sm md:max-w-none">
        {sideEvents.map((event, i) => {
          const last = i === sideEvents.length - 1;
          return (
            <div
              key={event.id}
              className={`relative pl-8 sm:pl-10 ${
                last ? "pb-0" : "pb-12"
              } border-l ${last ? "border-l-transparent" : "border-custom-gold/40"}`}
            >
              {/* Diamond node sitting on the rail */}
              <span className="absolute -left-[6px] top-1.5 h-3 w-3 rotate-45 border border-custom-gold bg-custom-light shadow-[0_0_0_4px_#fdfbf7]" />
              <span className="absolute -left-[3px] top-[calc(0.375rem+3px)] h-1.5 w-1.5 rotate-45 bg-custom-gold" />

              <h4 className="font-headline-md text-[28px] leading-none text-custom-burgundy">
                {event.displayTime}
              </h4>
              <h3 className="font-headline-md text-headline-md text-primary mt-1.5">
                {event.title}
              </h3>

              {event.description && (
                <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-sm">
                  {event.description}
                </p>
              )}

              <p className="font-body-md text-body-md text-on-surface-variant mt-3 mb-5">
                {event.locationName && (
                  <span className="text-primary">{event.locationName}</span>
                )}
                {event.locationName && <br />}
                {event.locationDetail}
              </p>

              <EventActions event={event} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Itinerary() {
  const [active, setActive] = useState<Side>("bride");

  // On mobile only the active side shows (toggled below); on md+ both show.
  const show = (side: Side) =>
    `${active === side ? "block" : "hidden"} md:block`;

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
        <h2 className="font-headline-lg text-headline-lg text-center text-primary italic mb-5">
          Chương Trình
        </h2>
        <Ornament className="mb-14" />

        {/* Mobile toggle — switch between the two families */}
        <div className="flex md:hidden justify-center mb-12">
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

        <div className="grid md:grid-cols-2 gap-x-16 lg:gap-x-24 max-w-4xl mx-auto">
          <FamilyTimeline
            label="Nhà Gái"
            sideEvents={brideEvents}
            className={show("bride")}
          />
          <FamilyTimeline
            label="Nhà Trai"
            sideEvents={groomEvents}
            className={show("groom")}
          />
        </div>
      </FadeIn>
    </section>
  );
}
