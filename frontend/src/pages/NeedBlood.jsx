import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaExclamationTriangle, FaPhoneAlt, FaCheckCircle, FaHandHoldingMedical } from 'react-icons/fa';
import PageHeader from '../components/PageHeader';
import MaharashtraLocationPicker from '../components/MaharashtraLocationPicker';
import '../styles/forms.css';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function NeedBlood() {
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
      <PageHeader title={t('need.title')} subtitle={t('need.subtitle')} />

      <section className="section">
        <div className="container">
          <div className="form-note" style={{ maxWidth: 720, margin: '0 auto 28px' }}>
            <FaExclamationTriangle />
            <span>{t('need.urgentNote')}</span>
          </div>

          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <a href="tel:104" className="btn btn-emergency btn-lg">
              <FaPhoneAlt /> 104
            </a>
          </div>

          <div className="form-card">
            <h2 style={{ textAlign: 'center', marginBottom: 24 }}>{t('need.formTitle')}</h2>

            {submitted && (
              <div className="form-success">
                <FaCheckCircle /> Your blood request has been submitted. Our team will contact you shortly.
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    {t('need.patientName')} <span className="required">*</span>
                  </label>
                  <input type="text" className="form-control" required />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    {t('need.bloodGroup')} <span className="required">*</span>
                  </label>
                  <select className="form-control" required defaultValue="">
                    <option value="" disabled>{t('common.selectOption')}</option>
                    {BLOOD_GROUPS.map((bg) => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    {t('need.units')} <span className="required">*</span>
                  </label>
                  <input type="number" min="1" className="form-control" required />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    {t('need.requiredBy')} <span className="required">*</span>
                  </label>
                  <input type="date" className="form-control" required />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  {t('need.hospitalName')} <span className="required">*</span>
                </label>
                <input type="text" className="form-control" required />
              </div>

              <div className="form-group">
                <label className="form-label">
                  {t('need.district')} / {t('need.city')} <span className="required">*</span>
                </label>
                <MaharashtraLocationPicker value={location} onChange={setLocation} />
                <input type="hidden" name="district" value={location.district} required />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">
                    {t('need.contactPerson')} <span className="required">*</span>
                  </label>
                  <input type="text" className="form-control" required />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    {t('need.mobile')} <span className="required">*</span>
                  </label>
                  <input type="tel" pattern="[0-9]{10}" maxLength="10" className="form-control" required />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">{t('need.reason')}</label>
                <textarea className="form-control" />
              </div>

              <button type="submit" className="btn btn-primary btn-block btn-lg">
                <FaHandHoldingMedical /> {t('need.submit')}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}