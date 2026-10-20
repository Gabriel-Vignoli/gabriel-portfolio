import { useRef } from "react";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { BatteryFull } from "lucide-react";
import { navIcons, navLinks } from "../constants";
import useWindowStore from "../store/window";
import useThemeStore from "../store/theme";
import ThemeSwitcher from "./themeSwitcher";

dayjs.locale("pt-br");

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const Navbar = () => {
  const navRef = useRef(null);

  const now = dayjs();
  const weekday = capitalize(now.format("dddd"));
  const day = now.format("D");
  const month = capitalize(now.format("MMMM"));
  const time = now.format("HH:mm");

  const formattedDate = `${weekday}, ${day} de ${month} às ${time}`;

  const { openWindow, closeWindow, window: windows } = useWindowStore();
  const { theme } = useThemeStore();

  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  // Intro animation: navbar slides down from the top
  useGSAP(() => {
    const nav = navRef.current;
    if (!nav) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tween = gsap.fromTo(
      nav,
      { yPercent: -100 },
      {
        yPercent: 0,
        duration: 0.7,
        delay: 0.2,
        ease: "power3.out",
        clearProps: "transform",
      },
    );

    return () => tween.kill();
  }, []);

  const toggleWindow = (type) => {
    const win = windows[type];
    if (win?.isOpen) {
      closeWindow(type);
    } else {
      openWindow(type);
    }
  };

  return (
    <>
      {/* Desktop navbar */}
      <nav ref={navRef} className="max-lg:hidden">
        <div>
          <img
            src={isDark ? "/images/logo-white.svg" : "/images/logo.svg"}
            alt="Logo"
          />
          <p className="font-bold text-black dark:text-white">
            Gabriel's Portfolio
          </p>
          <ul>
            {navLinks.map(({ id, name, type }) => (
              <li key={id} onClick={() => toggleWindow(type)}>
                <p>{name}</p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <ul>
            {navIcons
              .filter(({ img }) => !img.includes("mode"))
              .map(({ id, img, darkImg }) => (
                <li key={id}>
                  <img
                    src={isDark ? darkImg : img}
                    alt={`Icon ${id}`}
                    className="mode-toggle"
                  />
                </li>
              ))}
            <ThemeSwitcher />
          </ul>

          <time>{formattedDate}</time>
        </div>
      </nav>

      {/* Mobile and tablet status bar */}
      <header id="status-bar">
        <time>{time}</time>

        <div className="island" aria-hidden="true" />

        <div className="status-icons">
          <img src="/icons/wifi-white.svg" alt="Wi-Fi" />
          <BatteryFull />
        </div>
      </header>
    </>
  );
};

export default Navbar;