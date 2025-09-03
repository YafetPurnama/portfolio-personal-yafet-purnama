import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CgWebsite } from "react-icons/cg";
import { BsGithub, BsEye } from "react-icons/bs";
import { IoNewspaperOutline } from "react-icons/io5";


function ProjectCards(props) {
  const { previewImages = [] } = props;
  const [showPreview, setShowPreview] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [animateKey, setAnimateKey] = useState(0);

  const hasPreview = Array.isArray(previewImages) && previewImages.length > 0;

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

  return (
    <>
      <Card className="project-card-view">
        <Card.Img
          variant="top"
          src={props.imgPath}
          alt="card-img"
        />
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
    </>
  );
}
export default ProjectCards;
