import React, { useState } from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import Particle from "../Particle";
import { Document, Page, pdfjs } from "react-pdf";
import { useTheme } from "../../context/ThemeContext";
import { translations } from "../../translations/translations";
import { certificateItems } from "./data";
import "./Certificates.css";

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

  return (
    <Container fluid className="certificate-section">
      <Particle />
      <Container>
        <h1 className="certificate-heading">{labels.title}</h1>
        <p className="project-subtext">{labels.subtext}</p>
        
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {certificates.length === 0 ? (
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
                      <Document file={cert.src} className="d-flex justify-content-center">
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
          )}
        </Row>
      </Container>

      {/* MODAL SECTION */}
      <Modal
        show={!!selected}
        onHide={() => setSelected(null)}
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
                <Document file={selected.src} className="d-flex justify-content-center">
                  {/* <Page pageNumber={1} scale={1.6} /> */}
                <Page pageNumber={1} width={600} renderTextLayer={false} renderAnnotationLayer={false} />
              </Document>
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
                {/* {formatDate(selected.expiryDate) && (
                  <div className="meta-row">
                    <span className="meta-label">{labels.meta.expiryDate}</span>
                    <span className="meta-value">{formatDate(selected.expiryDate)}</span>
                  </div>
                )} */}
                
                {/* PERBAIKAN: Hapus class 'meta-description' di sini agar teks tidak terpotong di Modal */}
                {selected.description && (
                  // <div className="meta-row meta-description">
                  <div className="meta-row" style={{ flexDirection: 'column', gap: '5px' }}>
                    <span className="meta-label">{labels.meta.description}</span>
                    {/* <span className="meta-value">{selected.description}</span> */}
                    <span className="meta-value" style={{ textAlign: 'left', whiteSpace: 'pre-wrap' }}>
                      {selected.description}
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
