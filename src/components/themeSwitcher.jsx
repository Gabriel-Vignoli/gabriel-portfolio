import { useEffect, useRef, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import useThemeStore from "../store/theme";
import clsx from "clsx";

const OPTIONS = [
  { id: "light", label: "Light", icon: Sun },
  { id: "dark", label: "Dark", icon: Moon },
  { id: "system", label: "System", icon: Monitor },
];

const ThemeSwitcher = () => {
  const { theme, setTheme } = useThemeStore();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
<div ref={ref} className="relative isolate">      <img
        src="/icons/mode.svg"
        alt="Theme"
        className="icon-hover cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      />

      {open && (
        <ul className="theme-menu">
          {OPTIONS.map(({ id, label, icon: Icon }) => (
            <li
              key={id}
              className={clsx("theme-menu-item", theme === id && "active")}
              onClick={() => {
                  console.log("Setting theme to:", id);

                setTheme(id);
                setOpen(false);
              }}
            >
              <Icon size={16} />
              <span>{label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ThemeSwitcher;