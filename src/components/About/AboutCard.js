// import React from "react";
// import Card from "react-bootstrap/Card";
// import { ImPointRight } from "react-icons/im";

// function AboutCard() {
//   return (
//     <Card className="quote-card-view">
//       <Card.Body>
//         <blockquote className="blockquote mb-0">
//           <p style={{ textAlign: "justify" }}>
//             Hi Everyone, I am <span className="purple">Soumyajit Behera </span>
//             from <span className="purple"> Bhubaneswar, India.</span>
//             <br />
//             I am currently employed as a software developer at Juspay.
//             <br />
//             I have completed Integrated MSc (IMSc) in Maths and Computing at BIT
//             Mesra.
//             <br />
//             <br />
//             Apart from coding, some other activities that I love to do!
//           </p>
//           <ul>
//             <li className="about-activity">
//               <ImPointRight /> Playing Games
//             </li>
//             <li className="about-activity">
//               <ImPointRight /> Writing Tech Blogs
//             </li>
//             <li className="about-activity">
//               <ImPointRight /> Travelling
//             </li>
//           </ul>

//           <p style={{ color: "rgb(155 126 172)" }}>
//             "Jangan berhenti mencoba jika tidak ingin gagal untuk selamanya!"{" "}
//           </p>
//           <footer className="blockquote-footer">Yafet Purnama</footer>
//         </blockquote>
//       </Card.Body>
//     </Card>
//   );
// }

// export default AboutCard;

import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";
import { useTheme } from "../../context/ThemeContext";
import { translations } from "../../translations/translations";

function AboutCard() {
  const { language } = useTheme();
  const currentTranslations = translations[language];

  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            {currentTranslations.about_card_greeting}{" "}
            <span className="purple">{currentTranslations.name}</span>
            {" "}{currentTranslations.from}{" "}
            <span className="purple">{currentTranslations.location}</span>
            <br />
            {currentTranslations.about_card_status}
            <br />
            <br />
            {currentTranslations.about_card_activities_intro}
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> {currentTranslations.about_card_activity_1}
            </li>
            <li className="about-activity">
              <ImPointRight /> {currentTranslations.about_card_activity_2}
            </li>
            <li className="about-activity">
              <ImPointRight /> {currentTranslations.about_card_activity_3}
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            {currentTranslations.about_card_quote}{" "}
          </p>
          <footer className="blockquote-footer">{currentTranslations.name}</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;