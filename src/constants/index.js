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

const INITIAL_Z_INDEX = 1000;

const WINDOW_CONFIG = {
  finder: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  contact: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  resume: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  safari: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  photos: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  terminal: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  txtfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  imgfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
};

const techStack = [
  {
    category: "Frontend",
    items: ["React.js", "Next.js", "TypeScript", "JavaScript"],
  },
  {
    category: "Estilização",
    items: ["Tailwind CSS", "BootStrap", "CSS"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "Prisma"],
  },
  {
    category: "Banco de Dados",
    items: ["PostgreSQL", "mySQL"],
  },
  {
    category: "Ferramentas",
    items: ["Git", "GitHub", "AWS"],
  },
];

export { navLinks, navIcons, dockApps, INITIAL_Z_INDEX, WINDOW_CONFIG, techStack };
