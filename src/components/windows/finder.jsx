import { Search } from "lucide-react";
import WindowControls from "../windowControls";
import WindowWrapper from "../windowWrapper";
import { locations } from "../../constants";
import useLocationStore from "../../store/location";
import clsx from "clsx";
import useWindowStore from "../../store/window";

const Finder = () => {
  const { activeLocation, setActiveLocation } = useLocationStore();
  const { openWindow } = useWindowStore()

  const renderList = (items) =>
    items.map((item) => (
      <li
        key={item.id}
        onClick={() => setActiveLocation(item)}
        className={clsx(
          item.id === activeLocation.id ? "active" : "not-active",
        )}
      >
        <img src={item.icon} className="w-4" alt={item.name} clas />
        <p className="text-sm font-medium truncate">{item.name}</p>
      </li>
    ));

  const openItem = (item) => {
  if (item.kind === "folder") return setActiveLocation(item);

  if (item.kind === "file") {
    switch (item.fileType) {
      case "pdf":
        return openWindow("resume");
      case "txt":
        return openWindow("txtfile", item);
      case "img":
        return openWindow("imgfile", item);
      case "url":
        return window.open(item.href, "_blank");
      default:
        return;
    }
  }
};

  return (
    <>
      <div id="window-header">
        <WindowControls target="finder"></WindowControls>
        <Search className="icon"></Search>
      </div>

      <div className="bg-white flex h-full">
        <div className="sidebar">
          <div>
            <h3>Favoritos</h3>
            <ul>{renderList(Object.values(locations))}</ul>
          </div>

          <div>
            <h3>Meus Projetos</h3>
            <ul>{renderList(locations.work.children)}</ul>
          </div>
        </div>

        <ul className="content">
          {activeLocation?.children.map((item) => (
            <li
              key={item.id}
              className={item.position}
              onClick={() => openItem(item)}
            >
              <img src={item.icon} alt={item.name} />
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const FinderWindow = WindowWrapper(Finder, "finder");

export default FinderWindow;
