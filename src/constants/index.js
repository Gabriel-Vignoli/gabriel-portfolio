const navLinks = [
  { id: 1, name: "Curriculo", type: "resume" },
  { id: 2, name: "Contato", type: "contact" },
  { id: 3, name: "Projetos", type: "finder" },
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
    name: "Certificados",
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

const courses = [
  {
    id: 1,
    title: "ETS TOEIC Bridge",
    issuer: "TOEIC",
    category: "Inglês",
    date: "Mai de 2025",
    link: "https://drive.google.com/file/d/1SzGMQ6tUWYdbcBAS0ALI78ehvvwJnmdT/view?usp=sharing",
    imageURL: "/images/certificates/toeic-bridge.png",
  },
  {
    id: 2,
    title: "Inglês - Intermediate",
    issuer: "Fluency Academy",
    category: "Inglês",
    date: "Out de 2025",
    link: "https://drive.google.com/file/d/1vbd3b0qqIxuA4xeUbU1xTnocpJ6OM7ws/view?usp=sharing",
    imageURL: "/images/certificates/fluency-academy.png",
  },
  {
    id: 3,
    title: "Fundamentos de Data Science e Inteligência Artificial",
    issuer: "Data Science Academy",
    category: "Data Science",
    date: "Jul de 2025",
    link: "https://drive.google.com/file/d/18qUPabI1PvvypH-Y56dPxxwjqBCh5qB7/view?usp=sharing",
    imageURL: "/images/certificates/data-science-academy.png",
  },
  {
    id: 4,
    title: "Workshop do Figma ao Framer",
    issuer: "Framer Skills",
    category: "Design",
    date: "Mar de 2025",
    link: "https://drive.google.com/file/d/1xJY87ORdfCO2KPLVZIjYinlMusM-nHIh/view?usp=sharing",
    imageURL: "/images/certificates/framer-skills.png",
  },
  {
    id: 5,
    title: "Banco de Dados SQL",
    issuer: "OneBitCode",
    category: "Backend",
    date: "Jul de 2024",
    link: "https://drive.google.com/file/d/1RR67UT0TFkX6F2aYFEmWmlFCaqMLQXKx/view?usp=sharing",
    imageURL: "/images/certificates/onebitcode.png",
  },
  {
    id: 6,
    title: "TailwindCSS",
    issuer: "OneBitCode",
    category: "Frontend",
    date: "Jul de 2024",
    link: "https://drive.google.com/file/d/1eaWgCFElL22vKiENhneesOaWD3bCVkEk/view?usp=sharing",
    imageURL: "/images/certificates/onebitcode.png",
  },
  {
    id: 7,
    title: "UI e UX para programadores",
    issuer: "OneBitCode",
    category: "Design",
    date: "Jul de 2024",
    link: "https://drive.google.com/file/d/15ietjup3D10jntxokXaI7AzYKq4OZPN7/view?usp=sharing",
    imageURL: "/images/certificates/onebitcode.png",
  },
  {
    id: 8,
    title: "Full Stack JavaScript",
    issuer: "OneBitCode",
    category: "Full Stack",
    date: "Jun de 2024",
    link: "https://drive.google.com/file/d/1-cJ_9s5EpupObGRmxrUCXjz3WlZYHBrZ/view?usp=sharing",
    imageURL: "/images/certificates/onebitcode.png",
  },
  {
    id: 9,
    title: "EAD inspirado no Netflix",
    issuer: "OneBitCode",
    category: "Frontend",
    date: "Jun de 2024",
    link: "https://drive.google.com/file/d/1tde--s5TU43NvPQgcmbdROh9V9hArNsV/view?usp=sharing",
    imageURL: "/images/certificates/onebitcode.png",
  },
  {
    id: 10,
    title: "Dominando o MongoDB",
    issuer: "OneBitCode",
    category: "Backend",
    date: "Abr de 2024",
    link: "https://drive.google.com/file/d/10F0Hb-8hcJUwbJrZWRDwGH6TXqImXkvx/view?usp=sharing",
    imageURL: "/images/certificates/onebitcode.png",
  },
  {
    id: 11,
    title: "Next.JS (O Essencial)",
    issuer: "OneBitCode",
    category: "Frontend",
    date: "Mar de 2024",
    link: "https://drive.google.com/file/d/1JW2RTtHUf_GmjugoUUmEZ98XOs1zJTmG/view?usp=sharing",
    imageURL: "/images/certificates/onebitcode.png",
  },
  {
    id: 12,
    title: "Banco de Dados SQL no NodeJS",
    issuer: "OneBitCode",
    category: "Backend",
    date: "Abr de 2024",
    link: "https://drive.google.com/file/d/1xTEYwzBHapPL3UzHEZ0-1Gn9xne_pANu/view?usp=sharing",
    imageURL: "/images/certificates/onebitcode.png",
  },
  {
    id: 13,
    title: "Dominando o NodeJS",
    issuer: "OneBitCode",
    category: "Backend",
    date: "Abr de 2024",
    link: "https://drive.google.com/file/d/1Q_KqRtyx5BAt0d-bVdWJAI7Rl-XImtTs/view?usp=sharing",
    imageURL: "/images/certificates/onebitcode.png",
  },
  {
    id: 14,
    title: "Fundamentos do React",
    issuer: "OneBitCode",
    category: "Frontend",
    date: "Mar de 2024",
    link: "https://drive.google.com/file/d/19wi8uEXnu3hR-IK26kClbAZ5jurlafFk/view?usp=sharing",
    imageURL: "/images/certificates/onebitcode.png",
  },
  {
    id: 15,
    title: "Bootstrap",
    issuer: "OneBitCode",
    category: "Frontend",
    date: "Mar de 2024",
    link: "https://drive.google.com/file/d/1K2DUhjtRTP2d4E_orP3UZdqR5_5FVim9/view?usp=sharing",
    imageURL: "/images/certificates/onebitcode.png",
  },
  {
    id: 16,
    title: "GIT e GitHub",
    issuer: "OneBitCode",
    category: "Ferramentas",
    date: "Jun de 2024",
    link: "https://drive.google.com/file/d/1KwULV4KgRnW6OMZaO12xsadQelANUj6e/view?usp=sharing",
    imageURL: "/images/certificates/onebitcode.png",
  },
  {
    id: 17,
    title: "TypeScript",
    issuer: "OneBitCode",
    category: "Frontend",
    date: "Jan de 2024",
    link: "https://drive.google.com/file/d/1WQR2SUUbMOVExe1FIVmExJZTgpi067p3/view?usp=sharing",
    imageURL: "/images/certificates/onebitcode.png",
  },
  {
    id: 18,
    title: "JavaScript I, II, III, IV, V, VI",
    issuer: "OneBitCode",
    category: "Frontend",
    date: "Jan de 2024",
    link: "https://drive.google.com/file/d/1p7Mvj0PqiagY_VPe9IJiKmPL3FAr4ddh/view?usp=sharing",
    imageURL: "/images/certificates/onebitcode.png",
  },
  {
    id: 19,
    title: "CSS Moderno",
    issuer: "OneBitCode",
    category: "Frontend",
    date: "Fev de 2024",
    link: "https://drive.google.com/file/d/1IVabyybqU3h_EckUA7p7VfwueKh3xI96/view?usp=sharing",
    imageURL: "/images/certificates/onebitcode.png",
  },
  {
    id: 20,
    title: "CSS3",
    issuer: "OneBitCode",
    category: "Frontend",
    date: "Dez de 2023",
    link: "https://drive.google.com/file/d/1Zjo_SalOPISL9LooYeNMd2v9XgvVIlP9/view?usp=sharing",
    imageURL: "/images/certificates/onebitcode.png",
  },
  {
    id: 21,
    title: "HTML5",
    issuer: "OneBitCode",
    category: "Frontend",
    date: "Dez de 2023",
    link: "https://drive.google.com/file/d/152ZP6gay2dZLpnK5aMSoy25dj_Cxevoe/view?usp=sharing",
    imageURL: "/images/certificates/onebitcode.png",
  },
];

const WORK_LOCATION = {
  id: 1,
  type: "work",
  name: "Portifolio",
  icon: "/icons/work.svg",
  kind: "folder",
  children: [
    // ▶ Project 1
    {
      id: 5,
      name: "Vig Barber - Booking Platform",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-5",
      windowPosition: "top-[5vh] left-5",
      children: [
        {
          id: 1,
          name: "GitHub - vig-barber",
          icon: "/images/github.png",
          kind: "file",
          fileType: "url",
          href: "https://github.com/Gabriel-Vignoli/vig-barber",
          position: "top-5 left-10",
        },
        {
          id: 2,
          name: "vig-barber.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://vig-barber.vercel.app/",
          position: "top-10 right-20",
        },
        {
          id: 4,
          name: "vig-barber.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-80",
          imageUrl: "/images/project-1.png",
        },
      ],
    },

    // ▶ Project 2
    {
      id: 6,
      name: "SBN Circuito - Inscrições",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-52 right-80",
      windowPosition: "top-[20vh] left-7",
      children: [
        {
          id: 1,
          name: "GitHub - sbn-circuito-inscricoes",
          icon: "/images/github.png",
          kind: "file",
          fileType: "url",
          href: "https://github.com/Gabriel-Vignoli/sbn-circuito-inscricoes",
          position: "top-5 right-10",
        },
        {
          id: 2,
          name: "sbn-circuito.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://github.com/Gabriel-Vignoli/sbn-circuito-inscricoes",
          position: "top-20 left-20",
        },
        {
          id: 4,
          name: "sbn-circuito.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 left-80",
          imageUrl: "/images/project-2.png",
        },
      ],
    },

    // ▶ Project 3
    {
      id: 7,
      name: "Restaurante Carijó - Landing Page",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-80",
      windowPosition: "top-[33vh] left-7",
      children: [
        {
          id: 1,
          name: "GitHub - carijo",
          icon: "/images/github.png",
          kind: "file",
          fileType: "url",
          href: "https://github.com/Gabriel-Vignoli/restaurante-carijo",
          position: "top-5 left-10",
        },
        {
          id: 2,
          name: "restaurantecarijo.com.br",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://restaurantecarijo.com.br",
          position: "top-10 right-20",
        },
        {
          id: 4,
          name: "carijo.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-80",
          imageUrl: "/images/project-3.png",
        },
      ],
    },
  ],
};

const ABOUT_LOCATION = {
  id: 2,
  type: "about",
  name: "Sobre",
  icon: "/icons/info.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "gabriel.jpeg",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-5",
      imageUrl: "/images/gabriel.jpeg",
    },
    {
      id: 2,
      name: "casual-gabriel.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-28 right-72",
      imageUrl: "/images/gabriel-2.jpg",
    },
    {
      id: 3,
      name: "training-gabriel.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-52 left-80",
      imageUrl: "/images/gabriel-3.jpeg",
    },
    {
      id: 4,
      name: "about-me.txt",
      icon: "/images/txt.png",
      kind: "file",
      fileType: "txt",
      position: "top-60 left-5",
      subtitle: "Conheça o desenvolvedor por trás do código",
      image: "/images/gabriel.jpg",
      description: [
        "Olá! Sou o Gabriel 👋, estudante de Análise e Desenvolvimento de Sistemas na FATEC Mococa e desenvolvedor júnior em busca da minha primeira oportunidade na área.",
        "Trabalho principalmente com JavaScript, TypeScript, React, Next.js, Node.js, PostgreSQL, Prisma e TailwindCSS — e gosto de deixar tudo com uma boa experiência de uso.",
        "Sou bastante focado em UI limpa, boa UX e em escrever código organizado e fácil de manter.",
        "Fora da programação, você me encontra treinando musculação, praticando Muay Thai, jogando futsal ou curtindo um bom jogo no PC 😅",
      ],
    },
  ],
};

