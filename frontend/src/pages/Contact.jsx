import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';
import PageHeader from '../components/PageHeader';
import '../styles/forms.css';
import '../styles/pages.css';

export default function Contact() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <PageHeader title={t('contact.title')} subtitle={t('contact.subtitle')} />

      <section className="section">
        <div className="container contact-grid">
          <div>
            <h2 className="section-title" style={{ textAlign: 'left' }}>
              {t('contact.officeTitle')}
            </h2>
            <div className="contact-info-card">
              <div className="contact-info-icon"><FaMapMarkerAlt /></div>
              <div>
                <strong>{t('footer.address')}</strong>
              </div>
            </div>
            <div className="contact-info-card">
              <div className="contact-info-icon"><FaPhoneAlt /></div>
              <div>
                <strong>{t('contact.helplineTitle')}</strong>
                <p style={{ margin: 0 }}>104 / 1800-XXX-XXXX</p>
              </div>
            </div>
            <div className="contact-info-card">
              <div className="contact-info-icon"><FaEnvelope /></div>
              <div>
                <strong>Email</strong>
                <p style={{ margin: 0 }}>support@raktamitra.maharashtra.gov.in</p>
              </div>
            </div>
          </div>

          <div className="form-card">
            <h2 style={{ textAlign: 'center', marginBottom: 24 }}>{t('contact.formTitle')}</h2>

            {submitted && (
              <div className="form-success">
                <FaCheckCircle /> Thank you for contacting us. We will respond shortly.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">
                  {t('contact.name')} <span className="required">*</span>
                </label>
                <input type="text" className="form-control" required />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">{t('contact.email')}</label>
                  <input type="email" className="form-control" />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    {t('contact.mobile')} <span className="required">*</span>
                  </label>
                  <input type="tel" pattern="[0-9]{10}" maxLength="10" className="form-control" required />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">
                  {t('contact.subject')} <span className="required">*</span>
                </label>
                <input type="text" className="form-control" required />
              </div>
              <div className="form-group">
                <label className="form-label">
                  {t('contact.message')} <span className="required">*</span>
                </label>
                <textarea className="form-control" required />
              </div>
              <button type="submit" className="btn btn-primary btn-block btn-lg">
                <FaPaperPlane /> {t('contact.send')}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
