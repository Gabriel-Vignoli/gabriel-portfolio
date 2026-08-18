import { Check, Flag } from "lucide-react";
import { techStack } from "../../constants";
import WindowWrapper from "../windowWrapper";
import WindowControls from "../windowControls";

const Terminal = () => {
  return (
    <>
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
                    <li key={i}>{item}{i < items.length - 1 ? "," : ""}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className="footnote">
            <p>
                <Check size={20}></Check>
                5 de 5 skills carregadas com sucesso (100%) 
            </p>

            <p className="text-black">
                <Flag size={15} fill="black"></Flag>
                Tempo de renderização: 6ms
            </p>
        </div>
      </div>
    </>
  );
};

const TerminalWindow = WindowWrapper(Terminal, "terminal");

export default TerminalWindow;