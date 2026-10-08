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

      const handles = el.querySelectorAll(".drag-handle");

      // Windows without a .drag-handle keep the old behavior
      if (!handles.length) {
        const header = el.querySelector("#window-header");
        const draggable = Draggable.create(el, {
          trigger: header || el,
          onPress: () => focusWindow(windowKey),
        });
        return () => draggable[0]?.kill();
      }

      // One Draggable per handle, each moving the real window via a proxy
      const instances = Array.from(handles).map(
        (handle) =>
          Draggable.create(document.createElement("div"), {
            trigger: handle,
            onPress: () => focusWindow(windowKey),
            onDrag: function () {
              gsap.set(el, { x: `+=${this.deltaX}`, y: `+=${this.deltaY}` });
            },
          })[0],
      );

      return () => instances.forEach((d) => d.kill());
    }, []);

    return (
      <section
        id={windowKey}
        ref={ref}
        style={{ zIndex, display: "none" }}
        className="absolute"
      >
        <Component {...props}></Component>
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;
  return Wrapped;
};

export default WindowWrapper;
