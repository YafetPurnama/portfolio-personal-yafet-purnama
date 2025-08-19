import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Particle from "../Particle";
import Github from "./Github";
import Techstack from "./Techstack";
import Aboutcard from "./AboutCard";
import Toolstack from "./Toolstack";
import { useTheme } from "../../context/ThemeContext";
import { translations } from "../../translations/translations";

import portfolioPdf from "../../Assets/Portfolio-Yafet-Purnama.pdf";
import { AiOutlineDownload, AiOutlineEye } from "react-icons/ai";
import Modal from "react-bootstrap/Modal";

// function About() {
//   const { language } = useTheme();
//   const currentTranslations = translations[language];
  
//   return (
//     <Container fluid className="about-section">
//       <Particle />
//       <Container>
//         <Row style={{ justifyContent: "center", padding: "10px" }}>
//           <Col
//             md={7}
//             style={{
//               justifyContent: "center",
//               paddingTop: "30px",
//               paddingBottom: "50px",
//             }}
//           >
//             <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
//               Know Who <strong className="red-text">I'M</strong>
//             </h1>
//             <Aboutcard />
//           </Col>
//           <Col
//             md={5}
//             style={{ paddingTop: "120px", paddingBottom: "50px" }}
//             className="about-img"
//           >
//             <img src={laptopImg} alt="about" className="img-fluid" />
//           </Col>
//         </Row>
//         <h1 className="project-heading">
//           Professional <strong className="red-text">Skillset </strong>
//         </h1>

//         <Techstack />

//         <h1 className="project-heading">
//           <strong className="red-text">Tools</strong> I use
//         </h1>
//         <Toolstack />

//         <Github />
//       </Container>
//     </Container>
//   );
// }

function About() {
  const { language } = useTheme();
  const currentTranslations = translations[language];
  const [showPreview, setShowPreview] = useState(false);
  
  return (
    <Container fluid className="about-section">
      <Particle />
      <Container>
        <Row style={{ justifyContent: "center", padding: "10px" }} className="align-items-center">
          <Col
            md={7}
            style={{
              justifyContent: "center",
              paddingTop: "30px",
              paddingBottom: "50px",
            }}
          >
            {/* <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
              Know Who <strong className="red-text">I'M</strong>
            </h1> */}
            <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
              {currentTranslations.about_page.title_1}{" "}
              <strong className="red-text">{currentTranslations.about_page.title_1_strong}</strong>
            </h1>
            <Aboutcard />
          </Col>
          <Col
            md={5}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: "0px",
              paddingBottom: "0px"
            }}
            className="about-buttons"
          >
            {/* Ganti gambar dengan Tombol Preview dan Download */}
            <h2 style={{ marginBottom: "2rem", textAlign: "center" }}>Click <strong className="red-text">Here</strong></h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
              <Button
                variant="secondary"
                onClick={() => setShowPreview(true)}
                style={{
                  maxWidth: '250px',
                  backgroundColor: '#373737', // Warna abu-abu gelap
                  borderColor: '#4d4d4d'
                }}
              >
                <AiOutlineEye style={{ marginBottom: "2px" }} /> &nbsp;
                {currentTranslations.preview_about}
              </Button>
              <Button
                variant="primary"
                href={portfolioPdf}
                download="Portfolio-Yafet-Purnama.pdf"
                style={{ maxWidth: '250px' }}
              >
                <AiOutlineDownload style={{ marginBottom: "2px" }} /> &nbsp;
                {currentTranslations.download_about}
              </Button>
            </div>

            {/* Preview Modal */}
            <Modal
              show={showPreview}
              onHide={() => setShowPreview(false)}
              size="xl"
              centered
              aria-labelledby="portfolio-pdf-preview"
              backdropClassName="modal-backdrop-blur"
            >
              <Modal.Header closeButton>
                <Modal.Title id="portfolio-pdf-preview">
                  {currentTranslations.pdf_preview_title || 'Portfolio PDF Preview'}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ padding: 0 }}>
                <iframe
                  title="portfolio-pdf"
                  src={portfolioPdf}
                  style={{ width: '100%', height: '80vh', border: 'none' }}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowPreview(false)}>
                  {currentTranslations.close}
                </Button>
                <Button variant="primary" href={portfolioPdf} download="Portfolio-Yafet-Purnama.pdf">
                  <AiOutlineDownload style={{ marginBottom: "2px" }} /> &nbsp;{currentTranslations.download}
                </Button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
        {/* <h1 className="project-heading">
          Professional <strong className="red-text">Skillset </strong>
        </h1> */}
        <h1 className="project-heading">
          {currentTranslations.about_page.title_2}{" "}
          <strong className="red-text">{currentTranslations.about_page.title_2_strong} </strong>
        </h1>
        <Techstack />

        {/* <h1 className="project-heading">
          <strong className="red-text">Tools</strong> I use
        </h1> */}
        <h1 className="project-heading">
          <strong className="red-text">{currentTranslations.about_page.title_3_strong}</strong>{" "}
          {currentTranslations.about_page.title_3}
        </h1>
        <Toolstack />

        <Github />
      </Container>
    </Container>
  );
}

export default About;
