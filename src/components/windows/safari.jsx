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
import WindowControls from "../windowControls";
import WindowWrapper from "../windowWrapper";
import { courses } from "../../constants";

const Safari = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target="safari"></WindowControls>

        <PanelLeft className="ml-10 icon"></PanelLeft>

        <div className="flex items-center gap-1 ml-5">
          <ChevronLeft className="icon"></ChevronLeft>
          <ChevronRight className="icon"></ChevronRight>
        </div>

        <div className="flex-1 flex-center gap-3">
          <ShieldHalf className="icon"></ShieldHalf>

          <div className="search">
            <Search className="icon"></Search>

            <input
              type="text"
              placeholder="Busque pela categoria do certificado(Front, Inglês)"
              className="flex-1"
            />
          </div>
        </div>

        <div className="flex items-center gap-5">
          <Share className="icon"></Share>
          <Plus className="icon"></Plus>
          <Copy className="icon"></Copy>
        </div>
      </div>

      <div className="blog">
        <h2>Meus certificados</h2>

        <div className="space-y-8">
          {courses.map((course) => (
            <div key={course.id} className="blog-post">
              <img src={course.imageURL} alt={course.title} />

              <div className="content">
                <span className="category">{course.category}</span>
                <h3>{course.title}</h3>
                <p>
                  {course.issuer} · {course.date}
                </p>
                <a href={course.link} target="_blank" rel="noopener noreferrer">
                  Ver certificado <MoveRight className="icon-hover" size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const SafariWindow = WindowWrapper(Safari, "safari");

export default SafariWindow;
