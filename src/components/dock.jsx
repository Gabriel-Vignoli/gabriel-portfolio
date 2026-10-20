import { useRef } from "react";
import { dockApps } from "../constants";
import { Tooltip } from "react-tooltip";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import useWindowStore from "../store/window";
import clsx from "clsx";

const Dock = () => {
  const { openWindow, closeWindow, window: windows } = useWindowStore();
  const dockRef = useRef(null);

  // Hover magnify effect
  useGSAP(() => {
    const dock = dockRef.current;
    if (!dock) return;

    const icons = dock.querySelectorAll(".dock-icon");

    const animateIcons = (mouseX, left) => {
      icons.forEach((icon) => {
        const { left: iconLeft, width } = icon.getBoundingClientRect();
        const center = iconLeft - left + width / 2;
        const distance = Math.abs(mouseX - center);
        const intensity = Math.exp(-(distance ** 2.7) / 20000);

        gsap.to(icon, {
          scale: 1 + 0.25 * intensity,
          y: -15 * intensity,
          duration: 0.2,
          ease: "power1.out",
        });
      });
    };

    const handleMouseMove = (e) => {
      const { left } = dock.getBoundingClientRect();
      animateIcons(e.clientX - left, left);
    };

    const resetIcons = () =>
      icons.forEach((icon) =>
        gsap.to(icon, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power1.out",
        }),
      );

    dock.addEventListener("mousemove", handleMouseMove);
    dock.addEventListener("mouseleave", resetIcons);

    return () => {
      dock.removeEventListener("mousemove", handleMouseMove);
      dock.removeEventListener("mouseleave", resetIcons);
    };
  }, []);

  // Intro animation: bar slides up, then icons pop in
  useGSAP(() => {
    const dock = dockRef.current;
    if (!dock) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = dock.querySelectorAll("[data-dock-item]");

    const tl = gsap.timeline({ delay: 1.2 });

    tl.fromTo(
      dock,
      { y: 120 },
      { y: 0, duration: 0.8, ease: "power3.out", clearProps: "transform" },
    ).fromTo(
      items,
      { opacity: 0, scale: 0.4, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.5,
        ease: "back.out(1.7)",
        stagger: 0.07,
        clearProps: "transform,opacity",
      },
      "-=0.4",
    );

    return () => tl.kill();
  }, []);

  const toggleApp = (app) => {
    if (!app.canOpen) return;

    const win = windows[app.id];

    if (win.isOpen) {
      closeWindow(app.id);
    } else {
      openWindow(app.id);
    }
  };

  const HIDDEN_ON_SMALL = ["terminal", "trash"];

  return (
    <section id="dock">
      <div ref={dockRef} className="dock-container">
        {dockApps.map(({ id, name, icon, canOpen }) => (
          <div
            key={id}
            data-dock-item
            className={clsx(
              "relative justify-center",
              HIDDEN_ON_SMALL.includes(id) ? "hidden lg:flex" : "flex",
            )}
          >
            <button
              type="button"
              className="dock-icon"
              aria-label={name}
              data-tooltip-id="dock-tooltip"
              data-tooltip-content={name}
              data-tooltip-delay-show={150}
              disabled={!canOpen}
              onClick={() => toggleApp({ id, canOpen })}
            >
              <img
                src={`/images/${icon}`}
                alt={name}
                loading="lazy"
                className={canOpen ? "" : "opacity-60"}
              />
            </button>
          </div>
        ))}
        <Tooltip id="dock-tooltip" place="top" className="tooltip"></Tooltip>
      </div>
    </section>
  );
};

export default Dock;