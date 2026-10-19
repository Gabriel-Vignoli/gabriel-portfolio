import clsx from "clsx";
import { locations } from "../constants";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";
import useWindowStore from "../store/window";
import useLocationStore from "../store/location"; // adjust to your store

const projects = locations.work.children ?? [];

const mobileApps = [
  { id: "resume", name: "Currículo", icon: "/images/pen.png" },
  { id: "terminal", name: "Terminal", icon: "/images/terminal.png" },
];

const Home = () => {
  const { openWindow } = useWindowStore();
  const { setActiveLocation } = useLocationStore();

  const handleOpenFolder = (project) => {
    setActiveLocation(project); 
    openWindow("finder");     
  };

  useGSAP(() => {
    Draggable.create(".folder");
  }, []);

  return (
    <>
      {/* Desktop folders */}
      <section id="home">
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
      <section id="mobile-home">
        {mobileApps.map(({ id, name, icon }) => (
          <button
            key={id}
            type="button"
            aria-label={name}
            onClick={() => openWindow(id)}
          >
            <img src={icon} alt={name} />
          </button>
        ))}
      </section>
    </>
  );
};

export default Home;