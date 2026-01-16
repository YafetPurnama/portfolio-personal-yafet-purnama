import portfolioPdf from "../../Assets/Portfolio-Yafet-Purnama.pdf";
import promptUdemyPdf from "../../Assets/Projects/Certificate - Prompt Engineering Mastery (Udemy).pdf";
import UXReseacrhPdf from "../../Assets/Projects/Yafet_Purnama_–_E_Certif_SC_Introduction_to_UX_Research_Myskill.pdf";
import ToeflPdf from "../../Assets/Projects/Yafet Purnama – E-Certif SC TOEFL Test Preparation Myskill.pdf";

import dataAnalysisSpecializationPdf from "../../Assets/Projects/Certificate-Data-Analysis-Specialization-MySkill.pdf";
import SCM600_SAPPdf from "../../Assets/Projects/Certificate - SAP SCM600 Sales Order Management.pdf";

export const certificateItems = [
  {
    id: "toefl-preparation-myskill",
    title: "TOEFL Test Preparation",
    issuer: "MySkill",
    type: "pdf",
    src: ToeflPdf,
    
    credentialId: "300319/SCH/LM/01/2026", 
    credentialUrl: null,
    issueDate: "2026-01-06",
    expiryDate: null,
    description: "Comprehensive preparation course for the Test of English as a Foreign Language (TOEFL), focusing on Listening, Structure, and Reading comprehension strategies.",
  },
  {
    id: "ux-research-myskill",
    title: "Introduction to UX Research",
    issuer: "MySkill",
    type: "pdf",
    src: UXReseacrhPdf,

    credentialId: "301565/UIX/LM/01/2026", 
    credentialUrl: null,
    issueDate: "2026-01-08",
    expiryDate: null,
    description: "Learned the fundamentals of User Experience (UX) Research, including qualitative/quantitative methods, user persona creation, and empathy mapping.",
  },
  {
    id: "data-analysis-specialization-myskill",
    title: "Skill Specialization: Data Analysis",
    issuer: "MySkill",
    type: "pdf",
    src: dataAnalysisSpecializationPdf,

    credentialId: "MS-16/1/2026-8vofJnRj2c4nX2IFHaz3", 
    credentialUrl: "https://storage.googleapis.com/myskill-v2-certificates/topic-qtKMZ78xyd6TPzUQOESu/avuIgxkt08ccYAkPCHs5vUQx9nj1-8vofJnRj2c4nX2lFHaz3.pdf",
    issueDate: "2026-01-16",
    expiryDate: null, // Sertifikat Udemy biasanya lifetime
    description: "Completed an intensive 16-hour specialization track consisting of 16 comprehensive courses. Mastered end-to-end Data Analysis competencies including SQL, Python, Data Visualization, and Business Intelligence implementations.",
  },
  {
    id: "prompt-engineering-udemy",
    title: "Prompt Engineering Mastery: From Basics to Advanced",
    issuer: "Udemy",
    type: "pdf",
    src: promptUdemyPdf,
    credentialId: "UC-53b91fc6-0ddc-4f11-8f9c-21187622374a", 
    credentialUrl: "https://ude.my/UC-53b91fc6-0ddc-4f11-8f9c-21187622374a",
    issueDate: "2026-01-16",
    expiryDate: null,
    description: "Completed a comprehensive 6.5-hour mastery course covering Zero-shot, Few-shot, Chain-of-Thought prompting, and GenAI tools like ChatGPT & Midjourney.",
  },
  {
    id: "sap-scm600-accomplishment",
    title: "Certificate of Accomplishment - SAP SCM600",
    issuer: "SAP Patner Academy",
    type: "pdf",
    src: SCM600_SAPPdf,
    credentialId: "070602201001", 
    credentialUrl: null,
    issueDate: "2022-06-16",
    expiryDate: null,
    description: "Completed the SAP University Partnership Program course 'SCM600'. Key Learnings: • Mastered the fundamental business processes in Sales Order Management within SAP ERP. • Hands-on experience with the Order-to-Cash process chain. • Understanding organizational structures in Sales and Distribution.",
  },
];


  // Example for image certificate:
  // {
  //   id: "dicoding-ml",
  //   title: "Dicoding - Machine Learning",
  //   type: "image",
  //   src: require("../../Assets/Certificates/dicoding-ml.png"),
  // },
