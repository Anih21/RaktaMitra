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
      <div className="topbar">
        <div className="container">
          <div className="topbar-left">
            <span>
              <FaMapMarkerAlt aria-hidden="true" /> {t('site.govLine')}
            </span>
            <span>
              <FaPhoneAlt aria-hidden="true" /> 104 / 1800-XXX-XXXX
            </span>
          </div>
          <LanguageSwitcher variant="topbar" />
        </div>
      </div>

      <nav className="navbar" aria-label="Main navigation">
        <div className="container">
          <NavLink to="/" className="navbar-brand" onClick={closeMenu}>
            <div className="navbar-logo">
              <FaTint aria-hidden="true" />
            </div>
            <div className="navbar-brand-text">
              <h1>{t('site.nameDevanagari')}</h1>
              <span>{t('site.tagline')}</span>
            </div>
          </NavLink>

          <button
            className="navbar-toggle"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>

          <div className={`navbar-links ${open ? 'open' : ''}`}>
            <NavLink to="/" onClick={closeMenu} end>
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
            <NavLink to="/login" onClick={closeMenu}>
              <FaUserCircle style={{ marginRight: 4, verticalAlign: 'middle' }} />
              {t('nav.login')}
            </NavLink>
          </div>

          <div className="navbar-actions">
            <NavLink to="/need-blood" className="navbar-emergency" onClick={closeMenu}>
              <FaPhoneAlt aria-hidden="true" /> {t('nav.emergency')}
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
}
