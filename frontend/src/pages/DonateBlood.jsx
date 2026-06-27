import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FaCheckCircle,
  FaGift,
  FaHeartbeat,
  FaIdBadge,
  FaTint
} from 'react-icons/fa';
import PageHeader from '../components/PageHeader';
import MaharashtraLocationPicker from '../components/MaharashtraLocationPicker';
import '../styles/forms.css';
import '../styles/pages.css';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function DonateBlood() {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [location, setLocation] = useState({
    district_id: '', district: '', taluka_id: '', taluka: '', village: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <PageHeader title={t('donate.title')} subtitle={t('donate.subtitle')} />

      <section className="section">
        <div className="container two-col">
          <div>
            <h2 className="section-title" style={{ textAlign: 'left' }}>
              {t('donate.eligibilityTitle')}
            </h2>
            <div className="eligibility-list">
              <div className="eligibility-item">
                <FaCheckCircle /> <span>{t('donate.eligibility1')}</span>
              </div>
              <div className="eligibility-item">
                <FaCheckCircle /> <span>{t('donate.eligibility2')}</span>
              </div>
              <div className="eligibility-item">
                <FaCheckCircle /> <span>{t('donate.eligibility3')}</span>
              </div>
              <div className="eligibility-item">
                <FaCheckCircle /> <span>{t('donate.eligibility4')}</span>
              </div>
              <div className="eligibility-item">
                <FaCheckCircle /> <span>{t('donate.eligibility5')}</span>
              </div>
            </div>

            <h2 className="section-title" style={{ textAlign: 'left', marginTop: 36 }}>
              {t('donate.benefitsTitle')}
            </h2>
            <div className="benefits-list">
              <div className="benefit-item">
                <FaGift /> <span>{t('donate.benefit1')}</span>
              </div>
              <div className="benefit-item">
                <FaHeartbeat /> <span>{t('donate.benefit2')}</span>
              </div>
              <div className="benefit-item">
                <FaTint /> <span>{t('donate.benefit3')}</span>
              </div>
              <div className="benefit-item">
                <FaIdBadge /> <span>{t('donate.benefit4')}</span>
              </div>
            </div>
          </div>

          <div className="form-card">
            <h2 style={{ textAlign: 'center', marginBottom: 24 }}>{t('donate.formTitle')}</h2>

            {submitted && (
              <div className="form-success">
                <FaCheckCircle /> Thank you! Your donor registration has been received.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">
                  {t('donate.fullName')} <span className="required">*</span>
                </label>
                <input type="text" className="form-control" required />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    {t('donate.age')} <span className="required">*</span>
                  </label>
                  <input type="number" min="18" max="65" className="form-control" required />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    {t('donate.bloodGroup')} <span className="required">*</span>
                  </label>
                  <select className="form-control" required defaultValue="">
                    <option value="" disabled>{t('common.selectOption')}</option>
                    {BLOOD_GROUPS.map((bg) => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">{t('donate.gender')} <span className="required">*</span></label>
                <div className="form-radio-group">
                  <label className="form-radio-option">
                    <input type="radio" name="gender" value="male" required /> {t('donate.male')}
                  </label>
                  <label className="form-radio-option">
                    <input type="radio" name="gender" value="female" /> {t('donate.female')}
                  </label>
                  <label className="form-radio-option">
                    <input type="radio" name="gender" value="other" /> {t('donate.other')}
                  </label>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    {t('donate.mobile')} <span className="required">*</span>
                  </label>
                  <input type="tel" pattern="[0-9]{10}" maxLength="10" className="form-control" required />
                </div>
                <div className="form-group">
                  <label className="form-label">{t('donate.email')}</label>
                  <input type="email" className="form-control" />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  {t('donate.district')} / {t('donate.city')} <span className="required">*</span>
                </label>
                <MaharashtraLocationPicker value={location} onChange={setLocation} />
                <input type="hidden" name="district" value={location.district} required />
              </div>

              <div className="form-group">
                <label className="form-label">{t('donate.address')} <span className="required">*</span></label>
                <textarea className="form-control" required />
              </div>

              <div className="form-group">
                <label className="form-label">{t('donate.lastDonation')}</label>
                <input type="date" className="form-control" />
              </div>

              <button type="submit" className="btn btn-saffron btn-block btn-lg">
                <FaTint /> {t('donate.submit')}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}