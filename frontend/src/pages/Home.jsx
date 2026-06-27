import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FaTint,
  FaHandHoldingMedical,
  FaHospital,
  FaCampground,
  FaUserShield,
  FaLock,
  FaNetworkWired,
  FaGift,
  FaPhoneAlt,
  FaUsers,
  FaWarehouse
} from 'react-icons/fa';
import ImageSlider from '../components/ImageSlider';
import '../styles/home.css';

export default function Home() {
  const { t } = useTranslation();

  // Sample slider slides with images from public folder
  const sliderSlides = [
    {
      image: '/banner1.png',
      title: 'Welcome to RaktaMitra',
      text: 'Your trusted platform for blood donation and request services.'
    },
    {
      image: '/banner2.jpg',
      title: 'Help Save Lives',
      text: 'Join our community of blood donors and make a difference today.'
    },
    {
      image: '/banner3.jpg',
      title: 'Quick Access',
      text: 'Find blood banks, camps, and hospitals near you instantly.'
    }
  ];

  return (
    <>
      {/* Image Slider */}
      <ImageSlider slides={sliderSlides} />
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="hero-text">
            <h1>{t('home.heroTitle')}</h1>
            <p>{t('home.heroSubtitle')}</p>
            <div className="hero-actions">
              <Link to="/donate-blood" className="btn btn-primary btn-lg">
                <FaTint /> {t('home.ctaDonate')}
              </Link>
              <Link to="/need-blood" className="btn btn-outline btn-lg">
                <FaHandHoldingMedical /> {t('home.ctaNeed')}
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-visual-circle">
              <FaTint />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">{t('home.statsTitle')}</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon"><FaUsers /></div>
              <span className="stat-number">52,400+</span>
              <p>{t('home.statDonors')}</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><FaCampground /></div>
              <span className="stat-number">1,860+</span>
              <p>{t('home.statCamps')}</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><FaWarehouse /></div>
              <span className="stat-number">340+</span>
              <p>{t('home.statBanks')}</p>
            </div>
            <div className="stat-card">
              <div className="stat-icon"><FaHospital /></div>
              <span className="stat-number">610+</span>
              <p>{t('home.statHospitals')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section section-alt">
        <div className="container">
          <h2 className="section-title">{t('home.servicesTitle')}</h2>
          <p className="section-subtitle">{t('home.servicesSubtitle')}</p>
          <div className="grid grid-4">
            <div className="card service-card">
              <div className="service-icon"><FaTint /></div>
              <h3>{t('home.service1Title')}</h3>
              <p>{t('home.service1Text')}</p>
              <Link to="/donate-blood">{t('common.readMore')} →</Link>
            </div>
            <div className="card service-card">
              <div className="service-icon"><FaHandHoldingMedical /></div>
              <h3>{t('home.service2Title')}</h3>
              <p>{t('home.service2Text')}</p>
              <Link to="/need-blood">{t('common.readMore')} →</Link>
            </div>
            <div className="card service-card">
              <div className="service-icon"><FaWarehouse /></div>
              <h3>{t('home.service3Title')}</h3>
              <p>{t('home.service3Text')}</p>
              <Link to="/blood-banks">{t('common.readMore')} →</Link>
            </div>
            <div className="card service-card">
              <div className="service-icon"><FaCampground /></div>
              <h3>{t('home.service4Title')}</h3>
              <p>{t('home.service4Text')}</p>
              <Link to="/camps">{t('common.readMore')} →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why RaktaMitra */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">{t('home.whyTitle')}</h2>
          <div className="why-grid">
            <div className="why-item">
              <FaUserShield className="why-icon" />
              <p>{t('home.why1')}</p>
            </div>
            <div className="why-item">
              <FaLock className="why-icon" />
              <p>{t('home.why2')}</p>
            </div>
            <div className="why-item">
              <FaNetworkWired className="why-icon" />
              <p>{t('home.why3')}</p>
            </div>
            <div className="why-item">
              <FaGift className="why-icon" />
              <p>{t('home.why4')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="emergency-banner">
        <div className="container">
          <h2>{t('home.emergencyTitle')}</h2>
          <p>{t('home.emergencySubtitle')}</p>
          <a href="tel:104" className="btn btn-lg">
            <FaPhoneAlt /> {t('home.emergencyCall')}: 104
          </a>
        </div>
      </section>
    </>
  );
}
