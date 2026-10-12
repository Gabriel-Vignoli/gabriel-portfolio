import clsx from "clsx";
import { locations } from "../constants";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";

const projects = locations.work.children ?? [];

const mobileApps = [
  { id: "pen", name: "Notas", icon: "/images/pen.png" },
  { id: "terminal", name: "Terminal", icon: "/images/terminal.png" },
];

const Home = () => {
  useGSAP(() => {
    Draggable.create(".folder");
  }, []);

  return (
    <>
      {/* Desktop folders */}
      <section id="home">
        <ul>
          {projects.map((project) => {
            return (
              <li
                key={project.id}
                className={clsx("group folder", project.windowPosition)}
              >
                <img src="/images/folder.png" alt="Folder" />
                <p>{project.name}</p>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Phone and tablet icons */}
      <section id="mobile-home">
        {mobileApps.map(({ id, name, icon }) => (
          <button key={id} type="button" aria-label={name}>
            <img src={icon} alt={name} />
          </button>
        ))}
      </section>
    </>
  );
};

export default Home;