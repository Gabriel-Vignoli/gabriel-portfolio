import { socials } from "../../constants";
import WindowWrapper from "../windowWrapper";
import WindowControls from "../windowControls";

const Contact = () => {
  return (
    <>
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
    </>
  );
};

const ContactWindow = WindowWrapper(Contact, "contact");

export default ContactWindow;
