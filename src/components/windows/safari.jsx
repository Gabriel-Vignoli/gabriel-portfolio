import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  MoveRight,
  PanelLeft,
  Plus,
  Search,
  Share,
  ShieldHalf,
} from "lucide-react";
import clsx from "clsx";
import WindowControls from "../windowControls";
import WindowWrapper from "../windowWrapper";
import useWindowStore from "../../store/window";
import { courses } from "../../constants";

const categories = ["Todos", ...new Set(courses.map(({ category }) => category))];

const Safari = () => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");
  const { closeWindow } = useWindowStore();

  const filteredCourses = courses.filter(({ category, title }) => {
    const search = query.trim().toLowerCase();
    const matchesSearch =
      !search ||
      category.toLowerCase().includes(search) ||
      title.toLowerCase().includes(search);
    const matchesCategory =
      activeCategory === "Todos" || category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* Desktop and tablet */}
      <div className="max-sm:hidden">
        <div id="window-header">
          {/* left: draggable */}
          <div className="drag-handle flex items-center flex-1">
            <WindowControls target="safari"></WindowControls>

            <PanelLeft className="ml-10 icon"></PanelLeft>

            <div className="flex items-center gap-1 ml-5">
              <ChevronLeft className="icon"></ChevronLeft>
              <ChevronRight className="icon"></ChevronRight>
            </div>
          </div>

          {/* middle: NOT draggable (shield + search) */}
          <div className="flex items-center gap-3 w-1/2">
            <ShieldHalf className="icon"></ShieldHalf>

            <div className="search">
              <Search className="icon"></Search>

              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Busque pela categoria do certificado(Front, Inglês)"
                className="flex-1"
              />
            </div>
          </div>

          {/* right: draggable */}
          <div className="drag-handle flex items-center justify-end gap-5 flex-1">
            <Share className="icon"></Share>
            <Plus className="icon"></Plus>
            <Copy className="icon"></Copy>
          </div>
        </div>

        <div className="blog">
          <h2>Meus certificados</h2>

          <div className="space-y-8">
            {filteredCourses.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-neutral-400 text-center py-10">
                Nenhum certificado encontrado para "{query}".
              </p>
            ) : (
              filteredCourses.map((course) => (
                <div key={course.id} className="blog-post">
                  <img src={course.imageURL} alt={course.title} />

                  <div className="content">
                    <span className="category">{course.category}</span>
                    <h3>{course.title}</h3>
                    <p>
                      {course.issuer} · {course.date}
                    </p>
                    <a
                      href={course.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver certificado{" "}
                      <MoveRight className="icon-hover" size={14} />
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Phone */}
      <div className="sm:hidden h-full flex flex-col bg-white dark:bg-neutral-950 pt-20">
        {/* Header */}
        <div className="relative flex items-center justify-center px-4 py-4">
          <button
            type="button"
            onClick={() => closeWindow("safari")}
            className="absolute left-4 flex items-center gap-2 text-blue-500"
          >
            <ChevronLeft size={16} className="text-gray-700 dark:text-white" />
            <span className="text-base">Voltar</span>
          </button>

          <h2 className="text-lg text-gray-900 dark:text-white">
            Certificados
          </h2>
        </div>

        {/* Search */}
        <div className="px-4 pb-3">
          <div className="flex items-center gap-2 rounded-xl bg-gray-100 dark:bg-neutral-800 px-3 py-2.5">
            <Search size={16} className="text-gray-400 dark:text-neutral-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar certificado"
              className="flex-1 bg-transparent text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-neutral-500 outline-none"
            />
          </div>
        </div>

        {/* Category chips */}
        <div className="flex gap-2 overflow-x-auto px-4 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={clsx(
                "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors",
                activeCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 dark:bg-neutral-800 dark:text-neutral-300",
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="flex-1 space-y-3 overflow-y-auto px-4 pb-28">
          {filteredCourses.length === 0 ? (
            <p className="py-10 text-center text-sm text-gray-500 dark:text-neutral-400">
              Nenhum certificado encontrado.
            </p>
          ) : (
            filteredCourses.map((course) => (
              <a
                key={course.id}
                href={course.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-2xl bg-gray-50 dark:bg-neutral-900 p-3"
              >
                <img
                  src={course.imageURL}
                  alt={course.title}
                  className="size-16 shrink-0 rounded-xl object-cover"
                />

                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-medium uppercase tracking-wide text-blue-600 dark:text-blue-400">
                    {course.category}
                  </span>
                  <h3 className="line-clamp-2 text-sm font-semibold text-gray-900 dark:text-white">
                    {course.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-neutral-400">
                    {course.issuer} · {course.date}
                  </p>
                </div>

                <MoveRight
                  size={16}
                  className="shrink-0 text-gray-400 dark:text-neutral-500"
                />
              </a>
            ))
          )}
        </div>
      </div>
    </>
  );
};

const SafariWindow = WindowWrapper(Safari, "safari");

export default SafariWindow;