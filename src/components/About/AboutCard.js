import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";
import { useTheme } from "../../context/ThemeContext";
import { translations } from "../../translations/translations";

function AboutCard() {
  const { language } = useTheme();
  const currentTranslations = translations[language];

  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            {currentTranslations.about_card_greeting}{" "}
            <span className="purple">{currentTranslations.name}</span>
            {" "}{currentTranslations.from}{" "}
            <span className="purple">{currentTranslations.location}</span>
            <br />
            {currentTranslations.about_card_status}
            <br />
            <br />
            {currentTranslations.about_card_activities_intro}
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> {currentTranslations.about_card_activity_1}
            </li>
            <li className="about-activity">
              <ImPointRight /> {currentTranslations.about_card_activity_2}
            </li>
            <li className="about-activity">
              <ImPointRight /> {currentTranslations.about_card_activity_3}
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            {currentTranslations.about_card_quote}{" "}
          </p>
          <footer className="blockquote-footer">{currentTranslations.name}</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;