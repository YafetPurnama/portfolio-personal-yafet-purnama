import React, { useState, useEffect, useRef, useCallback } from "react";
import ReactDOM from "react-dom";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import Particle from "../Particle";
import { Document, Page, pdfjs } from "react-pdf";
import { useTheme } from "../../context/ThemeContext";
import { translations } from "../../translations/translations";
import { certificateItems } from "./data";
import { FiShare2, FiCopy } from "react-icons/fi";
import { FaFacebook, FaWhatsapp, FaTwitter } from "react-icons/fa";
import "./Certificates.css";

import SkeletonElement, { SkeletonCertificate } from "../Skeleton";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function Certificates() {
  const { language } = useTheme();
  const t = translations[language] || {};

  const labels = {
    title: t.certificates_title || (language === 'id' ? 'Sertifikat' : 'Certificates'),
    subtext: t.certificates_subtext || (language === 'id' ? 'Kumpulan sertifikat dan penghargaan saya.' : 'A curated selection of my certifications and awards.'),
    empty: t.certificates_empty || (language === 'id' ? 'Sertifikat akan ditampilkan di sini.' : 'Certificates will appear here soon.'),
    meta: {
      issuer: language === 'id' ? 'Penerbit' : 'Issuer',
      credentialId: language === 'id' ? 'Credential ID' : 'Credential ID',
      credentialUrl: language === 'id' ? 'Credential URL' : 'Credential URL',
      issueDate: language === 'id' ? 'Tanggal terbit' : 'Issue date',
      expiryDate: language === 'id' ? 'Tanggal kedaluwarsa' : 'Expiration date',
      description: language === 'id' ? 'Deskripsi' : 'Description',
      viewCredential: language === 'id' ? 'Lihat Kredensial' : 'View Credential',
    },
    share: {
      title: language === 'id' ? 'Bagikan' : 'Share',
      linkText: language === 'id' ? 'Klik untuk menyalin link' : 'Click to copy link',
      copied: language === 'id' ? 'Tersalin!' : 'Copied!',
      copyBtn: language === 'id' ? 'Salin' : 'Copy'
    }
  };

  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  // Mengecek URL parameter saat load awal untuk membuka sertifikat
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const certId = params.get("id");
    if (certId) {
      const foundCert = certificateItems.find(c => c.id === certId);
      if (foundCert) {
        setSelected(foundCert);
      }
    }
  }, []);

  const handleShareClick = () => {
    setShowShareMenu(true);
  };

  const getShareUrl = () => {
    if (!selected) return window.location.href;
    const url = new URL(window.location.href);
    url.searchParams.set("id", selected.id);
    return url.toString();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getShareUrl());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareToPlatform = (platform) => {
    const url = encodeURIComponent(getShareUrl());
    const text = encodeURIComponent(`Lihat sertifikat saya: ${selected?.title}`);

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

  // [NEW] untuk Multi-page PDF
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  // [NEW] Fullscreen Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxPage, setLightboxPage] = useState(1);
  const lightboxCanvasRef = useRef(null);

  // const certificates = certificateItems;
  const certificates = [...certificateItems].sort((a, b) => {
    // Logika: Tanggal B dikurang Tanggal A = Descending (Terbaru ke Terlama)
    return new Date(b.issueDate) - new Date(a.issueDate);
  });
  const locale = language === 'id' ? 'id-ID' : 'en-US';

  const formatDate = (val) => {
    if (!val) return null;
    const d = new Date(val);
    if (isNaN(d.getTime())) return val;
    return d.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // Fungsi saat PDF berhasil di-load
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  // Fungsi Ganti Halaman
  const changePage = (offset) => {
    setPageNumber((prevPage) => {
      const next = prevPage + offset;
      if (!numPages) return prevPage;
      return Math.min(Math.max(next, 1), numPages);
    });
  };

  // ===== Fullscreen Lightbox Functions =====
  const openLightbox = useCallback(() => {
    if (!selected || selected.type === 'image') return;
    setLightboxPage(pageNumber);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  }, [selected, pageNumber]);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
  }, []);

  const lightboxChangePage = useCallback((offset) => {
    setLightboxPage((prev) => {
      if (!numPages) return prev;
      return Math.min(Math.max(prev + offset, 1), numPages);
    });
  }, [numPages]);

  // Open lightbox for image-type certificates
  const openImageLightbox = useCallback((cert) => {
    setLightboxOpen(true);
    setLightboxPage(1);
    document.body.style.overflow = 'hidden';
  }, []);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') lightboxChangePage(-1);
      if (e.key === 'ArrowRight') lightboxChangePage(1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxOpen, closeLightbox, lightboxChangePage]);

  // Clean up overflow on unmount
  useEffect(() => {
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200); // Loading selama 1.2 detik
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container fluid className="certificate-section">
      <Particle />
      <Container>
        <h1 className="certificate-heading">{labels.title}</h1>
        <p className="project-subtext">{labels.subtext}</p>

        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {loading ? (
            [...Array(6)].map((_, index) => (
              <Col md={4} className="certificate-card" key={index}>
                <SkeletonCertificate />
              </Col>
            ))
          ) : (
            certificates.length === 0 ? (
              <div className="certificate-empty">{labels.empty}</div>
            ) : (
              certificates.map((cert) => (
                <Col md={4} className="certificate-card" key={cert.id}>
                  <div
                    className="certificate-card-view"
                    role="button"
                    onClick={() => setSelected(cert)}
                  >
                    {cert.type === "image" ? (
                      <img src={cert.src} alt={cert.title} className="certificate-thumb" />
                    ) : (
                      <div className="pdf-thumb">
                        <Document file={cert.src} className="d-flex justify-content-center"
                          loading={
                            <div style={{ height: '220px', width: '100%', background: '#f0f0f0' }}>
                              <SkeletonElement type="thumbnail" style={{ height: '100%' }} />
                            </div>
                          }>
                          <Page pageNumber={1} width={350} renderTextLayer={false} renderAnnotationLayer={false} />
                        </Document>
                      </div>
                    )}
                    <div className="certificate-title">{cert.title}</div>
                    {/* Tampilan Meta di Card (Hanya Issuer & Date) */}
                    <div className="certificate-meta">
                      {cert.issuer && (
                        <div className="meta-row">
                          <span className="meta-label">{labels.meta.issuer}</span>
                          <span className="meta-value">{cert.issuer}</span>
                        </div>
                      )}
                      {cert.issueDate && (
                        <div className="meta-row">
                          <span className="meta-label">{labels.meta.issueDate}</span>
                          <span className="meta-value">{formatDate(cert.issueDate)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Col>
              ))
            )
          )}
        </Row>
      </Container>

      {/* MODAL SECTION */}
      <Modal
        show={!!selected}
        onHide={() => { setSelected(null); setPageNumber(1); setShowShareMenu(false); }}
        size="lg"
        centered
        contentClassName="certificate-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title className="w-100 d-flex align-items-center justify-content-between pe-3">
            <span>{selected?.title}</span>
            <div className="share-icon-wrapper">
              <button
                className="share-icon-btn"
                onClick={handleShareClick}
                aria-label={language === 'id' ? 'Bagikan Link' : 'Share Link'}
              >
                <FiShare2 />
              </button>
              <div className="share-tooltip">
                {language === 'id' ? 'Bagikan Link' : 'Share Link'}
              </div>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ position: 'relative' }}>

          {/* Share Menu Overlay via Portal to cover full screen */}
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
          {selected?.type === "image" ? (
            <img src={selected.src} alt={selected.title} className="certificate-full" />
          ) : selected ? (
            <div className="pdf-viewer-container" style={{ position: 'relative' }}>
              <div className="pdf-viewer" style={{ cursor: 'pointer' }} onClick={openLightbox} title="Click to view fullscreen">
                <Document
                  file={selected.src}
                  className="d-flex justify-content-center"
                  onLoadSuccess={onDocumentLoadSuccess}
                  loading={
                    <div style={{ width: '100%', padding: '20px', display: 'flex', justifyContent: 'center' }}>
                      <SkeletonElement type="thumbnail" style={{ width: '500px', height: '350px' }} />
                    </div>
                  }
                >
                  <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} />
                </Document>

                {numPages > 1 && (
                  <div className="pdf-controls">
                    <button
                      className="pdf-nav-btn prev-btn"
                      disabled={pageNumber <= 1}
                      onClick={(e) => { e.stopPropagation(); changePage(-1); }}
                    >
                      &#8249; {/* Left Arrow Symbol */}
                    </button>

                    <span className="page-info">
                      Page {pageNumber} of {numPages}
                    </span>

                    <button
                      className="pdf-nav-btn next-btn"
                      disabled={pageNumber >= numPages}
                      onClick={(e) => { e.stopPropagation(); changePage(1); }}
                    >
                      &#8250; {/* Right Arrow Symbol */}
                    </button>
                  </div>
                )}
              </div>
              <span className="pdf-tap-hint">🔍 Tap to fullscreen</span>
            </div>

          ) : null}

          {selected && (
            <div className="certificate-details">
              <div className="details-rows">
                {selected.issuer && (
                  <div className="meta-row">
                    <span className="meta-label">{labels.meta.issuer}</span>
                    <span className="meta-value">{selected.issuer}</span>
                  </div>
                )}
                {selected.credentialId && (
                  <div className="meta-row">
                    <span className="meta-label">{labels.meta.credentialId}</span>
                    {/* <span className="meta-value">{selected.credentialId}</span> */}
                    <span className="meta-value copy-text">{selected.credentialId}</span>
                  </div>
                )}
                {selected.credentialUrl && (
                  <div className="meta-row">
                    <span className="meta-label">{labels.meta.credentialUrl}</span>
                    <span className="meta-value">
                      <a href={selected.credentialUrl} target="_blank" rel="noreferrer" className="credential-link">
                        {selected.credentialUrl}
                      </a>
                      {/* <a href={selected.credentialUrl} target="_blank" rel="noreferrer" className="credential-link">{selected.credentialUrl}</a> */}
                    </span>
                  </div>
                )}
                {/* {formatDate(selected.issueDate) && ( */}
                {selected.issueDate && (
                  <div className="meta-row">
                    <span className="meta-label">{labels.meta.issueDate}</span>
                    <span className="meta-value">{formatDate(selected.issueDate)}</span>
                  </div>
                )}
                {formatDate(selected.expiryDate) && (
                  <div className="meta-row">
                    <span className="meta-label">{labels.meta.expiryDate}</span>
                    <span className="meta-value">{formatDate(selected.expiryDate)}</span>
                  </div>
                )}


                {selected.description && (
                  // <div className="meta-row meta-description">
                  <div className="meta-row" >
                    <span className="meta-label">{labels.meta.description}</span> {/* style={{ flexDirection: 'column', gap: '5px' }} */}
                    {/* <span className="meta-value">{selected.description}</span> */}
                    <span className="meta-value" > {/* style={{ textAlign: 'left', whiteSpace: 'pre-wrap' }} */}
                      {/* {selected.description} */}
                      {typeof selected.description === 'object'
                        ? (language === 'id' ? selected.description.id : selected.description.en)
                        : selected.description
                      }
                    </span>
                  </div>
                )}
              </div>


              <div className="meta-actions">
                {selected.credentialUrl && (
                  <a href={selected.credentialUrl} target="_blank" rel="noreferrer" className="credential-btn">
                    {labels.meta.viewCredential}
                  </a>
                )}
                <button
                  onClick={handleShareClick}
                  className="credential-btn d-inline-flex align-items-center"
                  style={{ marginLeft: selected.credentialUrl ? '10px' : '0', gap: '6px' }}
                >
                  <FiShare2 />
                  {language === 'id' ? 'Bagikan Link' : 'Share Link'}
                </button>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>

      {/* ===== Fullscreen Lightbox Overlay (Portal to body) ===== */}
      {lightboxOpen && selected && ReactDOM.createPortal(
        <div className="cert-lightbox-overlay" onClick={closeLightbox}>
          <button className="cert-lightbox-close" onClick={closeLightbox} aria-label="Close">
            ✕
          </button>

          {selected.type === 'image' ? (
            <img
              src={selected.src}
              alt={selected.title}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Document file={selected.src} className="d-flex justify-content-center">
                <Page
                  pageNumber={lightboxPage}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  scale={2.0}
                  className="cert-lightbox-page"
                />
              </Document>
            </div>
          )}

          {/* Lightbox Nav Buttons (for multi-page PDF) */}
          {selected.type !== 'image' && numPages > 1 && (
            <>
              <button
                className="cert-lightbox-nav prev"
                disabled={lightboxPage <= 1}
                onClick={(e) => { e.stopPropagation(); lightboxChangePage(-1); }}
                style={{ opacity: lightboxPage <= 1 ? 0.3 : 1 }}
              >
                &#8249;
              </button>
              <button
                className="cert-lightbox-nav next"
                disabled={lightboxPage >= numPages}
                onClick={(e) => { e.stopPropagation(); lightboxChangePage(1); }}
                style={{ opacity: lightboxPage >= numPages ? 0.3 : 1 }}
              >
                &#8250;
              </button>
              <span className="cert-lightbox-page-info">
                Page {lightboxPage} of {numPages}
              </span>
            </>
          )}
        </div>,
        document.body
      )}
    </Container>
  );
}

export default Certificates;