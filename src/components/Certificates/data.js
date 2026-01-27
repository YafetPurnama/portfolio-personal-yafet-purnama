// import portfolioPdf from "../../Assets/Portfolio-Yafet-Purnama.pdf";

import promptUdemyPdf from "../../Assets/Projects/Certificate - Prompt Engineering Mastery (Udemy).pdf";
import UXReseacrhPdf from "../../Assets/Projects/Yafet_Purnama_–_E_Certif_SC_Introduction_to_UX_Research_Myskill.pdf";
import ToeflPdf from "../../Assets/Projects/Yafet Purnama – E-Certif SC TOEFL Test Preparation Myskill.pdf";

import dataAnalysisSpecializationPdf from "../../Assets/Projects/Certificate-Data-Analysis-Specialization-MySkill.pdf";
import SCM600_SAPPdf from "../../Assets/Projects/Certificate - SAP SCM600 Sales Order Management.pdf";


// --- NEW IMPORTS ---
import BackendMySkillPdf from "../../Assets/Projects/Certificate-Backend-MySkill.pdf";
import DataVizLookerPdf from "../../Assets/Projects/Certificate-DataViz-Looker-MySkill.pdf";
import CareerSkillSpacePdf from "../../Assets/Projects/Certificate-CareerPrep-SkillSpace.pdf";

// [NEW] Import CAP Certificate
import CapAccuratePdf from "../../Assets/Projects/Certificate-Accurate-Professional-CAP.pdf";

import GoogleDataFoundationsPdf from "../../Assets/Projects/Certificate-Google-Foundations-Data.pdf";
import BtdBasic from "../../Assets/Projects/Certificate - Chinese Language Conversation Basic (Score 95).pdf";

import ComputersOperating from "../../Assets/Projects/Certificate-Google-Introduction to Computers and Operating Systems and Security.pdf";

