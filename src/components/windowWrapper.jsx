import { useRef } from "react";
import useWindowStore from "../store/window";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/all";

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, window: windows } = useWindowStore();
    const { isOpen, zIndex } = windows[windowKey];
    const ref = useRef(null);

    useGSAP(() => {
      const el = ref.current;
      if (!el) return;

      if (isOpen) {
        el.style.display = "block";
        gsap.fromTo(
          el,
          { scale: 0.8, opacity: 0, y: 40 },
          { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
        );
      } else {
        gsap.to(el, {
          scale: 0.8,
          opacity: 0,
          y: 40,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            el.style.display = "none";
          },
        });
      }
    }, [isOpen]);

    useGSAP(() => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();

      // Dragging only exists on tablet and desktop (windows are full screen on phones)
      mm.add("(min-width: 640px)", () => {
        const handles = el.querySelectorAll(".drag-handle");

        // Windows without a .drag-handle drag from their whole header
        if (!handles.length) {
          const header = el.querySelector("#window-header");
          const draggable = Draggable.create(el, {
            trigger: header || el,
            onPress: () => focusWindow(windowKey),
          });
          return () => draggable[0]?.kill();
        }

        // Windows with .drag-handle (Safari): plain pointer events
        const cleanups = Array.from(handles).map((handle) => {
          let startX = 0;
          let startY = 0;
          let originX = 0;
          let originY = 0;

          const onMove = (e) => {
            gsap.set(el, {
              x: originX + (e.clientX - startX),
              y: originY + (e.clientY - startY),
            });
          };

          const onUp = () => {
            window.removeEventListener("pointermove", onMove);
            window.removeEventListener("pointerup", onUp);
          };

          const onDown = (e) => {
            if (e.button !== 0) return;
            focusWindow(windowKey);

            startX = e.clientX;
            startY = e.clientY;
            originX = gsap.getProperty(el, "x");
            originY = gsap.getProperty(el, "y");

            window.addEventListener("pointermove", onMove);
            window.addEventListener("pointerup", onUp);
          };

          handle.addEventListener("pointerdown", onDown);

          return () => {
            handle.removeEventListener("pointerdown", onDown);
            onUp();
          };
        });

        return () => cleanups.forEach((fn) => fn());
      });

      return () => mm.revert();
    }, []);

    return (
      <section
        id={windowKey}
        ref={ref}
        style={{ zIndex, display: "none" }}
        className="absolute"
        onMouseDown={() => focusWindow(windowKey)}
      >
        <Component {...props}></Component>
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;
  return Wrapped;
};

export default WindowWrapper;