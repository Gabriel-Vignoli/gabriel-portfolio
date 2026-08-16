import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { INITIAL_Z_INDEX, WINDOW_CONFIG } from "../constants";

const useWindowStore = create(
  immer((set) => ({
    window: WINDOW_CONFIG,
    nextZIndex: INITIAL_Z_INDEX + 1,

    openWindow: (windowKey, data = null) =>
      set((state) => {
        const win = state.window[windowKey];
        if (win) {
          win.isOpen = true;
          win.zIndex = state.nextZIndex;
          win.data = data ?? win.data;
          state.nextZIndex += 1;
        }
      }),

    closeWindow: (windowKey) => set((state) => {
                const win = state.window[windowKey];
        if (win) {
          win.isOpen = false;
          win.zIndex = INITIAL_Z_INDEX;
          win.data = null;
          state.nextZIndex += 1;
        }
    }),

    focusWindow: (windowKey) => set((state) => {
                const win = state.window[windowKey];
        if (win) {
          win.zIndex = state.nextZIndex++;
        }
    }),
  })),
);

export default useWindowStore;
