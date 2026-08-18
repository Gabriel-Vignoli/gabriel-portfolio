import { useRef } from "react";
import useWindowStore from "../store/window";

const WindowWrapper = (Component, windowKey) => {
    const Wrapped = (props) => {
        const { window: windows } = useWindowStore();
        const { isOpen, zIndex } = windows[windowKey];
        const ref = useRef(null);

        if (!isOpen) return null;

        return (
            <section id={windowKey} ref={ref} style={{ zIndex }} className="absolute">
                <Component {...props}></Component>
            </section>
        );
    };

    Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;
    return Wrapped;
};

export default WindowWrapper;