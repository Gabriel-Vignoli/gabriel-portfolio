import useWindowStore from "../../store/window";
import WindowControls from "../windowControls";
import WindowWrapper from "../windowWrapper";

const Image = () => {
  const { window: windows } = useWindowStore();
  const data = windows.imgfile.data;

  if (!data) return null;

  const { name, imageUrl } = data;

  return (
    <>
      <div id="window-header">
        <WindowControls target="imgfile" />
        <p>{name}</p>
        <div />
      </div>

      <div className="preview">
        <img src={imageUrl} alt={name} />
      </div>
    </>
  );
};

const ImageWindow = WindowWrapper(Image, "imgfile");

export default ImageWindow;