export const certificateItems = [
  {
    id: "cap-accurate-professional",
    title: "Certified ACCURATE Professional (CAP)",
    issuer: "CPSSoft",
    type: "pdf",
    src: CapAccuratePdf,
    credentialId: "CAP-UTS-AOL/1-2026/16687",
    credentialUrl: "", //https://ultimasolusindo.com
    issueDate: "2026-01-05",
    expiryDate: "2029-01-05", 
    description: {
      // "Certified proficiency in Accurate Online accounting software. Includes comprehensive training (Sep-Dec 2025) covering financial reporting, ledger management, and taxation workflows.",
      en: "Certified proficiency in Accurate Online accounting software. Includes comprehensive training (Sep-Dec 2025) covering financial reporting, ledger management, and taxation workflows.",
      id: "Sertifikasi keahlian perangkat lunak akuntansi Accurate Online. Mencakup pelatihan komprehensif (Sep-Des 2025) yang meliputi pelaporan keuangan, manajemen buku besar, dan alur kerja perpajakan."
    }
  },
  {
    id: "btd-basic-certificate",
    title: "Chinese Language Conversation Program (Basic Level)",
    issuer: "Widya kartika University Surabaya",
    type: "pdf",
    src: BtdBasic,
    credentialId: "11.311.2526.032",
    credentialUrl: "",
    issueDate: "2026-01-14",
    expiryDate: null, 
    description: {
      en: "Completed an intensive foreign language program focused on Chinese (Mandarin) conversation skills provided by the Faculty of Letters and Language Education. Achievement: • Grade: Excellent (95/100) - Predicate: '优' (Yōu). • Demonstrated strong aptitude in basic conversational Mandarin, enhancing cross-cultural communication readiness for global tech environments.",
      id: "Telah menyelesaikan program intensif bahasa asing yang berfokus pada keterampilan percakapan Bahasa Mandarin, diselenggarakan oleh Fakultas Sastra dan Pendidikan Bahasa. Pencapaian: • Nilai: Sangat Baik (95/100) – Predikat: “优 (Yōu)” • Menunjukkan kemampuan yang kuat dalam percakapan dasar Bahasa Mandarin, serta meningkatkan kesiapan komunikasi lintas budaya untuk lingkungan teknologi global."
    }
  },
  {
    id: "computers-operating-systems-security",
    title: "Introduction to Computers and Operating Systems and Security",
    issuer: "Google",
    type: "pdf",
    src: ComputersOperating,
    credentialId: "D227GY4ADKUV",
    credentialUrl: "https://www.coursera.org/account/accomplishments/records/D227GY4ADKUV",
    issueDate: "2026-01-27",
    expiryDate: null, 
    description: {
      en: "Successfully completed the 'Introduction to Computers and Operating Systems and Security' course authorized by Microsoft. This comprehensive program strengthened my foundational knowledge in: • System Architecture: Understanding the core interaction between hardware and software components. • Operating Systems: Managing and configuring Windows, Linux, and macOS environments. • Cybersecurity Fundamentals: Implementing security protocols to protect systems against common vulnerabilities and threats. • System Administration: Best practices for software updates, file systems, and user management. This certification reinforces my commitment to maintaining secure and efficient computing environments.",
      id: "Telah berhasil menyelesaikan kursus 'Introduction to Computers and Operating Systems and Security' yang diotorisasi oleh Microsoft. Program komprehensif ini memperkuat pengetahuan fundamental saya dalam: • Arsitektur Sistem: Memahami interaksi inti antara komponen perangkat keras (hardware) dan perangkat lunak (software). • Sistem Operasi: Mengelola dan mengonfigurasi lingkungan Windows, Linux, dan macOS. • Dasar Keamanan Siber: Menerapkan protokol keamanan untuk melindungi sistem dari kerentanan dan ancaman umum. • Administrasi Sistem: Praktik terbaik untuk pembaruan perangkat lunak, sistem file, dan manajemen pengguna. Sertifikasi ini memperkuat komitmen saya dalam menjaga lingkungan komputasi yang aman dan efisien."
    }
  },
  {
  id: "google-data-foundations",
  title: "Foundations: Data, Data, Everywhere",
  issuer: "Google",
  type: "pdf",
  src: GoogleDataFoundationsPdf,
  credentialId: "7DYJW6C9RNE0", // [cite: 18]
  credentialUrl: "https://www.coursera.org/account/accomplishments/records/7DYJW6C9RNE0",
  issueDate: "2026-01-26", // [cite: 3]
  expiryDate: null,
  description: {
    en: "Mastered the basics of data analytics, including the role of data in decision-making, the data life cycle, and common tools like spreadsheets and SQL.",
    id: "Menguasai dasar-dasar analisis data, termasuk peran data dalam pengambilan keputusan, siklus hidup data, serta alat bantu umum seperti spreadsheet dan SQL."
  }
},
  {
    id: "backend-development-myskill",
    title: "Website Development: Back End",
    issuer: "MySkill",
    type: "pdf",
    src: BackendMySkillPdf,
    credentialId: "303456/WEB/LM/1/2026",
    credentialUrl: null,
    issueDate: "2026-01-19",
    expiryDate: null,
    description: "Mastered fundamental Backend Engineering concepts including server-side logic, database interactions, and API development structure.",
  },
  {
    id: "data-viz-looker-myskill",
    title: "Data Visualization with Looker Data Studio",
    issuer: "MySkill",
    type: "pdf",
    src: DataVizLookerPdf,
    credentialId: "302600/DTA/LM/01/2026",
    credentialUrl: null,
    issueDate: "2026-01-13",
    expiryDate: null,
    // description: "Acquired skills in transforming raw data into interactive dashboards and reports using Google Looker Studio to drive business intelligence decisions.",
    description: {
      en: "Acquired skills in transforming raw data into interactive dashboards and reports using Google Looker Studio to drive business intelligence decisions.",
      id: "Memperoleh keterampilan dalam mengubah data mentah menjadi dasbor dan laporan interaktif menggunakan Google Looker Studio untuk mendukung keputusan intelijen bisnis."
    }
  },
  {
    id: "career-prep-skillspace",
    title: "Career Preparation: CV ATS & Career Development",
    issuer: "SkillSpace",
    type: "pdf",
    src: CareerSkillSpacePdf,
    credentialId: "068/SP/1/2026",
    credentialUrl: null,
    issueDate: "2026-01-04",
    expiryDate: null,
    // [cite_start]description: "Optimized professional branding through ATS-friendly resume building and career development strategies, demonstrating readiness for professional industry integration[cite: 1, 7].",
    // description: "Optimized professional branding through ATS-friendly resume building and career development strategies, demonstrating readiness for professional industry integration.",
    description: {
      en: "Optimized professional branding through ATS-friendly resume building and career development strategies, demonstrating readiness for professional industry integration.",
      id: "Mengoptimalkan branding profesional melalui pembuatan resume yang ramah ATS dan strategi pengembangan karier, menunjukkan kesiapan untuk integrasi industri profesional."
    }
  },
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
    // description: "Comprehensive preparation course for the Test of English as a Foreign Language (TOEFL), focusing on Listening, Structure, and Reading comprehension strategies.",
    description: {
      en: "Comprehensive preparation course for the Test of English as a Foreign Language (TOEFL), focusing on Listening, Structure, and Reading comprehension strategies.",
      id: "Kursus persiapan komprehensif untuk Test of English as a Foreign Language (TOEFL), berfokus pada strategi Listening, Structure, dan Reading comprehension."
    }
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
    // description: "Learned the fundamentals of User Experience (UX) Research, including qualitative/quantitative methods, user persona creation, and empathy mapping.",
    description: {
      en: "Learned the fundamentals of User Experience (UX) Research, including qualitative/quantitative methods, user persona creation, and empathy mapping.",
      id: "Mempelajari dasar-dasar Riset User Experience (UX), termasuk metode kualitatif/kuantitatif, pembuatan persona pengguna, dan pemetaan empati."
    }
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
    // description: "Completed an intensive 16-hour specialization track consisting of 16 comprehensive courses. Mastered end-to-end Data Analysis competencies including SQL, Python, Data Visualization, and Business Intelligence implementations.",
    description: {
      en: "Completed an intensive 16-hour specialization track consisting of 16 comprehensive courses. Mastered end-to-end Data Analysis competencies including SQL, Python, Data Visualization, and Business Intelligence implementations.",
      id: "Menyelesaikan jalur spesialisasi intensif 16 jam yang terdiri dari 16 kursus komprehensif. Menguasai kompetensi Analisis Data dari hulu ke hilir termasuk SQL, Python, Visualisasi Data, dan implementasi Intelijen Bisnis."
    }
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
    // description: "Completed a comprehensive 6.5-hour mastery course covering Zero-shot, Few-shot, Chain-of-Thought prompting, and GenAI tools like ChatGPT & Midjourney.",
    description: {
      en: "Completed a comprehensive 6.5-hour mastery course covering Zero-shot, Few-shot, Chain-of-Thought prompting, and GenAI tools like ChatGPT & Midjourney.",
      id: "Menyelesaikan kursus penguasaan komprehensif selama 6,5 jam yang mencakup prompting Zero-shot, Few-shot, Chain-of-Thought, dan alat GenAI seperti ChatGPT & Midjourney."
    }
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
    // description: "Completed the SAP University Partnership Program course 'SCM600'. Key Learnings: • Mastered the fundamental business processes in Sales Order Management within SAP ERP. • Hands-on experience with the Order-to-Cash process chain. • Understanding organizational structures in Sales and Distribution.",
    description: {
      en: "Completed the SAP University Partnership Program course 'SCM600'. Key Learnings: • Mastered the fundamental business processes in Sales Order Management within SAP ERP. • Hands-on experience with the Order-to-Cash process chain. • Understanding organizational structures in Sales and Distribution.",
      id: "Menyelesaikan kursus SAP University Partnership Program 'SCM600'. Pembelajaran Utama: • Menguasai proses bisnis fundamental dalam Manajemen Sales Order di SAP ERP. • Pengalaman langsung dengan rantai proses Order-to-Cash. • Memahami struktur organisasi dalam Penjualan dan Distribusi."
    }
  },
];

  // Example for image certificate:
  // {
  //   id: "dicoding-ml",
  //   title: "Dicoding - Machine Learning",
  //   type: "image",
  //   src: require("../../Assets/Certificates/dicoding-ml.png"),
  // },
