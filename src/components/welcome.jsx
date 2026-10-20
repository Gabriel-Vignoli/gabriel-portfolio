import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const FONT_WEIGHT = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 },
};

const renderText = (text, className, baseWeight = 400) => {
  const words = text.split(" ");

  return words.map((word, wordIndex) => (
    <span key={wordIndex} className="inline">
      {/* Each word is one unbreakable block, so lines only break between words */}
      <span className="inline-block whitespace-nowrap">
        {[...word].map((char, charIndex) => (
          <span
            key={charIndex}
            data-letter
            className={`${className} inline-block`}
            style={{ fontVariationSettings: `'wght' ${baseWeight}` }}
          >
            {char}
          </span>
        ))}
      </span>

      {/* Normal, breakable space between words */}
      {wordIndex < words.length - 1 && <span className={className}> </span>}
    </span>
  ));
};

const setupTextHover = (container, type) => {
  if (!container) return;

  const letters = container.querySelectorAll("[data-letter]");
  const { min, max, default: base } = FONT_WEIGHT[type];

  const animateLetter = (letter, weight, duration = 0.25) => {
    return gsap.to(letter, {
      duration,
      ease: "power2.out",
      fontVariationSettings: `'wght' ${weight}`,
    });
  };

  const handleMouseMove = (e) => {
    const { left } = container.getBoundingClientRect();
    const mouseX = e.clientX - left;

    letters.forEach((letter) => {
      const { left: l, width: w } = letter.getBoundingClientRect();
      const distance = Math.abs(mouseX - (l - left + w / 2));
      const intensity = Math.exp(-(distance ** 2) / 20000);

      animateLetter(letter, min + (max - min) * intensity);
    });
  };

  const handleMouseLeave = () => {
    letters.forEach((letter) => animateLetter(letter, base, 0.3));
  };

  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseleave", handleMouseLeave);
  };
};

const Welcome = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useGSAP(() => {
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    if (!title || !subtitle) return;

    const subtitleLetters = subtitle.querySelectorAll("[data-letter]");
    const titleLetters = title.querySelectorAll("[data-letter]");

    let cleanups = [];

    // Hover effect only turns on after the intro animation ends
    const enableHover = () => {
      cleanups = [
        setupTextHover(title, "title"),
        setupTextHover(subtitle, "subtitle"),
      ];
    };

    const cleanup = () => cleanups.forEach((fn) => fn?.());

    // Respect "reduce motion": skip the intro
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      enableHover();
      return cleanup;
    }

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
      onComplete: enableHover,
    });

    tl.fromTo(
      subtitleLetters,
      { opacity: 0, y: 20, filter: "blur(8px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.8,
        stagger: 0.025,
        clearProps: "filter,transform",
      },
    ).fromTo(
      titleLetters,
      {
        opacity: 0,
        yPercent: 60,
        filter: "blur(12px)",
        fontVariationSettings: "'wght' 100",
      },
      {
        opacity: 1,
        yPercent: 0,
        filter: "blur(0px)",
        fontVariationSettings: "'wght' 400",
        duration: 1,
        stagger: 0.06,
        clearProps: "filter,transform",
      },
      "-=0.4",
    );

    return () => {
      tl.kill();
      cleanup();
    };
  }, []);

  return (
    <section id="welcome">
      <p ref={subtitleRef} className="text-center">
        {renderText(
          "Olá, Eu sou o Gabriel! Seja bem-vindo ao meu",
          "text-xl sm:text-2xl md:text-3xl lg:text-3xl font-georama",
          100,
        )}
      </p>
      <h1 ref={titleRef} className="mt-6 md:mt-7 text-center">
        {renderText(
          "portfólio",
          "text-6xl sm:text-8xl md:text-9xl lg:text-9xl italic font-georama",
        )}
      </h1>
    </section>
  );
};

export default Welcome;