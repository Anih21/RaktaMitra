import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaBars,
  FaTimes,
  FaTint,
  FaUserCircle
} from 'react-icons/fa';
import LanguageSwitcher from './LanguageSwitcher';
import '../styles/navbar.css';

export default function Navbar() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header>
     {/* ================= Top Bar ================= */}
<div className="topbar">
  <div className="container">
    <div className="topbar-left">
      <span>
        <FaPhoneAlt aria-hidden="true" />
        <span className="topbar-text">104 / 1800-XXX-XXXX</span>
      </span>
    </div>

    <div className="navbar-language">
      <LanguageSwitcher variant="topbar" />
    </div>
  </div>
</div>

      {/* ================= Main Navbar ================= */}
      <nav className="navbar" aria-label="Main navigation">
        <div className="container">

          {/* Logo */}
          <NavLink
            to="/"
            className="navbar-brand"
            onClick={closeMenu}
          >
            <div className="navbar-logo">
              <FaTint aria-hidden="true" />
            </div>

            <div className="navbar-brand-text">
              <h1>{t('site.nameDevanagari')}</h1>
              <span>{t('site.tagline')}</span>
            </div>
          </NavLink>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggle"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>

          {/* Navigation Links */}
          <div className={`navbar-links ${open ? 'open' : ''}`}>
            <NavLink to="/" end onClick={closeMenu}>
              {t('nav.home')}
            </NavLink>

            <NavLink to="/donate-blood" onClick={closeMenu}>
              {t('nav.donateBlood')}
            </NavLink>

            <NavLink to="/need-blood" onClick={closeMenu}>
              {t('nav.needBlood')}
            </NavLink>

            <NavLink to="/blood-banks" onClick={closeMenu}>
              {t('nav.bloodBanks')}
            </NavLink>

            <NavLink to="/hospitals" onClick={closeMenu}>
              {t('nav.hospitals')}
            </NavLink>

            <NavLink to="/camps" onClick={closeMenu}>
              {t('nav.camps')}
            </NavLink>

            <NavLink to="/how-it-works" onClick={closeMenu}>
              {t('nav.howItWorks')}
            </NavLink>

            <NavLink to="/contact" onClick={closeMenu}>
              {t('nav.contact')}
            </NavLink>

            <NavLink to="/login" className="login-link" onClick={closeMenu}>
              <FaUserCircle />
              <span>{t('nav.login')}</span>
            </NavLink>
          </div>

          {/* Emergency Button */}
          <div className="navbar-actions">
            <NavLink
              to="/need-blood"
              className="navbar-emergency"
              onClick={closeMenu}
            >
              <FaPhoneAlt />
              <span>{t('nav.emergency')}</span>
            </NavLink>
          </div>

        </div>
      </nav>
    </header>
  );
}