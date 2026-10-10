import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { flushSync } from "react-dom";
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
const MIN_ZOOM = 1; // 100%
const MAX_ZOOM = 2; // 200%
const ZOOM_STEP = 0.1; // 10%
const DOUBLE_TAP_ZOOM = 1.5; // 150%

const clamp = (value) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, value));

// Snap to 10% steps (avoids float errors like 1.2000000000000002)
const snap = (value) => clamp(Math.round(value * 10) / 10);

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
  const contentRef = useRef(null);
  const pendingScroll = useRef(null);

  const [baseWidth, setBaseWidth] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [numPages, setNumPages] = useState(1);

  // Always holds the latest zoom, so touch handlers never read stale state
  const zoomRef = useRef(1);

  // Declared before the scroll-restoring effect so it runs first
  useLayoutEffect(() => {
    zoomRef.current = zoom;
  }, [zoom]);

  // Zoom to `newZoom`, keeping the point (fx, fy) of the viewport in place
  const applyZoom = useCallback((newZoom, fx, fy) => {
    const el = scrollRef.current;
    if (!el) return;

    const target = snap(newZoom);
    const ratio = target / zoomRef.current;
    if (Math.abs(ratio - 1) < 0.001) return;

    pendingScroll.current = {
      left: (el.scrollLeft + fx) * ratio - fx,
      top: (el.scrollTop + fy) * ratio - fy,
    };

    flushSync(() => setZoom(target));
  }, []);

  // After the new size is in the DOM, restore the scroll position
  useLayoutEffect(() => {
    const el = scrollRef.current;
    const pending = pendingScroll.current;
    if (!el || !pending) return;

    el.scrollLeft = pending.left;
    el.scrollTop = pending.top;
    pendingScroll.current = null;
  }, [zoom]);

  // Fit the page to the screen width (minus the 12px side padding)
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

  // Pinch to zoom and double tap to zoom
  useEffect(() => {
    if (!isPhone) return;
    const el = scrollRef.current;
    const content = contentRef.current;
    if (!el || !content) return;

    let pinch = null;
    let ignoreTap = false;
    let lastTap = 0;
    let tapStart = null;

    const distance = (t) =>
      Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);

    const onTouchStart = (e) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        ignoreTap = true;

        const rect = el.getBoundingClientRect();
        const fx =
          (e.touches[0].clientX + e.touches[1].clientX) / 2 - rect.left;
        const fy =
          (e.touches[0].clientY + e.touches[1].clientY) / 2 - rect.top;
        const ox = el.scrollLeft + fx;
        const oy = el.scrollTop + fy;

        pinch = {
          dist: distance(e.touches),
          startZoom: zoomRef.current,
          newZoom: zoomRef.current,
          fx,
          fy,
        };

        // Scale with CSS while the fingers move (cheap),
        // re-render the PDF once when they lift
        content.style.transformOrigin = `${ox}px ${oy}px`;
        content.style.willChange = "transform";
      } else if (e.touches.length === 1) {
        tapStart = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    };

    const onTouchMove = (e) => {
      if (!pinch || e.touches.length !== 2) return;
      e.preventDefault();

      pinch.newZoom = clamp(
        pinch.startZoom * (distance(e.touches) / pinch.dist),
      );
      content.style.transform = `scale(${pinch.newZoom / pinch.startZoom})`;
    };

    const onTouchEnd = (e) => {
      if (pinch && e.touches.length < 2) {
        const { newZoom, startZoom, fx, fy } = pinch;
        pinch = null;

        content.style.transform = "";
        content.style.willChange = "";

        // Snap the final value to a 10% step
        const target = snap(newZoom);
        const ratio = target / startZoom;

        if (Math.abs(ratio - 1) > 0.001) {
          const ox = el.scrollLeft + fx;
          const oy = el.scrollTop + fy;
          pendingScroll.current = {
            left: ox * ratio - fx,
            top: oy * ratio - fy,
          };
          flushSync(() => setZoom(target));
        }
      }

      if (e.touches.length === 0) {
        // Double tap (one finger, tapped twice, did not move)
        const touch = e.changedTouches[0];
        const isTap =
          !ignoreTap &&
          tapStart &&
          Math.hypot(touch.clientX - tapStart.x, touch.clientY - tapStart.y) <
            10 &&
          !e.target.closest("a, button");

        if (isTap) {
          const now = Date.now();
          if (now - lastTap < 300) {
            const rect = el.getBoundingClientRect();
            applyZoom(
              zoomRef.current > 1.01 ? MIN_ZOOM : DOUBLE_TAP_ZOOM,
              touch.clientX - rect.left,
              touch.clientY - rect.top,
            );
            lastTap = 0;
          } else {
            lastTap = now;
          }
        }

        ignoreTap = false;
        tapStart = null;
      }
    };

    // passive: false is required to call preventDefault while pinching
    el.addEventListener("touchstart", onTouchStart, { passive: false });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd);
    el.addEventListener("touchcancel", onTouchEnd);

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [isPhone, applyZoom]);

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

  // Buttons zoom around the center of the screen
  const zoomByButton = (delta) => {
    const el = scrollRef.current;
    if (!el) return;
    applyZoom(zoomRef.current + delta, el.clientWidth / 2, el.clientHeight / 2);
  };

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
        className="flex-1 min-h-0 overflow-auto overscroll-contain bg-gray-100 dark:bg-neutral-900"
        style={{ touchAction: "pan-x pan-y" }}
      >
        <div ref={contentRef} className="w-max min-w-full px-3 pt-3 pb-40">
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
      </div>

      {/* Zoom bar */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex items-center rounded-full bg-black/70 p-1 text-white shadow-lg backdrop-blur-md">
        <button
          type="button"
          aria-label="Diminuir zoom"
          disabled={zoom <= MIN_ZOOM}
          onClick={() => zoomByButton(-ZOOM_STEP)}
          className="rounded-full p-2 active:bg-white/20 disabled:opacity-30"
        >
          <Minus size={16} />
        </button>

        <button
          type="button"
          aria-label="Restaurar zoom"
          onClick={() => zoomByButton(MIN_ZOOM - zoomRef.current)}
          className="w-14 text-center text-xs font-medium tabular-nums"
        >
          {Math.round(zoom * 100)}%
        </button>

        <button
          type="button"
          aria-label="Aumentar zoom"
          disabled={zoom >= MAX_ZOOM}
          onClick={() => zoomByButton(ZOOM_STEP)}
          className="rounded-full p-2 active:bg-white/20 disabled:opacity-30"
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
};

const ResumeWindow = WindowWrapper(Resume, "resume");

export default ResumeWindow;