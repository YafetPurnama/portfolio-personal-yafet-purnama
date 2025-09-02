import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProfilePicture from "../../Assets/Profile-Picture.png";
import Particle from "../Particle";
import Home2 from "./Home2";
import Type from "./Type";
import { useTheme } from "../../context/ThemeContext";
import { translations } from "../../translations/translations";

function Home() {
  const { language } = useTheme();
  const currentTranslations = translations[language];

  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              <h1 style={{ paddingBottom: 15 }} className="heading">
                {currentTranslations.greeting}{" "}
                <span className="wave" role="img" aria-labelledby="wave">
                  {currentTranslations.greeting_emoji}
                </span>
              </h1>

              <h1 className="heading-name">
                {currentTranslations.name_prefix}{" "}
                <strong className="main-name"> {currentTranslations.name}</strong>
              </h1>

              <div style={{ padding: 50, textAlign: "left" }}>
              {/* <div className="typewriter-container"> */}
                <Type />
              </div>
            </Col>

            <Col md={5} style={{ paddingBottom: 20 }}>
              <div className="profile-picture-container">
                <div className="profile-picture-border">
                  <img
                    src={ProfilePicture}
                    alt="Profile Picture"
                    className="profile-picture-img"
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
      <Home2 />
    </section>
  );
}

export default Home;