const RESUME_LOCATION = {
  id: 3,
  type: "resume",
  name: "Curriculo",
  icon: "/icons/file.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "curriculo.pdf",
      icon: "/images/pdf.png",
      kind: "file",
      fileType: "pdf",
      href: "/files/curriculo.pdf",
    },
  ],
};

const TRASH_LOCATION = {
  id: 4,
  type: "trash",
  name: "Lixeira",
  icon: "/icons/trash.svg",
  kind: "folder",
  children: [],
};

export const locations = {
  work: WORK_LOCATION,
  about: ABOUT_LOCATION,
  resume: RESUME_LOCATION,
  trash: TRASH_LOCATION,
};

const socials = [
  {
    id: 1,
    text: "GitHub",
    icon: "/icons/github.svg",
    bg: "#333333",
    link: "https://github.com/Gabriel-Vignoli",
  },
  {
    id: 2,
    text: "LinkedIn",
    icon: "/icons/linkedin.svg",
    bg: "#05b6f6",
    link: "https://www.linkedin.com/in/gabriel-vignoli/",
  },
  {
    id: 3,
    text: "Instagram",
    icon: "/icons/instagram.svg",
    bg: "#e1306c",
    link: "https://www.instagram.com/gabriel_vignolii/",
  },
  {
    id: 4,
    text: "Email",
    icon: "/icons/email.svg",
    bg: "#f4656b",
    link: "mailto:pessoalvignoli123@gmail.com",
  },
];

export { socials };

export { navLinks, navIcons, dockApps, INITIAL_Z_INDEX, WINDOW_CONFIG, techStack, courses };
