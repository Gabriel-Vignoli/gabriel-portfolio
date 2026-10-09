import { useState } from "react";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import WindowControls from "../windowControls";
import WindowWrapper from "../windowWrapper";
import { locations } from "../../constants";
import useLocationStore from "../../store/location";
import useWindowStore from "../../store/window";
import clsx from "clsx";

const Finder = () => {
  const { activeLocation, setActiveLocation } = useLocationStore();
  const { openWindow, closeWindow } = useWindowStore();

  // Mobile navigation: empty = root (list of locations)
  const [path, setPath] = useState([]);

  const renderList = (items) =>
    items.map((item) => (
      <li
        key={item.id}
        onClick={() => setActiveLocation(item)}
        className={clsx(
          item.id === activeLocation.id ? "active" : "not-active",
        )}
      >
        <img src={item.icon} className="w-4" alt={item.name} />
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

  // Mobile helpers
  const current = path[path.length - 1];
  const mobileTitle = current ? current.name : "Portfólio";
  const mobileItems = current ? current.children : Object.values(locations);

  const openMobileItem = (item) => {
    if (item.kind === "folder") return setPath((prev) => [...prev, item]);
    openItem(item);
  };

  const goBack = () => {
    if (path.length === 0) return closeWindow("finder");
    setPath((prev) => prev.slice(0, -1));
  };

  return (
    <>
      {/* Desktop and tablet */}
      <div className="max-sm:hidden">
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
      </div>

      {/* Phone */}
      <div className="sm:hidden h-full flex flex-col bg-white dark:bg-neutral-950 pt-20">
        <div className="relative flex items-center justify-center px-4 py-4">
          <button
            type="button"
            onClick={goBack}
            className="absolute left-4 flex items-center gap-2 text-blue-500"
          >
            <ChevronLeft size={16} className="text-gray-700 dark:text-white" />
            <span className="text-base">Voltar</span>
          </button>

          <h2 className="max-w-[45%] truncate text-lg text-gray-900 dark:text-white">
            {mobileTitle}
          </h2>
        </div>

        {/* Breadcrumb */}
        <div
          aria-label="Navegação"
          className="flex items-center gap-2 overflow-x-auto whitespace-nowrap bg-gray-100 dark:bg-neutral-800 px-4 py-3 text-sm"
        >
          <button
            type="button"
            onClick={() => setPath([])}
            className="text-blue-500 shrink-0"
          >
            Portfólio
          </button>

          {path.map((item, index) => (
            <span key={item.id} className="flex items-center gap-2 shrink-0">
              <ChevronRight
                size={14}
                className="text-gray-500 dark:text-neutral-400"
              />
              <button
                type="button"
                onClick={() => setPath((prev) => prev.slice(0, index + 1))}
                className="max-w-[9rem] truncate text-blue-500"
              >
                {item.name}
              </button>
            </span>
          ))}
        </div>

        {mobileItems.length === 0 ? (
          <p className="px-6 pt-10 text-center text-sm text-gray-500 dark:text-neutral-400">
            Esta pasta está vazia.
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-y-5 px-4 pt-6 overflow-y-auto">
            {mobileItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => openMobileItem(item)}
                className="flex flex-col items-center gap-1.5"
              >
                <img
                  src={
                    item.kind === "folder" ? "/images/folder.png" : item.icon
                  }
                  alt={item.name}
                  className="size-14 object-contain"
                />
                <p className="w-20 text-[11px] font-semibold text-center text-gray-900 dark:text-white line-clamp-2">
                  {item.name}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

const FinderWindow = WindowWrapper(Finder, "finder");

export default FinderWindow;