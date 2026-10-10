import { useEffect, useRef, useState } from "react";
import { ChevronLeft, Download, Minus, Plus } from "lucide-react";
import WindowControls from "../windowControls";
import WindowWrapper from "../windowWrapper";
import useWindowStore from "../../store/window";

import { pdfjs, Document, Page } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const PDF_PATH = "/files/curriculo.pdf";
const MIN_ZOOM = 1;
const MAX_ZOOM = 2.5;
const ZOOM_STEP = 0.5;

const useIsPhone = () => {
  const [isPhone, setIsPhone] = useState(
    () => window.matchMedia("(max-width: 639px)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const onChange = (e) => setIsPhone(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return isPhone;
};

const Resume = () => {
  const { closeWindow } = useWindowStore();
  const isPhone = useIsPhone();

  const scrollRef = useRef(null);
  const [baseWidth, setBaseWidth] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [numPages, setNumPages] = useState(1);

  // Measure the scroll area (minus the px-3 padding) so the page fits the screen
  useEffect(() => {
    if (!isPhone) return;
    const el = scrollRef.current;
    if (!el) return;

    const observer = new ResizeObserver(([entry]) => {
      setBaseWidth(Math.floor(entry.contentRect.width) - 24);
    });
    observer.observe(el);

    return () => observer.disconnect();
  }, [isPhone]);

  if (!isPhone) {
    return (
      <>
        <div id="window-header">
          <WindowControls target="resume"></WindowControls>
          <h2>Curriculo.pdf</h2>

          <a
            href={PDF_PATH}
            download={true}
            className="cursor-pointer"
            title="Baixar curriculo"
          >
            <Download className="icon"></Download>
          </a>
        </div>

        <Document file={PDF_PATH}>
          <Page pageNumber={1} renderTextLayer renderAnnotationLayer />
        </Document>
      </>
    );
  }

  const pageWidth = baseWidth * zoom;

  return (
    <div className="relative h-full flex flex-col bg-white dark:bg-neutral-950 pt-20">
      {/* Header */}
      <div className="relative flex items-center justify-center px-4 py-4">
        <button
          type="button"
          onClick={() => closeWindow("resume")}
          className="absolute left-4 flex items-center gap-2 text-blue-500"
        >
          <ChevronLeft size={16} className="text-gray-700 dark:text-white" />
          <span className="text-base">Voltar</span>
        </button>

        <h2 className="text-lg text-gray-900 dark:text-white">Currículo</h2>

        <a
          href={PDF_PATH}
          download
          title="Baixar currículo"
          className="absolute right-4 text-blue-500"
        >
          <Download size={20} />
        </a>
      </div>

      {/* Scrollable PDF */}
      <div
        ref={scrollRef}
        className="flex-1 min-h-0 overflow-auto overscroll-contain bg-gray-100 dark:bg-neutral-900 px-3 pt-3 pb-32"
      >
        {baseWidth > 0 && (
          <Document
            file={PDF_PATH}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            loading={
              <p className="py-10 text-center text-sm text-gray-500">
                Carregando currículo...
              </p>
            }
            error={
              <p className="py-10 text-center text-sm text-red-500">
                Não foi possível carregar o currículo.
              </p>
            }
            className="space-y-3"
          >
            {Array.from({ length: numPages }, (_, i) => (
              <div
                key={i}
                className="mx-auto overflow-hidden rounded-lg bg-white shadow-lg"
                style={{ width: pageWidth }}
              >
                <Page
                  pageNumber={i + 1}
                  width={pageWidth}
                  renderTextLayer
                  renderAnnotationLayer
                />
              </div>
            ))}
          </Document>
        )}
      </div>

      {/* Zoom controls */}
      <div className="absolute bottom-28 right-4 flex flex-col overflow-hidden rounded-full bg-black/70 text-white backdrop-blur-md">
        <button
          type="button"
          aria-label="Aumentar zoom"
          disabled={zoom >= MAX_ZOOM}
          onClick={() => setZoom((z) => Math.min(MAX_ZOOM, z + ZOOM_STEP))}
          className="p-3 disabled:opacity-40"
        >
          <Plus size={18} />
        </button>
        <button
          type="button"
          aria-label="Diminuir zoom"
          disabled={zoom <= MIN_ZOOM}
          onClick={() => setZoom((z) => Math.max(MIN_ZOOM, z - ZOOM_STEP))}
          className="p-3 disabled:opacity-40"
        >
          <Minus size={18} />
        </button>
      </div>
    </div>
  );
};

const ResumeWindow = WindowWrapper(Resume, "resume");

export default ResumeWindow;