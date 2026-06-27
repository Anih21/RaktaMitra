import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FaCheckCircle,
  FaGift,
  FaHeartbeat,
  FaIdBadge,
  FaTint,
  FaDownload
} from 'react-icons/fa';
import PageHeader from '../components/PageHeader';
import '../styles/forms.css';
import '../styles/pages.css';
import '../styles/certificate.css'; // Import the new certificate styles

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function DonateBlood() {
  const { t } = useTranslation();
  
  // Replaced 'submitted' boolean with an object to hold the donor's data for the certificate
  const [donorData, setDonorData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Capture necessary fields for the certificate
    setDonorData({
      name: formData.get('fullName'),
      bloodGroup: formData.get('bloodGroup'),
      city: formData.get('city'),
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric', month: 'long', year: 'numeric'
      })
    });
  };

  // Triggers the browser's native print/Save as PDF dialog
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="donate-page-wrapper">
      <div className="no-print">
        <PageHeader title={t('donate.title')} subtitle={t('donate.subtitle')} />
      </div>

      <section className="section">
        <div className="container two-col">
          
          {/* Left Column: Eligibility (Hidden during print) */}
          <div className="no-print">
            <h2 className="section-title" style={{ textAlign: 'left' }}>
              {t('donate.eligibilityTitle', 'Eligibility to Donate')}
            </h2>
            <div className="eligibility-list">
              <div className="eligibility-item">
                <FaCheckCircle /> <span>{t('donate.eligibility1', 'Must be 18-65 years old')}</span>
              </div>
              <div className="eligibility-item">
                <FaCheckCircle /> <span>{t('donate.eligibility2', 'Weight should be above 45 kgs')}</span>
              </div>
              <div className="eligibility-item">
                <FaCheckCircle /> <span>{t('donate.eligibility3', 'Hemoglobin level > 12.5 g/dl')}</span>
              </div>
              <div className="eligibility-item">
                <FaCheckCircle /> <span>{t('donate.eligibility4', 'No alcohol consumption in last 24 hrs')}</span>
              </div>
            </div>

            <h2 className="section-title" style={{ textAlign: 'left', marginTop: 36 }}>
              {t('donate.benefitsTitle', 'Benefits of Donating')}
            </h2>
            <div className="benefits-list">
              <div className="benefit-item">
                <FaGift /> <span>{t('donate.benefit1', 'Saves up to 3 lives')}</span>
              </div>
              <div className="benefit-item">
                <FaHeartbeat /> <span>{t('donate.benefit2', 'Improves cardiovascular health')}</span>
              </div>
              <div className="benefit-item">
                <FaTint /> <span>{t('donate.benefit3', 'Stimulates new blood cell production')}</span>
              </div>
              <div className="benefit-item">
                <FaIdBadge /> <span>{t('donate.benefit4', 'Receive a Raktmitra Donor Certificate')}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Form OR Certificate */}
          <div className="form-card-wrapper">
            {!donorData ? (
              <div className="form-card no-print">
                <h2 style={{ textAlign: 'center', marginBottom: 24 }}>
                  {t('donate.formTitle', 'Register as a Donor')}
                </h2>

                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label className="form-label">
                      {t('donate.fullName', 'Full Name')} <span className="required">*</span>
                    </label>
                    <input type="text" name="fullName" className="form-control" required />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">
                        {t('donate.age', 'Age')} <span className="required">*</span>
                      </label>
                      <input type="number" name="age" min="18" max="65" className="form-control" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">
                        {t('donate.bloodGroup', 'Blood Group')} <span className="required">*</span>
                      </label>
                      <select name="bloodGroup" className="form-control" required defaultValue="">
                        <option value="" disabled>{t('common.selectOption', 'Select')}</option>
                        {BLOOD_GROUPS.map((bg) => (
                          <option key={bg} value={bg}>{bg}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">{t('donate.gender', 'Gender')} <span className="required">*</span></label>
                    <div className="form-radio-group">
                      <label className="form-radio-option">
                        <input type="radio" name="gender" value="male" required /> {t('donate.male', 'Male')}
                      </label>
                      <label className="form-radio-option">
                        <input type="radio" name="gender" value="female" /> {t('donate.female', 'Female')}
                      </label>
                      <label className="form-radio-option">
                        <input type="radio" name="gender" value="other" /> {t('donate.other', 'Other')}
                      </label>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">
                        {t('donate.mobile', 'Mobile')} <span className="required">*</span>
                      </label>
                      <input type="tel" name="mobile" pattern="[0-9]{10}" maxLength="10" className="form-control" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">{t('donate.email', 'Email')}</label>
                      <input type="email" name="email" className="form-control" />
                    </div>
                  </div>

                  {/* Replaced Location Picker with Standard Input */}
                  <div className="form-group">
                    <label className="form-label">
                      {t('donate.district', 'District')} / {t('donate.city', 'City')} <span className="required">*</span>
                    </label>
                    <input type="text" name="city" className="form-control" placeholder="Enter your city or district" required />
                  </div>

                  <div className="form-group">
                    <label className="form-label">{t('donate.address', 'Address')} <span className="required">*</span></label>
                    <textarea name="address" className="form-control" required />
                  </div>

                  <div className="form-group">
                    <label className="form-label">{t('donate.lastDonation', 'Last Donation Date')}</label>
                    <input type="date" name="lastDonation" className="form-control" />
                  </div>

                  <button type="submit" className="btn btn-saffron btn-block btn-lg" style={{ backgroundColor: '#FF9933', color: 'white', border: 'none' }}>
                    <FaTint /> {t('donate.submit', 'Register')}
                  </button>
                </form>
              </div>
            ) : (
              
              /* ----------------- CERTIFICATE VIEW ----------------- */
              <div className="certificate-wrapper">
                <div className="certificate-container" id="printable-certificate">
                  <div className="certificate-border">
                    
                    <div className="certificate-header">
                      <div className="raktmitra-logo">
                         <FaTint className="logo-icon" /> RAKTMITRA
                      </div>
                      <h1 className="certificate-title">Certificate of Appreciation</h1>
                      <p className="certificate-subtitle">PROUD BLOOD DONOR</p>
                    </div>

                    <div className="certificate-body">
                      <p>This certificate is proudly presented to</p>
                      <h2 className="donor-name">{donorData.name}</h2>
                      <p>
                        for their selfless act of registering to donate blood and save lives. 
                        Your contribution makes a profound impact in <strong>{donorData.city}</strong>.
                      </p>
                      
                      <div className="donor-stats">
                        <div className="stat-box">
                          <span className="stat-label">Blood Group</span>
                          <span className="stat-value blood-red">{donorData.bloodGroup}</span>
                        </div>
                        <div className="stat-box">
                          <span className="stat-label">Date</span>
                          <span className="stat-value">{donorData.date}</span>
                        </div>
                      </div>
                    </div>

                    <div className="certificate-footer">
                      <div className="signature-line">
                        <span>Authorized Signatory</span>
                        <strong>Raktmitra Foundation</strong>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Controls for the certificate */}
                <div className="no-print certificate-controls">
                  <button onClick={handlePrint} className="btn btn-block btn-lg print-btn" style={{ backgroundColor: '#333', color: 'white' }}>
                    <FaDownload /> Download / Print Certificate
                  </button>
                  <button onClick={() => setDonorData(null)} className="btn btn-block" style={{ marginTop: '15px', background: 'transparent', border: '1px solid #ccc' }}>
                    Register Another Donor
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}