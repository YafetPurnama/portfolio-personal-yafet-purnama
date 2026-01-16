import React, { useState, useEffect, useRef } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { CgGitFork } from "react-icons/cg";
import { ImBlog } from "react-icons/im";
import {
  AiFillStar,
  AiOutlineHome,
  AiOutlineFundProjectionScreen,
  AiOutlineUser,
} from "react-icons/ai";
import { CgFileDocument } from "react-icons/cg";
import { FaSun, FaMoon, FaDesktop } from "react-icons/fa";
import { BsTranslate } from "react-icons/bs";

import { useTheme } from "../context/ThemeContext";
import { translations } from "../translations/translations";

function NavBar() {
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const themeDropdownRef = useRef(null);

  // const { isDark, toggleTheme, language, toggleLanguage } = useTheme();

  // Ambil state dan fungsi baru dari context
  const { theme, setTheme, language, toggleLanguage } = useTheme();
  const currentTranslations = translations[language];

  // Mendapatkan tema yang sedang aktif (bukan pilihan)
  const [effectiveTheme, setEffectiveTheme] = useState('dark');

  useEffect(() => {
    const themeToSet = document.documentElement.getAttribute('data-theme') || 'dark';
    setEffectiveTheme(themeToSet);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          setEffectiveTheme(document.documentElement.getAttribute('data-theme'));
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (themeDropdownRef.current && !themeDropdownRef.current.contains(event.target)) {
        setShowThemeDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function scrollHandler() {
    if (window.scrollY >= 20) {
      updateNavbar(true);
    } else {
      updateNavbar(false);
    }
  }

  window.addEventListener("scroll", scrollHandler);
  // const handleThemeChange = (theme) => {
  //   if (theme === 'system') {
  //     // Auto-detect system theme
  //     const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  //     if (systemTheme === 'dark' && !isDark) {
  //       toggleTheme();
  //     } else if (systemTheme === 'light' && isDark) {
  //       toggleTheme();
  //     }
  //   } else if (theme === 'light' && isDark) {
  //     toggleTheme();
  //   } else if (theme === 'dark' && !isDark) {
  //     toggleTheme();
  //   }
  // Gunakan API baru: setTheme('light'|'dark'|'system')
  const handleThemeChange = (opt) => {
    setTheme(opt);
    setShowThemeDropdown(false);
  };

  return (
    <Navbar
      expanded={expand}
      fixed="top"
      expand="md"
      className={navColour ? "sticky" : "navbar"}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex">
          <div className="text-xl font-bold bg-gradient-to-r from-red-500 via-red-600 to-yellow-500 bg-clip-text text-transparent hover:from-red-600 hover:via-red-700 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105">
            Portfolio
          </div>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => {
            updateExpanded(expand ? false : "expanded");
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto" defaultActiveKey="#home">
            <Nav.Item>
              <Nav.Link as={Link} to="/" onClick={() => updateExpanded(false)}>
                <AiOutlineHome style={{ marginBottom: "2px" }} /> {currentTranslations.home}
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/about"
                onClick={() => updateExpanded(false)}
              >
                <AiOutlineUser style={{ marginBottom: "2px" }} /> {currentTranslations.about}
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/project"
                onClick={() => updateExpanded(false)}
              >
                <AiOutlineFundProjectionScreen
                  style={{ marginBottom: "2px" }}
                />{" "}
                {currentTranslations.projects}
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/certificates"
                onClick={() => updateExpanded(false)}
              >
                <ImBlog style={{ marginBottom: "2px" }} /> {currentTranslations.certificates || (language === 'id' ? 'Sertifikat' : 'Certificates')}
              </Nav.Link>
            </Nav.Item>

            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/resume"
                onClick={() => updateExpanded(false)}
              >
                <CgFileDocument style={{ marginBottom: "2px" }} /> {currentTranslations.resume}
              </Nav.Link>
            </Nav.Item>

            <Nav.Item className="fork-btn">
              <Button
                href="https://lynk.id/yafetpurnama"
                target="_blank"
                className="fork-btn-inner"
              >
                <CgGitFork style={{ fontSize: "1.2em" }} />{" "}
                <AiFillStar style={{ fontSize: "1.1em" }} />
              </Button>
            </Nav.Item>

            {/* Language Toggle Button */}
            {/* <Nav.Item style={{ marginLeft: "15px" }}>
              <Button className="fork-btn-inner" onClick={toggleLanguage}>
                <BsTranslate style={{ fontSize: "1.1em" }} />
                <span style={{ marginLeft: "5px", fontSize: "0.9em" }}>
                  {language === 'en' ? 'EN' : 'ID'}
                </span>
              </Button>
            </Nav.Item> */}
            <Nav.Item>
              <Button className="fork-btn-inner" onClick={toggleLanguage}>
                <BsTranslate style={{ fontSize: "1.1em" }} />
                <span style={{ marginLeft: "5px", fontSize: "0.9em" }}>{language.toUpperCase()}</span>
              </Button>
            </Nav.Item>

            {/* Theme Toggle Button with Dropdown */}
            {/* <Nav.Item style={{ marginLeft: "15px", position: "relative" }} ref={themeDropdownRef}>
              <Button 
                className="fork-btn-inner" 
                onClick={() => setShowThemeDropdown(!showThemeDropdown)}
              >
                {isDark ? <FaMoon /> : <FaSun />}
              </Button>
              
              {/* Theme Dropdown */}
              {/* {showThemeDropdown && (
                <div className="theme-dropdown">
                  <div 
                    className={`theme-option ${!isDark ? 'active' : ''}`}
                    onClick={() => handleThemeChange('light')}
                  >
                    <FaSun style={{ marginRight: "8px" }} />
                    Light
                  </div>
                  <div 
                    className={`theme-option ${isDark ? 'active' : ''}`}
                    onClick={() => handleThemeChange('dark')}
                  >
                    <FaMoon style={{ marginRight: "8px" }} />
                    Dark
                  </div>
                  <div 
                    className="theme-option"
                    onClick={() => handleThemeChange('system')}
                  >
                    <FaDesktop style={{ marginRight: "8px" }} />
                    System
                  </div>
                </div>
              )} */}
            {/* </Nav.Item> */} 
            <Nav.Item className="fork-btn" ref={themeDropdownRef} style={{ position: 'relative' }}>
              <Button 
                className="fork-btn-inner" 
                onClick={() => setShowThemeDropdown(!showThemeDropdown)}
              >
                {effectiveTheme === 'dark' ? <FaMoon /> : <FaSun />}
              </Button>
              
              {showThemeDropdown && (
                <div className="theme-dropdown">
                  <div 
                    className={`theme-option ${theme === 'light' ? 'active' : ''}`}
                    onClick={() => handleThemeChange('light')}
                  >
                    <FaSun style={{ marginRight: "8px" }} /> Light
                  </div>
                  <div 
                    className={`theme-option ${theme === 'dark' ? 'active' : ''}`}
                    onClick={() => handleThemeChange('dark')}
                  >
                    <FaMoon style={{ marginRight: "8px" }} /> Dark
                  </div>
                  <div 
                    className={`theme-option ${theme === 'system' ? 'active' : ''}`}
                    onClick={() => handleThemeChange('system')}
                  >
                    <FaDesktop style={{ marginRight: "8px" }} /> System
                  </div>
                </div>
              )}
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
