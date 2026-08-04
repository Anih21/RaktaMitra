import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FaTint,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaYoutube
} from 'react-icons/fa';
import '../styles/footer.css';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="container footer-grid">
          <div>
            <div className="footer-brand">
              <div className="navbar-logo">
                <FaTint aria-hidden="true" />
              </div>
              <h2>{t('site.nameDevanagari')}</h2>
            </div>
            <p>{t('footer.aboutText')}</p>
            <div style={{ display: 'flex', gap: 14, marginTop: 14 }}>
              <a href="#" aria-label="Facebook"><FaFacebook size={20} /></a>
              <a href="#" aria-label="Twitter"><FaTwitter size={20} /></a>
              <a href="#" aria-label="YouTube"><FaYoutube size={20} /></a>
            </div>
          </div>

          <div>
            <h3>{t('footer.quickLinks')}</h3>
            <ul className="footer-links">
              <li><Link to="/donate-blood">{t('nav.donateBlood')}</Link></li>
              <li><Link to="/need-blood">{t('nav.needBlood')}</Link></li>
              <li><Link to="/blood-banks">{t('nav.bloodBanks')}</Link></li>
              <li><Link to="/camps">{t('nav.camps')}</Link></li>
            </ul>
          </div>

          <div>
            <h3>{t('footer.resources')}</h3>
            <ul className="footer-links">
              <li><Link to="/hospitals">{t('nav.hospitals')}</Link></li>
              <li><Link to="/how-it-works">{t('nav.howItWorks')}</Link></li>
              <li><Link to="/register">{t('nav.register')}</Link></li>
              <li><Link to="/contact">{t('nav.contact')}</Link></li>
            </ul>
          </div>

          <div>
            <h3>{t('footer.contactUs')}</h3>
            <div className="footer-contact-item">
              <FaMapMarkerAlt aria-hidden="true" />
              <span>{t('footer.address')}</span>
            </div>
            <div className="footer-contact-item">
              <FaPhoneAlt aria-hidden="true" />
              <span>{t('footer.helpline')}: 104 / 1800-XXX-XXXX</span>
            </div>
            <div className="footer-contact-item">
              <FaEnvelope aria-hidden="true" />
              <span>support@raktamitra.maharashtra.gov.in</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>{t('footer.copyright')}</p>
          <p>{t('footer.disclaimer')}</p>
        </div>
      </div>
    </footer>
  );
}
