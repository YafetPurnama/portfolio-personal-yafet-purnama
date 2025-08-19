import React, { useState, useEffect } from "react";
import GitHubCalendar from "react-github-calendar";
import { Row } from "react-bootstrap";
import { useTheme } from "../../context/ThemeContext";
import { translations } from "../../translations/translations";

// function Github() {
//   return (
//     <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
//       <h1 className="project-heading" style={{ paddingBottom: "20px" }}>
//         Days I <strong className="purple">Code</strong>
//       </h1>
//       <GitHubCalendar
//         username="yafetpurnama"
//         blockSize={15}
//         blockMargin={5}
//         color="#f58c84ff"
//         fontSize={16}
//       />
//     </Row>
//   );
// }

function Github() {
  const { language } = useTheme();
  const currentTranslations = translations[language];

  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const [effectiveTheme, setEffectiveTheme] = useState('dark');
  useEffect(() => {
    const updateTheme = () => {
      const themeValue = document.documentElement.getAttribute('data-theme') || 'dark';
      setEffectiveTheme(themeValue);
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
  const calendarTheme = {
    light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
  };

  const renderCalendar = () => {
    if (selectedYear === 'all') {
      return years.map(year => (
        <div key={`year-${year}`} style={{ marginBottom: "20px" }}>
          <h3 style={{ marginBottom: "10px" }}>{year}</h3>
          <GitHubCalendar
            key={`calendar-${year}-${effectiveTheme}`}
            username="yafetpurnama"
            year={year}
            blockSize={15}
            blockMargin={5}
            theme={calendarTheme}
            fontSize={16}
          />
        </div>
      ));
    }
    return (
      <GitHubCalendar
        key={`calendar-${selectedYear}-${effectiveTheme}`}
        username="yafetpurnama"
        year={selectedYear}
        blockSize={15}
        blockMargin={5}
        // color="#f58c84ff"
        theme={calendarTheme}
        fontSize={16}
      />
    );
  };

  return (
    <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
      <h1 className="project-heading" style={{ paddingBottom: "20px" }}>
        {currentTranslations.days_i_code}{" "}
        <strong className="red-text">{currentTranslations.code_word}</strong>
      </h1>

      {/* Tombol Filter Tahun */}
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '30px' }}>
        <button
          onClick={() => setSelectedYear('all')}
          className={`year-filter-btn ${selectedYear === 'all' ? 'active' : ''}`}
        >
          {currentTranslations.all_years}
        </button>
        {years.map(year => (
          <button
            key={`btn-${year}`}
            onClick={() => setSelectedYear(year)}
            className={`year-filter-btn ${selectedYear === year ? 'active' : ''}`}
          >
            {year}
          </button>
        ))}
      </div>

      {renderCalendar()}
    </Row>
  );
}

export default Github;
