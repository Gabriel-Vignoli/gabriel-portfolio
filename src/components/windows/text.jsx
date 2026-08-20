import useWindowStore from "../../store/window";
import WindowControls from "../windowControls";
import WindowWrapper from "../windowWrapper";

const Text = () => {
  const { window: windows } = useWindowStore();
  const data = windows.txtfile.data;

  if (!data) return null;

  const { name, image, subtitle, description = [] } = data;

  return (
    <>
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
          <h3 className="font-semibold text-gray-800">{subtitle}</h3>
        )}
        {description.map((paragraph, index) => (
          <p key={index} className="text-sm leading-relaxed text-gray-700">
            {paragraph}
          </p>
        ))}
      </article>
    </>
  );
};

const TextWindow = WindowWrapper(Text, "txtfile");

export default TextWindow;
