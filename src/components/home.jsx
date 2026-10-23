import { useRef } from "react";
import clsx from "clsx";
import gsap from "gsap";
import { Moon, Sun } from "lucide-react";
import { locations } from "../constants";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";
import useWindowStore from "../store/window";
import useLocationStore from "../store/location";
import useThemeStore from "../store/theme";

const projects = locations.work.children ?? [];

const mobileApps = [
  { id: "resume", name: "Currículo", icon: "/images/pen.png" },
  { id: "terminal", name: "Habilidades", icon: "/images/terminal.png" },
];

const Home = () => {
  const { openWindow } = useWindowStore();
  const { setActiveLocation } = useLocationStore();
  const { theme, setTheme } = useThemeStore();

  const desktopRef = useRef(null);
  const mobileRef = useRef(null);

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  const toggleTheme = () => setTheme(isDark ? "light" : "dark");

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

        {/* Theme toggle */}
        <button type="button" onClick={toggleTheme} aria-label="Alternar tema">
          <div data-mobile-app className="flex flex-col items-center gap-1.5">
            <div className="flex items-center justify-center size-22 md:size-28">
              <div
                className={clsx(
                  "relative flex items-center justify-center size-[4.2rem] md:size-[5.2rem] rounded-2xl md:rounded-[1.25rem] backdrop-blur-md shadow-lg border transition-colors duration-500 ease-out",
                  isDark
                    ? "bg-neutral-900/80 border-white/10"
                    : "bg-white/80 border-white/60",
                )}
              >
                <Sun
                  className={clsx(
                    "absolute size-9 md:size-12 text-amber-400 transition-all duration-500 ease-out",
                    isDark
                      ? "opacity-0 rotate-90 scale-50"
                      : "opacity-100 rotate-0 scale-100",
                  )}
                />
                <Moon
                  className={clsx(
                    "absolute size-9 md:size-12 text-indigo-200 transition-all duration-500 ease-out",
                    isDark
                      ? "opacity-100 rotate-0 scale-100"
                      : "opacity-0 -rotate-90 scale-50",
                  )}
                />
              </div>
            </div>

            <span className="grid w-22 md:w-28 text-center text-xs md:text-base font-medium text-white drop-shadow-md">
              <span
                className={clsx(
                  "col-start-1 row-start-1 transition-opacity duration-300",
                  isDark ? "opacity-100" : "opacity-0",
                )}
              >
                Escuro
              </span>
              <span
                className={clsx(
                  "col-start-1 row-start-1 transition-opacity duration-300",
                  isDark ? "opacity-0" : "opacity-100",
                )}
              >
                Claro
              </span>
            </span>
          </div>
        </button>
      </section>
    </>
  );
};

export default Home;
