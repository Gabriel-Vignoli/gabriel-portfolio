import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { navIcons, navLinks } from "../constants";
import useWindowStore from "../store/window";
import ThemeSwitcher from "./themeSwitcher";

dayjs.locale("pt-br");

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const Navbar = () => {
  const now = dayjs();
  const weekday = capitalize(now.format("dddd"));
  const day = now.format("D");
  const month = capitalize(now.format("MMMM"));
  const time = now.format("HH:mm");

  const formattedDate = `${weekday}, ${day} de ${month} às ${time}`;

  const { openWindow, closeWindow, window: windows } = useWindowStore();

  const toggleWindow = (type) => {
    const win = windows[type];
    if (win?.isOpen) {
      closeWindow(type);
    } else {
      openWindow(type);
    }
  };

  return (
    <nav>
      <div>
        <img src="/images/logo.svg" alt="Logo" />
<p className="font-bold text-black dark:text-white">Gabriel's Portfolio</p>
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
            .map(({ id, img }) => (
              <li key={id}>
                <img src={img} alt={`Icon ${id}`} className="icon-hover" />
              </li>
            ))}
          <li>
            <ThemeSwitcher />
          </li>
        </ul>

        <time>{formattedDate}</time>
      </div>
    </nav>
  );
};

export default Navbar;