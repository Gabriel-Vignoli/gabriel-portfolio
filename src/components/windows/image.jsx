import { ChevronLeft } from "lucide-react";
import useWindowStore from "../../store/window";
import WindowControls from "../windowControls";
import WindowWrapper from "../windowWrapper";

const Image = () => {
  const { window: windows, closeWindow } = useWindowStore();
  const data = windows.imgfile.data;

  if (!data) return null;

  const { name, imageUrl } = data;

  return (
    <>
      {/* Desktop only */}
      <div className="max-lg:hidden">
        <div id="window-header">
          <WindowControls target="imgfile" />
          <p>{name}</p>
          <div />
        </div>

        <div className="preview">
          <img src={imageUrl} alt={name} />
        </div>
      </div>

      {/* Phone and tablet */}
      <div className="lg:hidden h-full flex flex-col bg-white dark:bg-neutral-950 pt-20 md:pt-24">
        <div className="relative flex items-center justify-center px-4 py-4 md:px-8 md:py-5">
          <button
            type="button"
            onClick={() => closeWindow("imgfile")}
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

        <div className="flex-1 min-h-0 flex items-center justify-center px-4 md:px-8 pb-32">
          <img
            src={imageUrl}
            alt={name}
            className="max-h-full max-w-full object-contain rounded-xl shadow-lg"
          />
        </div>
      </div>
    </>
  );
};

const ImageWindow = WindowWrapper(Image, "imgfile");

export default ImageWindow;