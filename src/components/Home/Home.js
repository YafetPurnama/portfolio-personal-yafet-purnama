import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProfilePicture from "../../Assets/Profile-Picture.png";
import Particle from "../Particle";
import Home2 from "./Home2";
import Type from "./Type";
import { useTheme } from "../../context/ThemeContext";
import { translations } from "../../translations/translations";
import { SkeletonElement, SkeletonText, SkeletonButton } from "../Skeleton";
import { Helmet } from "react-helmet-async";

function Home() {
  const [loading, setLoading] = useState(true);
  const { language } = useTheme();
  const currentTranslations = translations[language];

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section>
      <Helmet>
        <title>Yafet Purnama - Software Developer | Full-Stack Web & Mobile Portfolio</title>
        <meta name="description" content="Yafet Purnama — Software Developer & Full-Stack Web Developer dari Surabaya, Indonesia. Berpengalaman di Laravel, React.js, Next.js, PHP, JavaScript, dan C#. Lihat proyek, sertifikat, dan pengalaman saya." />
        <link rel="canonical" href="https://portfolio-yafetpurnama.vercel.app/" />
      </Helmet>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              {loading ? (
                <div style={{ width: '100%' }}>
                  <SkeletonElement 
                    type="title" 
                    style={{ 
                      width: '60%', 
                      height: '32px', 
                      marginBottom: '24px' 
                    }} 
                  />
                  <SkeletonElement 
                    type="title" 
                    style={{ 
                      width: '80%', 
                      height: '48px', 
                      marginBottom: '40px' 
                    }} 
                  />
                  <div style={{ marginBottom: '40px' }}>
                    <SkeletonText lines={3} className="home-skeleton-text" />
                  </div>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <SkeletonButton width="160px" height="50px" />
                    <SkeletonButton width="160px" height="50px" />
                  </div>
                </div>
              ) : (
                <>
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

                  <div style={{ padding: 50, textAlign: "left" }} className="typewriter-wrapper">
                    {/* <div className="typewriter-container"> */}
                    <Type />
                  </div>
                </>
              )}
            </Col>

            <Col md={5} style={{ paddingBottom: 20 }}>
              {loading ? (
                <div className="skeleton-avatar" style={{
                  width: '300px',
                  height: '300px',
                  margin: '0 auto'
                }} />
              ) : (
                <div className="profile-picture-container">
                  <div className="profile-picture-border">
                    <img
                      src={ProfilePicture}
                      alt="Profile Picture"
                      className="profile-picture-img"
                    />
                  </div>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </Container>
      {!loading && <Home2 />}
    </section>
  );
}

export default Home;
