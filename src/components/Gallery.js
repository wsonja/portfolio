import { useEffect, useRef } from "react";
import whistler from "../assets/gallery/whistler.jpg";
import coffee from "../assets/gallery/coffee.jpg";
import flight from "../assets/gallery/flight.jpg";
import theView from "../assets/gallery/the-view.jpg";
import ifc from "../assets/gallery/ifc.jpg";
import colour from "../assets/gallery/colour.jpg";
import mukashi from "../assets/gallery/mukashi.jpg";
import joy from "../assets/gallery/joy.jpg";
import cebu from "../assets/gallery/cebu.jpg";
import sunsetDrive from "../assets/gallery/sunset-drive.jpg";

const PHOTOS = [
  { src: whistler, alt: "Whistler" },
  { src: coffee, alt: "Coffee break" },
  { src: flight, alt: "Flight" },
  { src: theView, alt: "The View" },
  { src: ifc, alt: "IFC" },
  { src: colour, alt: "Colour" },
  { src: mukashi, alt: "Mukashi o shinonde" },
  { src: joy, alt: "JOY" },
  { src: cebu, alt: "Cebu" },
  { src: sunsetDrive, alt: "Sunset drive" },
];

const SLIDE = 0.82;
const HOLD = 1.35;

function slideEase(t) {
  if (t < 0.78) {
    const u = t / 0.78;
    return 0.88 * u * u * u;
  }
  const u = (t - 0.78) / 0.22;
  return 0.88 + 0.12 * (1 - (1 - u) * (1 - u));
}

function wrap(delta, count) {
  return ((delta + count / 2) % count + count) % count - count / 2;
}

export default function Gallery() {
  const root = useRef(null);

  useEffect(() => {
    const rootEl = root.current;
    if (!rootEl) return undefined;
    const sharp = [...rootEl.querySelectorAll(".gallery-window .gallery-card")];
    const soft = [...rootEl.querySelectorAll(".gallery-neighbors .gallery-card")];
    const count = PHOTOS.length;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const place = (value) => {
      const shot = rootEl.querySelector(".gallery-window").getBoundingClientRect().width;
      const frame = rootEl.querySelector(".gallery-frame").getBoundingClientRect().width;
      const step = frame / 2 + shot / 2 + 28;
      const layout = (card, blurred) => {
        const index = Number(card.dataset.index);
        const delta = wrap(index - value, count);
        const distance = Math.abs(delta);
        if (distance > 1.65) {
          card.style.visibility = "hidden";
        } else {
          card.style.visibility = "visible";
        }
        const focus = 1 - Math.min(distance, 1);
        const scale = blurred ? 0.96 + focus * 0.02 : 1 + focus * 0.08;
        const blur = blurred ? Math.min(2, distance * 2) : 0;
        card.style.transform = `translate3d(calc(-50% + ${delta * step}px), -50%, 0) scale(${scale})`;
        card.style.filter = blur > 0.4 ? `blur(${blur.toFixed(1)}px)` : "none";
      };
      sharp.forEach((card) => layout(card, false));
      soft.forEach((card) => layout(card, true));
    };

    place(0);
    if (reduce.matches) return undefined;

    let raf = 0;
    let last = performance.now();
    let phase = "hold";
    let phaseT = 0;
    let index = 0;

    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!document.hidden) {
        phaseT += dt;
        if (phase === "hold") {
          place(index);
          if (phaseT >= HOLD) {
            phase = "slide";
            phaseT = 0;
          }
        } else {
          const p = Math.min(1, phaseT / SLIDE);
          place(index + slideEase(p));
          if (p >= 1) {
            index = (index + 1) % count;
            phase = "hold";
            phaseT = 0;
            place(index);
          }
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const cards = (soft) =>
    PHOTOS.map((photo, index) => (
      <figure className="gallery-card" data-index={index} key={`${photo.alt}-${soft ? "soft" : "sharp"}`}>
        <img src={photo.src} alt={soft ? "" : photo.alt} />
      </figure>
    ));

  return (
    <div className="hero-stage gallery" ref={root} role="region" aria-label="Photos and artwork">
      <div className="gallery-neighbors" aria-hidden="true">
        {cards(true)}
      </div>
      <div className="gallery-frame">
        <div className="gallery-window">{cards(false)}</div>
      </div>
    </div>
  );
}
