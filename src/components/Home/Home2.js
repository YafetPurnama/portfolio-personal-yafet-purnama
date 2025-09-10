import React, { useRef, useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/yafet.png";
import Tilt from "react-parallax-tilt";
import {
  AiFillGithub,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import { translations } from "../../translations/translations";
import { SkeletonElement, SkeletonText, SkeletonButton } from "../Skeleton";

function Home2() {
  const [loading, setLoading] = useState(true);
  const { language } = useTheme();
  const currentTranslations = translations[language];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showHello, setShowHello] = useState(false);
  const [bubblePos, setBubblePos] = useState({ x: 0, y: 0 });

  function handlePointerDown(e) {
    setIsDragging(true);
    setShowHello(true);
    updateBubblePosition(e);
  }

  function handlePointerMove(e) {
    if (!isDragging) return;
    updateBubblePosition(e);
  }

  function handlePointerUpLeave() {
    setIsDragging(false);
    setShowHello(false);
  }

  function updateBubblePosition(e) {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    setBubblePos({ x, y });
  }

  if (loading) {
    return (
      <Container fluid className="home-about-section" id="about">
        <Container>
          <Row className="align-items-center">
            <Col md={8} className="home-about-description">
              <SkeletonElement 
                type="title" 
                style={{ 
                  width: '50%', 
                  height: '40px', 
                  marginBottom: '30px',
                  borderRadius: '4px'
                }} 
              />
              <div style={{ marginBottom: '40px' }}>
                <SkeletonText lines={5} className="about-skeleton-text" />
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <SkeletonButton 
                  width="160px" 
                  height="50px" 
                  style={{ borderRadius: '4px' }}
                />
                <SkeletonButton 
                  width="160px" 
                  height="50px" 
                  style={{ borderRadius: '4px' }}
                />
              </div>
            </Col>
            <Col md={4} className="myAvtar">
              <div className="skeleton-avatar" style={{
                width: '300px',
                height: '300px',
                margin: '0 auto'
              }} />
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }

  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              {currentTranslations.about_title}
            </h1>
            <p className="home-about-body">
              {currentTranslations.about_description}
              <br />
              <br />
              {currentTranslations.about_fluent_prefix}
              <i>
                <b className="red-text"> {currentTranslations.about_fluent_tech} </b>
              </i>
              <br />
              <br />
              {currentTranslations.about_interest_prefix}&nbsp;
              <i>
                <b className="red-text">{currentTranslations.about_interest_highlight} </b>
                {currentTranslations.and_also_in}{" "}
                <b className="red-text">
                  {currentTranslations.about_interest_blockchain}
                </b>
              </i>
              <br />
              <br />
              {currentTranslations.about_apply_prefix}{" "}
              <b className="red-text">{currentTranslations.about_apply_node}</b> {currentTranslations.and_word}
              <i>
                <b className="red-text"> {currentTranslations.about_apply_highlight_libs}</b>
              </i>
              &nbsp;{currentTranslations.like_word}{" "}
              <i>
                <b className="red-text"> {currentTranslations.about_apply_frameworks}</b>
              </i>
              {currentTranslations.desc_laravel}
              <i>
                <b className="red-text">{currentTranslations.about_php}</b>
              </i>
              &nbsp;{currentTranslations.dengan}&nbsp;
              <i>
                <b className="red-text">{currentTranslations.about_apply_laravel}</b>
              </i>
              {currentTranslations.titik}&nbsp;
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <div
              ref={containerRef}
              className="profile-picture-container avatar-interactive"
              onMouseDown={handlePointerDown}
              onMouseMove={handlePointerMove}
              onMouseUp={handlePointerUpLeave}
              onMouseLeave={handlePointerUpLeave}
              onTouchStart={handlePointerDown}
              onTouchMove={handlePointerMove}
              onTouchEnd={handlePointerUpLeave}
            >
              <Tilt glareEnable={true} glareColor="rgba(220,38,38,0.25)" glareMaxOpacity={0.3} tiltMaxAngleX={10} tiltMaxAngleY={10}>
                <div className="profile-picture-border profile-picture-border--plain avatar-float">
                  <img src={myImg} className="profile-picture-img" alt="avatar" />
                </div>
              </Tilt>

              {showHello && (
                <div
                  className="hello-bubble"
                  style={{ left: bubblePos.x + 10, top: bubblePos.y - 10 }}
                >
                  {currentTranslations.greeting} {currentTranslations.greeting_emoji}
                </div>
              )}
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <h1>{currentTranslations.find_me_on}</h1>
            <p>
              {currentTranslations.connect_prefix}{" "}
              <span className="red-text">{currentTranslations.connect_word} </span>
              {currentTranslations.connect_suffix}
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/YafetPurnama"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/yafet-purnama/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.instagram.com/YafetPurnama/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillInstagram />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
