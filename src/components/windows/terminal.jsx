import { Check, ChevronLeft, ChevronRight, Flag } from "lucide-react";
import { techStack } from "../../constants";
import WindowWrapper from "../windowWrapper";
import WindowControls from "../windowControls";
import useWindowStore from "../../store/window";

const Terminal = () => {
  const { closeWindow } = useWindowStore();

  return (
    <>
      {/* Desktop only */}
      <div className="max-lg:hidden">
        <div id="window-header">
          <WindowControls target="terminal"></WindowControls>
          <p>Stack de Tecnologias</p>
        </div>

        <div className="techstack">
          <p>
            <span className="font-bold">@gabriel % </span>
            mostrar stack de tecnologias
          </p>

          <div className="label">
            <p className="w-32">Categoria</p>
            <p>Tecnologias</p>
          </div>

          <ul className="content">
            {techStack.map(({ category, items }) => (
              <li key={category} className="flex items-center">
                <Check className="check" size={20}></Check>
                <h3>{category}</h3>
                <ul>
                  {items.map((item, i) => (
                    <li key={i}>
                      {item}
                      {i < items.length - 1 ? "," : ""}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <div className="footnote">
            <p>
              <Check size={20}></Check>
              {techStack.length} de {techStack.length} skills carregadas com
              sucesso (100%)
            </p>

            <p className="text-black">
              <Flag size={15} fill="black"></Flag>
              Tempo de renderização: 6ms
            </p>
          </div>
        </div>
      </div>

      {/* Phone and tablet */}
      <div className="lg:hidden font-mono text-gray-900 dark:text-neutral-300">
        <div className="relative flex items-center justify-center px-4 py-4 md:px-8 md:py-5">
          <button
            type="button"
            onClick={() => closeWindow("terminal")}
            className="absolute left-4 md:left-8 flex items-center gap-2 text-blue-500"
          >
            <ChevronLeft
              size={16}
              className="text-gray-700 dark:text-white md:size-5"
            />
            <span className="text-base md:text-lg">Voltar</span>
          </button>

          <h2 className="max-w-[45%] truncate text-lg md:text-2xl text-gray-900 dark:text-white">
            Terminal
          </h2>
        </div>

        <div className="px-6 pt-4 pb-32 md:px-10 md:pt-6 text-base md:text-lg">
          <p>
            <span className="font-bold">@gabriel % </span>
            mostrar stack de tecnologias
          </p>

          <ul className="mt-8 space-y-7 md:space-y-9">
            {techStack.map(({ category, items }) => (
              <li key={category}>
                <div className="flex items-center gap-3 text-[#00A154] dark:text-[#3ddc84]">
                  <ChevronRight size={20} className="flex-none" />
                  <h3 className="font-semibold">{category}</h3>
                </div>

                <ul className="mt-3 ms-8 space-y-1.5">
                  {items.map((item, i) => (
                    <li key={i}>
                      - {item}
                      {i < items.length - 1 ? "," : ""}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <div className="mt-10 pt-6 border-t border-dashed border-gray-300 dark:border-neutral-700 space-y-3 text-[#00A154] dark:text-[#3ddc84]">
            <p className="flex items-start gap-4">
              <Check size={20} className="flex-none" />
              {techStack.length} de {techStack.length} skills carregadas com
              sucesso (100%)
            </p>

            <p className="flex items-center gap-4 text-gray-900 dark:text-white">
              <Flag size={18} className="flex-none fill-current" />
              Tempo de renderização: 6ms
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

const TerminalWindow = WindowWrapper(Terminal, "terminal");

export default TerminalWindow;
