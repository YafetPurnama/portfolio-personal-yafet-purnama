import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CgWebsite } from "react-icons/cg";
import { BsGithub, BsEye, BsFileEarmarkPdf, BsDownload, BsBoxArrowUpRight } from "react-icons/bs";
import { IoNewspaperOutline } from "react-icons/io5";
import { FiShare2 } from "react-icons/fi";
import { FaFacebook, FaWhatsapp, FaTwitter } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import { translations } from "../../translations/translations";
import { SkeletonElement, SkeletonText } from "../Skeleton";


function ProjectCards(props) {
  const { previewImages = [], loading = false, projectId } = props;
  const { language } = useTheme();
  const t = translations[language];
  const [showPreview, setShowPreview] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [animateKey, setAnimateKey] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const hasPreview = Array.isArray(previewImages) && previewImages.length > 0;
  // const showSkeleton = loading || !isImageLoaded;

  const openPreview = () => {
    if (!hasPreview) return;
    setPreviewIndex(0);
    setShowPreview(true);
    setAnimateKey(prev => prev + 1);
  };

  const switchPreview = () => {
    if (!hasPreview) return;
    const nextIndex = (previewIndex + 1) % previewImages.length;
    setPreviewIndex(nextIndex);
    setAnimateKey(prev => prev + 1); // trigger fade animation
  };

  // Handle image load
  useEffect(() => {
    if (props.imgPath) {
      const img = new Image();
      img.src = props.imgPath;
      img.onload = () => setIsImageLoaded(true);
    }
  }, [props.imgPath]);

  // Share functionality
  const shareLabels = {
    title: language === 'id' ? 'Bagikan' : 'Share',
    linkText: language === 'id' ? 'Klik untuk menyalin link' : 'Click to copy link',
    copied: language === 'id' ? 'Tersalin!' : 'Copied!',
    copyBtn: language === 'id' ? 'Salin' : 'Copy',
    shareLink: language === 'id' ? 'Bagikan' : 'Share',
  };

  const getShareUrl = () => {
    const url = new URL(window.location.href);
    if (projectId) {
      url.searchParams.set('project', projectId);
    }
    return url.toString();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getShareUrl());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareToPlatform = (platform) => {
    const url = encodeURIComponent(getShareUrl());
    const text = encodeURIComponent(`${language === 'id' ? 'Lihat proyek saya' : 'Check out my project'}: ${props.title}`);
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

  if (loading) {
    return (
      <Card className="project-card-view skeleton-card">
        <SkeletonElement
          type="thumbnail"
          style={{
            width: '100%',
            height: '200px',
            borderRadius: '8px 8px 0 0'
          }}
        />
        <Card.Body>
          <SkeletonElement
            type="title"
            style={{
              width: '80%',
              height: '28px',
              marginBottom: '15px',
              borderRadius: '4px'
            }}
          />
          <div style={{ marginBottom: '20px' }}>
            <SkeletonText lines={3} />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <SkeletonElement
              type="button"
              style={{
                width: '100px',
                height: '38px',
                borderRadius: '4px'
              }}
            />
            <SkeletonElement
              type="button"
              style={{
                width: '100px',
                height: '38px',
                borderRadius: '4px'
              }}
            />
          </div>
        </Card.Body>
      </Card>
    );
  }

  return (
    <>
      <Card className="project-card-view">
        <div className="project-card-img-wrapper">
          {!isImageLoaded && (
            <SkeletonElement
              type="thumbnail"
              style={{
                width: '100%',
                height: '200px',
                borderRadius: '8px 8px 0 0',
                position: 'absolute',
                zIndex: 1
              }}
            />
          )}
          <Card.Img
            variant="top"
            src={props.imgPath}
            alt="card-img"
            onLoad={() => setIsImageLoaded(true)}
            style={{ opacity: isImageLoaded ? 1 : 0 }}
          />
          <button
            className="project-share-btn"
            onClick={() => setShowShareMenu(true)}
            title={shareLabels.shareLink}
          >
            <FiShare2 />
          </button>
        </div>
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Text style={{ textAlign: "justify" }}>
            {props.description}
          </Card.Text>
          {props.ghLink && (
            <Button variant="primary" href={props.ghLink} target="_blank" rel="noreferrer">
              <BsGithub /> &nbsp;
              {props.isBlog ? "Blog" : "GitHub"}
            </Button>
          )}
          {"\n"}
          {"\n"}

          {/* If the component contains Demo link and if it's not a Blog then, it will render the below component  */}

          {!props.isBlog && props.demoLink && (
            <Button
              variant="primary"
              href={props.demoLink}
              target="_blank"
              style={{ marginLeft: "10px" }}
              rel="noreferrer"
            >
              <CgWebsite /> &nbsp;
              {"Demo"}
            </Button>
          )}
          {"\n"}
          {props.pubLink && (
            <Button
              variant="primary"
              href={props.pubLink}
              target="_blank"
              rel="noreferrer"
              style={{ marginLeft: "10px" }}
            >
              <IoNewspaperOutline /> &nbsp;
              {/* {"Publikasi"} */}
              {props.pubButtonText || "Publikasi"}
            </Button>
          )}
          {hasPreview && (
            <Button
              variant="secondary"
              onClick={openPreview}
              style={{ marginLeft: "10px" }}
            >
              <BsEye /> &nbsp;View
            </Button>
          )}
          {props.pdfLink && (
            <Button
              variant="primary"
              onClick={() => setShowPdfModal(true)}
              style={{ marginLeft: "10px", marginTop: "10px" }}
            >
              <BsFileEarmarkPdf /> &nbsp;
              {props.pdfButtonText || "View Report"}
            </Button>
          )}
        </Card.Body>
      </Card>

      {hasPreview && (
        <Modal
          show={showPreview}
          onHide={() => setShowPreview(false)}
          size="lg"
          centered
          aria-labelledby="project-image-preview"
          backdropClassName="modal-backdrop-blur"
        >
          <Modal.Header closeButton>
            <Modal.Title id="project-image-preview">{props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-image-switch" style={{ textAlign: "center" }}>
            <img
              key={animateKey}
              src={previewImages[previewIndex]}
              alt="preview"
              className="preview-fade-image"
              style={{ maxWidth: "100%", borderRadius: 8 }}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowPreview(false)}>
              Close
            </Button>
            {previewImages.length > 1 && (
              <Button variant="primary" onClick={switchPreview}>
                Begin
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      )}

      {/* PDF Viewer Modal */}
      {props.pdfLink && (
        <Modal
          show={showPdfModal}
          onHide={() => setShowPdfModal(false)}
          size="xl"
          centered
          dialogClassName="pdf-viewer-modal"
          aria-labelledby="pdf-viewer-title"
          backdropClassName="modal-backdrop-blur"
        >
          <Modal.Header closeButton className="pdf-modal-header">
            <Modal.Title id="pdf-viewer-title">
              <BsFileEarmarkPdf style={{ marginRight: 8 }} />
              {props.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="pdf-modal-body">
            {!isMobile ? (
              <iframe
                src={props.pdfLink}
                title={`${props.title} - PDF Report`}
                className="pdf-iframe"
              />
            ) : (
              <div className="pdf-mobile-fallback">
                <div className="pdf-mobile-icon">
                  <BsFileEarmarkPdf />
                </div>
                <h5>{props.title}</h5>
                <p className="pdf-mobile-text">
                  {props.pdfMobileText || "Tap the button below to open or download the PDF report."}
                </p>
                <div className="pdf-mobile-actions">
                  <Button
                    variant="primary"
                    href={props.pdfLink}
                    target="_blank"
                    rel="noreferrer"
                    className="pdf-mobile-btn"
                  >
                    <BsBoxArrowUpRight /> &nbsp;
                    {props.pdfOpenText || "Open PDF"}
                  </Button>
                  <Button
                    variant="outline-primary"
                    href={props.pdfLink}
                    download
                    className="pdf-mobile-btn"
                  >
                    <BsDownload /> &nbsp;
                    {props.pdfDownloadText || "Download PDF"}
                  </Button>
                </div>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer className="pdf-modal-footer">
            {!isMobile && (
              <Button
                variant="outline-primary"
                href={props.pdfLink}
                target="_blank"
                rel="noreferrer"
              >
                <BsBoxArrowUpRight /> &nbsp;
                {props.pdfOpenText || "Open in New Tab"}
              </Button>
            )}
            <Button variant="secondary" onClick={() => setShowPdfModal(false)}>
              {props.closeText || "Close"}
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Share Menu Overlay via Portal */}
      {showShareMenu && ReactDOM.createPortal(
        <div className="share-menu-overlay" onClick={() => setShowShareMenu(false)}>
          <div className="share-menu-container" onClick={e => e.stopPropagation()}>
            <div className="share-menu-header">
              <h5>{shareLabels.title}</h5>
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
              <div className="share-link-label">{shareLabels.linkText}</div>
              <div className="share-link-box">
                <input type="text" readOnly value={getShareUrl()} />
                <button className="share-copy-btn" onClick={copyToClipboard}>
                  {copied ? shareLabels.copied : shareLabels.copyBtn}
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
export default ProjectCards;
