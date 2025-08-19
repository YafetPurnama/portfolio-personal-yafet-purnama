import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// export const ThemeProvider = ({ children }) => {
//   const [isDark, setIsDark] = useState(() => {
//     const saved = localStorage.getItem('theme');
//     return saved ? saved === 'dark' : true; // Default to dark theme
//   });

//   const [language, setLanguage] = useState(() => {
//     const saved = localStorage.getItem('language');
//     return saved || 'en'; // Default to English
//   });

//   useEffect(() => {
//     localStorage.setItem('theme', isDark ? 'dark' : 'light');
//     document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
//   }, [isDark]);

//   useEffect(() => {
//     localStorage.setItem('language', language);
//   }, [language]);

//   const toggleTheme = () => {
//     setIsDark(!isDark);
//   };

//   const toggleLanguage = () => {
//     setLanguage(language === 'en' ? 'id' : 'en');
//   };

//   const value = {
//     isDark,
//     language,
//     toggleTheme,
//     toggleLanguage,
//   };

//   return (
//     <ThemeContext.Provider value={value}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => {
    // 1. Ambil dari localStorage, 2. Default ke 'system'
    return localStorage.getItem('theme') || 'system';
  });

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

  // Fungsi ini akan menerapkan tema (dark/light) ke HTML
  const applyTheme = useCallback((themeToApply) => {
    document.documentElement.setAttribute('data-theme', themeToApply);
  }, []);

  useEffect(() => {
    const systemThemeMedia = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Fungsi untuk handle perubahan tema sistem
    const handleSystemThemeChange = (e) => {
      if (theme === 'system') {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    };

    if (theme === 'system') {
      // Terapkan tema sistem saat ini
      applyTheme(systemThemeMedia.matches ? 'dark' : 'light');
      // Dengarkan perubahan tema sistem
      systemThemeMedia.addEventListener('change', handleSystemThemeChange);
    } else {
      // Terapkan tema yang dipilih (dark/light)
      applyTheme(theme);
    }

    // Simpan pilihan tema ('system', 'dark', atau 'light') ke localStorage
    localStorage.setItem('theme', theme);
    
    // Cleanup listener saat komponen unmount atau tema berubah
    return () => {
      systemThemeMedia.removeEventListener('change', handleSystemThemeChange);
    };
  }, [theme, applyTheme]);


  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const setTheme = (newTheme) => {
    setThemeState(newTheme);
  };
  
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'id' : 'en');
  };

  const value = {
    theme, // 'system', 'dark', atau 'light'
    setTheme,
    language,
    toggleLanguage,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};