import { useRef } from "react";
import clsx from "clsx";
import gsap from "gsap";
import { locations } from "../constants";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";
import useWindowStore from "../store/window";
import useLocationStore from "../store/location";

const projects = locations.work.children ?? [];

const mobileApps = [
  { id: "resume", name: "Currículo", icon: "/images/pen.png" },
  { id: "terminal", name: "Habilidades", icon: "/images/terminal.png" },
];

const Home = () => {
  const { openWindow } = useWindowStore();
  const { setActiveLocation } = useLocationStore();

  const desktopRef = useRef(null);
  const mobileRef = useRef(null);

  const handleOpenFolder = (project) => {
    setActiveLocation(project);
    openWindow("finder");
  };

  // Drag
  useGSAP(() => {
    Draggable.create(".folder");
  }, []);

  // Intro animation
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const folders = desktopRef.current?.querySelectorAll(".folder") ?? [];
    const mobileApps =
      mobileRef.current?.querySelectorAll("[data-mobile-app]") ?? [];

    const tl = gsap.timeline({ delay: 0.8 });

    // Desktop folders: scale and fade only, so Draggable keeps x/y
    if (folders.length) {
      tl.fromTo(
        folders,
        { opacity: 0, scale: 0.6 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.1,
          clearProps: "opacity",
        },
        0,
      );
    }

    // Phone and tablet icons: animate the inner wrapper (icon + label),
    // not the button, so it doesn't clash with the button's press effect
    if (mobileApps.length) {
      tl.fromTo(
        mobileApps,
        { opacity: 0, scale: 0.5, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.12,
          clearProps: "all",
        },
        0,
      );
    }

    return () => tl.kill();
  }, []);

  return (
    <>
      {/* Desktop folders */}
      <section id="home" ref={desktopRef}>
        <ul>
          {projects.map((project) => (
            <li
              key={project.id}
              className={clsx("group folder", project.windowPosition)}
              onDoubleClick={() => handleOpenFolder(project)}
            >
              <img src="/images/folder.png" alt="Folder" />
              <p>{project.name}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Phone and tablet icons */}
      <section id="mobile-home" ref={mobileRef}>
        {mobileApps.map(({ id, name, icon }) => (
          <button key={id} type="button" onClick={() => openWindow(id)}>
            <div data-mobile-app className="flex flex-col items-center gap-1.5">
              <img src={icon} alt="" />
              <span className="w-22 md:w-28 truncate text-center text-xs md:text-base font-medium text-white drop-shadow-md">
                {name}
              </span>
            </div>
          </button>
        ))}
      </section>
    </>
  );
};

export default Home;