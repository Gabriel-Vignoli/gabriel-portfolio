import { create } from "zustand";

const getSystemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const applyTheme = (theme) => {
  const resolved = theme === "system" ? getSystemTheme() : theme;
  document.documentElement.classList.toggle("dark", resolved === "dark");
};

const useThemeStore = create((set) => {
  const stored = localStorage.getItem("theme") || "system";
  applyTheme(stored);

  return {
    theme: stored,
    setTheme: (theme) => {
      localStorage.setItem("theme", theme);
      applyTheme(theme);
      set({ theme });
    },
  };
});

// Keep in sync if the OS theme changes while "system" is selected
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", () => {
    const current = useThemeStore.getState().theme;
    if (current === "system") applyTheme("system");
  });

export default useThemeStore;