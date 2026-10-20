import { ChevronLeft } from "lucide-react";
import useWindowStore from "../../store/window";
import WindowControls from "../windowControls";
import WindowWrapper from "../windowWrapper";

const Text = () => {
  const { window: windows, closeWindow } = useWindowStore();
  const data = windows.txtfile.data;

  if (!data) return null;

  const { name, image, subtitle, description = [] } = data;

  return (
    <>
      {/* Desktop only */}
      <div className="max-lg:hidden">
        <div id="window-header">
          <WindowControls target="txtfile" />
          <h2>{name}</h2>
          <div />
        </div>

        <article className="p-5 space-y-4">
          {image && (
            <img src={image} alt={name} className="w-full object-contain" />
          )}
          {subtitle && (
            <h3 className="font-semibold text-gray-800 dark:text-white">
              {subtitle}
            </h3>
          )}
          {description.map((paragraph, index) => (
            <p
              key={index}
              className="text-sm leading-relaxed text-gray-700 dark:text-neutral-300"
            >
              {paragraph}
            </p>
          ))}
        </article>
      </div>

      {/* Phone and tablet */}
      <div className="lg:hidden h-full flex flex-col bg-white dark:bg-neutral-950 pt-20 md:pt-24">
        <div className="relative flex items-center justify-center px-4 py-4 md:px-8 md:py-5">
          <button
            type="button"
            onClick={() => closeWindow("txtfile")}
            className="absolute left-4 md:left-8 flex items-center gap-2 text-blue-500"
          >
            <ChevronLeft
              size={16}
              className="text-gray-700 dark:text-white md:size-5"
            />
            <span className="text-base md:text-lg">Voltar</span>
          </button>

          <h2 className="max-w-[45%] truncate text-lg md:text-2xl text-gray-900 dark:text-white">
            {name}
          </h2>
        </div>

        <article className="flex-1 min-h-0 overflow-y-auto px-4 md:px-8 pt-2 pb-32 space-y-4 md:space-y-6 md:max-w-3xl md:mx-auto md:w-full">
          {image && (
            <img
              src={image}
              alt={name}
              className="w-full object-contain rounded-xl"
            />
          )}
          {subtitle && (
            <h3 className="text-lg md:text-2xl font-semibold text-gray-800 dark:text-white">
              {subtitle}
            </h3>
          )}
          {description.map((paragraph, index) => (
            <p
              key={index}
              className="text-sm md:text-lg leading-relaxed text-gray-700 dark:text-neutral-300"
            >
              {paragraph}
            </p>
          ))}
        </article>
      </div>
    </>
  );
};

const TextWindow = WindowWrapper(Text, "txtfile");

export default TextWindow;