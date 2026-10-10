import { ChevronLeft, MoveRight } from "lucide-react";
import { socials } from "../../constants";
import WindowWrapper from "../windowWrapper";
import WindowControls from "../windowControls";
import useWindowStore from "../../store/window";

const Contact = () => {
  const { closeWindow } = useWindowStore();

  return (
    <>
      {/* Desktop and tablet */}
      <div className="max-sm:hidden">
        <div id="window-header">
          <WindowControls target="contact"></WindowControls>
          <h2>Entre em contato comigo</h2>
        </div>

        <div className="p-5 space-y-5">
          <img
            src="/images/gabriel.jpeg"
            alt="Gabriel Vignoli"
            className="w-30 aspect-square rounded-full object-cover"
            style={{ imageRendering: "auto" }}
          />

          <h3>Vamos conversar?</h3>
          <p>
            Estou sempre aberto a novas oportunidades, projetos ou até uma boa
            troca de ideias. Se você tem uma vaga, um bug complicado ou só quer
            bater um papo sobre tecnologia, me chama em qualquer uma das redes
            abaixo.
          </p>

          <ul>
            {socials.map(({ id, bg, link, icon, text }) => {
              return (
                <li key={id} style={{ backgroundColor: bg }}>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={text}
                  >
                    <img src={icon} alt={text} className="size-5" />
                    <p>{text}</p>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Phone */}
      <div className="sm:hidden h-full flex flex-col bg-white dark:bg-neutral-950 pt-20">
        {/* Header */}
        <div className="relative flex items-center justify-center px-4 py-4">
          <button
            type="button"
            onClick={() => closeWindow("contact")}
            className="absolute left-4 flex items-center gap-2 text-blue-500"
          >
            <ChevronLeft size={16} className="text-gray-700 dark:text-white" />
            <span className="text-base">Voltar</span>
          </button>

          <h2 className="text-lg text-gray-900 dark:text-white">Contato</h2>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto px-5 pb-32">
          {/* Profile */}
          <div className="flex flex-col items-center pt-4 text-center">
            <img
              src="/images/gabriel.jpeg"
              alt="Gabriel Vignoli"
              className="size-28 rounded-full object-cover shadow-lg ring-4 ring-gray-100 dark:ring-neutral-800"
            />
            <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
              Vamos conversar?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-neutral-400">
              Estou sempre aberto a novas oportunidades, projetos ou até uma
              boa troca de ideias. Me chama em qualquer uma das redes abaixo.
            </p>
          </div>

          {/* Social cards */}
          <div className="mt-8 space-y-3">
            {socials.map(({ id, bg, link, icon, text }) => (
              <a
                key={id}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                title={text}
                className="flex items-center gap-4 rounded-2xl p-4 text-white shadow-md active:scale-[0.98] transition-transform"
                style={{ backgroundColor: bg }}
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/20">
                  <img src={icon} alt="" className="size-5" />
                </span>

                <span className="flex-1 text-base font-semibold">{text}</span>

                <MoveRight size={18} className="shrink-0 opacity-80" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const ContactWindow = WindowWrapper(Contact, "contact");

export default ContactWindow;