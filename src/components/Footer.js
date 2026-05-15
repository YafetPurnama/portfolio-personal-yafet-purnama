import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  AiFillGithub,
  // AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import { translations } from "../translations/translations";

function Footer() {
  let date = new Date();
  let year = date.getFullYear();
  
  const { language } = useTheme();
  const currentTranslations = translations[language];
  
  return (
    <Container fluid className="footer">
      <Row>
        <Col md="4" className="footer-copywright">
          <h3>{currentTranslations.footer_text}</h3>
        </Col>
        <Col md="4" className="footer-copywright">
          <h3>Copyright © {year} Yafet Purnama</h3>
        </Col>
        <Col md="4" className="footer-body">
          <ul className="footer-icons">
            <li className="social-icons">
              <a
                href="https://github.com/YafetPurnama/"
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="GitHub Yafet Purnama"
              >
                <AiFillGithub />
              </a>
            </li>
            <li className="social-icons">
              <a
                href="https://www.linkedin.com/in/yafet-purnama/"
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn Yafet Purnama"
              >
                <FaLinkedinIn />
              </a>
            </li>
            <li className="social-icons">
              <a
                href="https://www.instagram.com/yafetpurnama/"
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram Yafet Purnama"
              >
                <AiFillInstagram />
              </a>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
