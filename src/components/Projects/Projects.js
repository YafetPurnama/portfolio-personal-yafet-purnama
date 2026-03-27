import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import { useTheme } from "../../context/ThemeContext";
import { translations } from "../../translations/translations";
import { BsWhatsapp } from "react-icons/bs";
import { Helmet } from "react-helmet-async";

// Import local project images
import imgTuku from "../../Assets/Projects/tuku-tuku.png";
import bannerimgTuku from "../../Assets/Projects/banner-tuku-tuku.png";
// import imgRental from "../../Assets/Projects/rental-mobil - Backup.png";
import imgRental from "../../Assets/Projects/rental-mobil.png";
import imgRpg from "../../Assets/Projects/game-rpg.png";
import bannerImgRpg from "../../Assets/Projects/banner-game-rpg.png";
import imgRpgBegin from "../../Assets/Projects/Uwu-start-begin.png";
// import imgAnugerah from "../../Assets/Projects/web-anugerah.png";
import imgAnugerah from "../../Assets/Projects/banner-web-anugerah.png";
import peerAssement from "../../Assets/Projects/banner-peer-assesment.png";
import lockerPenyimpanan from "../../Assets/Projects/banner-loker-penyimpanan.png";
import bannerHrisSlipGaji from "../../Assets/Projects/banner-hris-slipgaji.png";
import reportRPL from "../../Assets/Projects/Report-RPL.pdf";

function Projects() {
  const { language } = useTheme();
  const t = translations[language];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Container fluid className="project-section">
      <Helmet>
        <title>Proyek Yafet Purnama - HRIS, Web Development, Game | Portfolio</title>
        <meta name="description" content="Kumpulan proyek Yafet Purnama — HRIS Slip Gaji, Peer Assessment, Anugerah Jaya Abadi Website, TukuTuku Market, Rental Mobil, Game RPG, dan Locker Storage. Dibangun dengan Laravel, React.js, Next.js." />
        <link rel="canonical" href="https://portfolio-yafetpurnama.vercel.app/project" />
      </Helmet>
      <Particle />
      <Container>
        <h1 className="project-heading">
          {t.my_recent} <strong className="red-text">{t.works}</strong>
        </h1>
        <p className="project-subtext">
          {t.my_recent_subtext}
        </p>

        {/* WhatsApp CTA Banner */}
        <div className="wa-cta-banner">
          <div className="wa-cta-content">
            <BsWhatsapp className="wa-cta-icon" />
            <div className="wa-cta-text">
              <p className="wa-cta-title">{t.wa_cta_title}</p>
              <p className="wa-cta-subtitle">{t.wa_cta_subtitle}</p>
            </div>
            <Button
              className="wa-cta-button"
              href={`https://wa.me/6282124952938?text=${encodeURIComponent(t.wa_cta_message)}`}
              target="_blank"
              rel="noreferrer"
            >
              <BsWhatsapp /> &nbsp;{t.wa_cta_button}
            </Button>
          </div>
        </div>

        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {loading ? (
            // Skeleton loading for projects
            [...Array(3)].map((_, index) => (
              <Col key={`skeleton-${index}`} md={4} className="project-card">
                <ProjectCard loading={loading} />
              </Col>
            ))
          ) : (
            // Actual project cards
              <>
              <Col md={4} className="project-card">
                <ProjectCard
                  projectId="hris-slip-gaji"
                  imgPath={bannerHrisSlipGaji}
                  isBlog={false}
                  title={t.project_hris_slip_gaji_title}
                  description={t.project_hris_slip_gaji_desc}
                  ghLink="https://github.com/YafetPurnama/Slip-gaji-karyawan"
                  demoLink="https://hris-slip-gaji-karyawan.sgp.dom.my.id/"
                />
              </Col>

              <Col md={4} className="project-card">
                <ProjectCard
                  projectId="locker-penyimpanan"
                  imgPath={lockerPenyimpanan}
                  isBlog={false}
                  title={t.project_locker_penyimpanan_title}
                  description={t.project_locker_penyimpanan_desc}
                  pubLink="https://com.ojs.co.id/index.php/jkm/article/view/367"
                  pubButtonText={t.button_publication}
                />
              </Col>

              <Col md={4} className="project-card">
                <ProjectCard
                  projectId="web-anugerah"
                  imgPath={imgAnugerah}
                  isBlog={false}
                  title={t.project_web_anugerah_title}
                  description={t.project_web_anugerah_desc}
                  demoLink="https://anugerahjayabadi.com"
                />
              </Col>

              <Col md={4} className="project-card">
                <ProjectCard
                  projectId="peer-assessment"
                  imgPath={peerAssement}
                  isBlog={false}
                  title={t.project_peer_assessment_title}
                  description={t.project_peer_assessment_desc}
                  ghLink="https://github.com/YafetPurnama/peer_assesment"
                  demoLink="https://peer-assessment.vercel.app/"
                  pdfLink={reportRPL}
                  pdfButtonText={t.button_view_report}
                  pdfOpenText={t.button_open_pdf}
                  pdfDownloadText={t.button_download_report}
                  pdfMobileText={t.pdf_mobile_text}
                  closeText={t.close}
                />
              </Col>

              <Col md={4} className="project-card">
                <ProjectCard
                  projectId="tuku-tuku"
                  imgPath={bannerimgTuku}
                  isBlog={false}
                  title={t.project_tuku_title}
                  description={t.project_tuku_desc}
                  previewImages={[imgTuku]}
                />
              </Col>

              <Col md={4} className="project-card">
                <ProjectCard
                  projectId="rental-mobil"
                  imgPath={imgRental}
                  isBlog={false}
                  title={t.project_rental_title}
                  description={t.project_rental_desc}
                />
              </Col>

              <Col md={4} className="project-card">
                <ProjectCard
                  projectId="game-rpg"
                  imgPath={bannerImgRpg}
                  isBlog={false}
                  title={t.project_rpg_title}
                  description={t.project_rpg_desc}
                  ghLink="https://github.com/YafetPurnama/ProjectSAA_LELE"
                  previewImages={[imgRpgBegin, imgRpg]}
                />
              </Col>

                
            </>
          )}
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
