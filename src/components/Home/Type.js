import React from "react";
import Typewriter from "typewriter-effect";
import { useTheme } from "../../context/ThemeContext";
import { translations } from "../../translations/translations";

function Type() {
  const { language } = useTheme();
  const currentTranslations = translations[language];

  return (
    <Typewriter
      options={{
        strings: currentTranslations.typewriter_strings,
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Type;
