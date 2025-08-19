import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import { useTheme } from "../../context/ThemeContext";
import { translations } from "../../translations/translations";

// Import local project images
import imgTuku from "../../Assets/Projects/tuku-tuku.png";
import imgRental from "../../Assets/Projects/rental-mobil - Backup.png";
import imgRpg from "../../Assets/Projects/game-rpg.png";
import imgRpgBegin from "../../Assets/Projects/Uwu-start-begin.png";
import imgAnugerah from "../../Assets/Projects/web-anugerah.png";

function Projects() {
  const { language } = useTheme();
  const t = translations[language];
  
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          {t.my_recent} <strong className="red-text">{t.works}</strong>
        </h1>
        <p className="project-subtext">
          {t.my_recent_subtext}
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={imgTuku}
              isBlog={false}
              title={t.project_tuku_title}
              description={t.project_tuku_desc}
              // demoLink="https://tuku-tuku.vercel.app/"
              previewImages={[imgTuku]}
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={imgRental}
              isBlog={false}
              title={t.project_rental_title}
              description={t.project_rental_desc}
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={imgRpg}
              isBlog={false}
              title={t.project_rpg_title}
              description={t.project_rpg_desc}
              ghLink="https://github.com/YafetPurnama/ProjectSAA_LELE"
              previewImages={[imgRpgBegin, imgRpg]}
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={imgAnugerah}
              isBlog={false}
              title={t.project_web_anugerah_title}
              description={t.project_web_anugerah_desc}
              demoLink="https://anugerahjayabadi.com"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
