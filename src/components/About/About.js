import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Particle from "../Particle";
import Github from "./Github";
import Techstack from "./Techstack";
import Aboutcard from "./AboutCard";
import Toolstack from "./Toolstack";
import { useTheme } from "../../context/ThemeContext";
import { translations } from "../../translations/translations";
import { SkeletonElement, SkeletonText, SkeletonButton } from "../Skeleton";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  
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
            {loading ? (
              <>
                <SkeletonElement
                  type="title"
                  style={{
                    width: "60%",
                    height: "48px",
                    marginBottom: "30px",
                    borderRadius: "4px",
                  }}
                />
                <div style={{ marginBottom: "40px" }}>
                  <SkeletonText lines={5} className="about-skeleton-text" />
                </div>
              </>
            ) : (
              <>
                <h1 style={{ fontSize: "2.1em", paddingBottom: "20px" }}>
                  {currentTranslations.about_page.title_1}{" "}
                  <strong className="red-text">{currentTranslations.about_page.title_1_strong}</strong>
                </h1>
                <Aboutcard />
              </>
            )}
          </Col>
          <Col
            md={5}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: "0px",
              paddingBottom: "0px",
            }}
            className="about-buttons"
          >
            {loading ? (
              <>
                <SkeletonElement
                  type="title"
                  style={{
                    width: "200px",
                    height: "32px",
                    marginBottom: "30px",
                    borderRadius: "4px",
                  }}
                />
                <div style={{ display: "flex", justifyContent: "center", gap: "20px", width: "100%" }}>
                  <SkeletonButton width="200px" height="50px" />
                  <SkeletonButton width="200px" height="50px" />
                </div>
              </>
            ) : (
              <>
                <h2 style={{ marginBottom: "2rem", textAlign: "center" }}>
                  Click <strong className="red-text">Here</strong>
                </h2>
                <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
                  <Button
                    variant="secondary"
                    onClick={() => setShowPreview(true)}
                    style={{
                      maxWidth: "250px",
                      backgroundColor: "#373737",
                      borderColor: "#4d4d4d",
                    }}
                  >
                    <AiOutlineEye style={{ marginBottom: "2px" }} /> &nbsp;
                    {currentTranslations.preview_about}
                  </Button>
                  <Button
                    variant="primary"
                    href={portfolioPdf}
                    download="Portfolio-Yafet-Purnama.pdf"
                    style={{ maxWidth: "250px" }}
                  >
                    <AiOutlineDownload style={{ marginBottom: "2px" }} /> &nbsp;
                    {currentTranslations.download_about}
                  </Button>
                </div>
              </>
            )}

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
                  {currentTranslations.pdf_preview_title || "Portfolio PDF Preview"}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ padding: 0 }}>
                <iframe
                  title="portfolio-pdf"
                  src={portfolioPdf}
                  style={{ width: "100%", height: "80vh", border: "none" }}
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
        {loading ? (
          <div style={{ margin: "40px 0" }}>
            <SkeletonElement
              type="title"
              style={{
                width: "50%",
                height: "40px",
                marginBottom: "30px",
                borderRadius: "4px",
              }}
            />
            <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", marginBottom: "40px" }}>
              {[...Array(8)].map((_, i) => (
                <SkeletonElement
                  key={i}
                  type="text"
                  style={{
                    width: "100px",
                    height: "40px",
                    borderRadius: "20px",
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          <>
            <h1 className="project-heading">
              {currentTranslations.about_page.title_2}{" "}
              <strong className="red-text">{currentTranslations.about_page.title_2_strong} </strong>
            </h1>
            <Techstack />
          </>
        )}

        {loading ? (
          <div style={{ margin: "40px 0" }}>
            <SkeletonElement
              type="title"
              style={{
                width: "40%",
                height: "40px",
                marginBottom: "30px",
                borderRadius: "4px",
              }}
            />
            <div style={{ display: "flex", flexWrap: "wrap", gap: "15px", marginBottom: "40px" }}>
              {[...Array(6)].map((_, i) => (
                <SkeletonElement
                  key={i}
                  type="text"
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "8px",
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          <>
            <h1 className="project-heading">
              <strong className="red-text">{currentTranslations.about_page.title_3_strong}</strong>{" "}
              {currentTranslations.about_page.title_3}
            </h1>
            <Toolstack />
          </>
        )}

        {!loading && <Github />}
      </Container>
    </Container>
  );
}

export default About;
