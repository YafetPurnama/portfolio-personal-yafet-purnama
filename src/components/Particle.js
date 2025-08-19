import React, { useEffect, useState } from "react";
import Particles from "react-tsparticles";

function Particle() {
  const [effectiveTheme, setEffectiveTheme] = useState(
    typeof document !== "undefined"
      ? document.documentElement.getAttribute("data-theme") || "dark"
      : "dark"
  );

  useEffect(() => {
    const updateTheme = () => {
      const t = document.documentElement.getAttribute("data-theme") || "dark";
      setEffectiveTheme(t);
    };

    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  const isDark = effectiveTheme === "dark";

  const params = {
    fpsLimit: 60,
    particles: {
      number: {
        value: isDark ? 160 : 120,
        density: { enable: true, value_area: 1500 },
      },
      color: { value: isDark ? "#ffffff" : "#111827" },
      shape: { type: "circle" },
      line_linked: {
        enable: false,
        opacity: 0.03,
      },
      move: {
        direction: "none",
        speed: isDark ? 0.05 : 0.03,
      },
      size: { value: 1.5 },
      opacity: {
        value: isDark ? 0.25 : 0.12,
        anim: {
          enable: true,
          speed: 0.8,
          opacity_min: isDark ? 0.05 : 0.03,
        },
      },
    },
    interactivity: {
      events: {
        onclick: { enable: true, mode: "push" },
      },
      modes: {
        push: { particles_nb: 1 },
      },
    },
    retina_detect: true,
  };

  return <Particles id="tsparticles" key={effectiveTheme} params={params} />;
}

export default Particle;
