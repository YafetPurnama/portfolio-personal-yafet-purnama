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
import ReactDOM from "react-dom";
import { FiShare2 } from "react-icons/fi";
import { FaFacebook, FaWhatsapp, FaTwitter } from "react-icons/fa";
import "../Certificates/Certificates.css";

// Configure PDF.js worker - diperlukan untuk memuat PDF
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function ResumeNew() {
  const [width, setWidth] = useState(1200);
  const { language } = useTheme();
  const currentTranslations = translations[language];
  const pdfUrl = "/cv-ats-yafet-purnama.pdf";

  const [copied, setCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const labels = {
    share: {
      title: language === 'id' ? 'Bagikan' : 'Share',
      linkText: language === 'id' ? 'Klik untuk menyalin link' : 'Click to copy link',
      copied: language === 'id' ? 'Tersalin!' : 'Copied!',
      copyBtn: language === 'id' ? 'Salin' : 'Copy'
    }
  };

  const handleShareClick = () => setShowShareMenu(true);
  
  const getShareUrl = () => window.location.href;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getShareUrl());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareToPlatform = (platform) => {
    const url = encodeURIComponent(getShareUrl());
    const text = encodeURIComponent(`Lihat Curriculum Vitae saya`);

    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
        break;
      default:
        return;
    }
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  // OLD
  // Cache-busting supaya tidak mengambil response HTML lama dari cache (304)
  // const [pdfUrl] = useState(() => `/cv-ats-yafet-purnama.pdf?v=${Date.now()}`);

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

        <Row style={{ justifyContent: "center", position: "relative", gap: "15px" }}>
          <Button
            variant="primary"
            href={pdfUrl}
            target="_blank"
            style={{ maxWidth: "250px" }}
          >
            <AiOutlineDownload />
            &nbsp;{currentTranslations.download} CV
          </Button>
          <Button
            variant="primary"
            onClick={handleShareClick}
            style={{ maxWidth: "250px" }}
          >
            <FiShare2 />
            &nbsp;{labels.share.title}
          </Button>
        </Row>

        {showShareMenu && ReactDOM.createPortal(
          <div className="share-menu-overlay" onClick={() => setShowShareMenu(false)}>
            <div className="share-menu-container" onClick={e => e.stopPropagation()}>
              <div className="share-menu-header">
                <h5>{labels.share.title}</h5>
                <button className="share-menu-close" onClick={() => setShowShareMenu(false)}>✕</button>
              </div>

              <div className="share-menu-options">
                <div className="share-option" onClick={() => shareToPlatform('facebook')}>
                  <div className="share-icon facebook"><FaFacebook /></div>
                  <span>Facebook</span>
                </div>
                <div className="share-option" onClick={() => shareToPlatform('whatsapp')}>
                  <div className="share-icon whatsapp"><FaWhatsapp /></div>
                  <span>WhatsApp</span>
                </div>
                <div className="share-option" onClick={() => shareToPlatform('twitter')}>
                  <div className="share-icon twitter"><FaTwitter /></div>
                  <span>X</span>
                </div>
              </div>

              <div className="share-menu-link-section">
                <div className="share-link-label">{labels.share.linkText}</div>
                <div className="share-link-box">
                  <input type="text" readOnly value={getShareUrl()} />
                  <button className="share-copy-btn" onClick={copyToClipboard}>
                    {copied ? labels.share.copied : labels.share.copyBtn}
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
      </Container>
    </div>
  );
}

export default ResumeNew;
