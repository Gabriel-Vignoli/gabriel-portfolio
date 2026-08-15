const navLinks = [
  { id: 1, name: "Portifólio" },
  { id: 2, name: "Contato" },
  { id: 3, name: "Projetos" },
];

const navIcons = [
  {
    id: 1,
    img: "/icons/wifi.svg",
  },
  {
    id: 2,
    img: "/icons/search.svg",
  },
  {
    id: 3,
    img: "/icons/user.svg",
  },
  {
    id: 4,
    img: "/icons/mode.svg",
  },
];

const dockApps = [
  {
    id: "finder",
    name: "Portfólio",
    icon: "finder.png",
    canOpen: true,
  },
  {
    id: "safari",
    name: "Projetos",
    icon: "safari.png",
    canOpen: true,
  },
  {
    id: "photos",
    name: "Curriculo",
    icon: "photos.png",
    canOpen: true,
  },
  {
    id: "contact",
    name: "Contato", 
    icon: "contact.png",
    canOpen: true,
  },
  {
    id: "terminal",
    name: "Skills",
    icon: "terminal.png",
    canOpen: true,
  },
  {
    id: "trash",
    name: "Lixeira",
    icon: "trash.png",
    canOpen: false,
  },
];

export { navLinks, navIcons, dockApps };
