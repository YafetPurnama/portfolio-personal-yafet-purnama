import React, { useState, useEffect } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import Particle from "../Particle";
import { Document, Page, pdfjs } from "react-pdf";
import { useTheme } from "../../context/ThemeContext";
import { translations } from "../../translations/translations";
import { certificateItems } from "./data";
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
    }
  };

  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  // [NEW] untuk Multi-page PDF
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

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

  // [NEW] Fungsi saat PDF berhasil di-load
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  // [NEW] Fungsi Ganti Halaman
  const changePage = (offset) => {
    setPageNumber((prevPage) => {
      const next = prevPage + offset;
      if (!numPages) return prevPage;
      return Math.min(Math.max(next, 1), numPages);
    });
  };

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
                                <div style={{height: '220px', width: '100%', background: '#f0f0f0'}}>
                                    <SkeletonElement type="thumbnail" style={{height: '100%'}}/>
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
        // onHide={() => setSelected(null)}
        onHide={() => { setSelected(null); setPageNumber(1); }}
        // size="xl"
        size="lg"
        centered
        contentClassName="certificate-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>{selected?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selected?.type === "image" ? (
            <img src={selected.src} alt={selected.title} className="certificate-full" />
          ) : selected ? (
              
            <div className="pdf-viewer">
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
                  {/* <Page pageNumber={1} scale={1.6} /> */}
                  <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false} />
                  </Document>

                {numPages > 1 && (
                <div className="pdf-controls">
                  <button 
                    className="pdf-nav-btn prev-btn" 
                    disabled={pageNumber <= 1} 
                    onClick={() => changePage(-1)}
                  >
                    &#8249; {/* Left Arrow Symbol */}
                  </button>
                  
                  <span className="page-info">
                    Page {pageNumber} of {numPages}
                  </span>

                  <button 
                    className="pdf-nav-btn next-btn" 
                    disabled={pageNumber >= numPages} 
                    onClick={() => changePage(1)}
                  >
                    &#8250; {/* Right Arrow Symbol */}
                  </button>
                </div>
              )}
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


              {selected.credentialUrl && (
                <div className="meta-actions">
                  <a href={selected.credentialUrl} target="_blank" rel="noreferrer" className="credential-btn">
                    {labels.meta.viewCredential}
                  </a>
                  {/* <a href={selected.credentialUrl} target="_blank" rel="noreferrer" className="credential-btn">{labels.meta.viewCredential}</a> */}
                </div>
              )}
            </div>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Certificates;