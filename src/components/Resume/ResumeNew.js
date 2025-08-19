import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Particle from "../Particle";
// import pdf from "../../Assets/CV ATS-Yafet Purnama.pdf";
import { AiOutlineDownload } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { useTheme } from "../../context/ThemeContext";
import { translations } from "../../translations/translations";

// Configure PDF.js worker - diperlukan untuk memuat PDF
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function ResumeNew() {
  const [width, setWidth] = useState(1200);
  const { language } = useTheme();
  const currentTranslations = translations[language];
  // Cache-busting supaya tidak mengambil response HTML lama dari cache (304)
  const [pdfUrl] = useState(() => `/cv-ats-yafet-purnama.pdf?v=${Date.now()}`);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  return (
    <div>
      <Container fluid className="resume-section">
        <Particle />
        <Row style={{ justifyContent: "center", position: "relative" }}>
          {/* <Button
            variant="primary"
            href={pdfUrl}
            target="_blank"
            style={{ maxWidth: "250px" }}
          >
            <AiOutlineDownload />
            &nbsp;{currentTranslations.download} CV
          </Button> */}
        </Row>

        <Row className="resume">
          <Document
            file={pdfUrl}
            className="d-flex justify-content-center"
            onLoadError={(err) => {
              // bantu diagnosa jika masih gagal
              // eslint-disable-next-line no-console
              console.error("PDF load error", err);
            }}
          >
            <Page pageNumber={1} scale={width > 786 ? 1.7 : 0.6} />
          </Document>
        </Row>

        <Row style={{ justifyContent: "center", paddingTop: "20px" }}>
          <p style={{ textAlign: "center" }}>
            {currentTranslations.view_cv_prompt}
          </p>
        </Row>

        <Row style={{ justifyContent: "center", position: "relative" }}>
          <Button
            variant="primary"
            href={pdfUrl}
            target="_blank"
            style={{ maxWidth: "250px" }}
          >
            <AiOutlineDownload />
            &nbsp;{currentTranslations.download} CV
          </Button>
        </Row>
      </Container>
    </div>
  );
}

export default ResumeNew;
