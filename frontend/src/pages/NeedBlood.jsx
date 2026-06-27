import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  FaExclamationTriangle, 
  FaPhoneAlt, 
  FaCheckCircle, 
  FaHandHoldingMedical,
  FaMapMarkerAlt,
  FaChevronDown,
  FaChevronUp,
  FaTint,
  FaRupeeSign,
  FaBell,
  FaTimesCircle // Added for rejection icon
} from 'react-icons/fa';
import PageHeader from '../components/PageHeader';
import MaharashtraLocationPicker from '../components/MaharashtraLocationPicker';
import '../styles/forms.css';
import '../styles/needBlood.css';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

// Mock function to generate nearby blood banks based on location
const getNearbyBloodBanks = (locationName) => {
  return [
    {
      id: 1,
      name: `Sanjeevani Blood Bank, ${locationName || 'Local'}`,
      distance: '3.2 km',
      address: `123 Healthcare Sector, ${locationName || 'City'}`,
      contact: '022-12345678',
      stock: {
        blood: {
          'A+': { units: 12, rate: 850 },
          'A-': { units: 2, rate: 950 },
          'B+': { units: 24, rate: 850 },
          'B-': { units: 0, rate: 950 },
          'O+': { units: 18, rate: 850 },
          'O-': { units: 3, rate: 1050 },
          'AB+': { units: 8, rate: 850 },
          'AB-': { units: 1, rate: 1100 }
        },
        plasma: { units: 15, rate: 1500 },
        platelets: { units: 5, rate: 2000 }
      }
    },
    {
      id: 2,
      name: `City General Hospital, ${locationName || 'Local'}`,
      distance: '8.7 km',
      address: `Opposite Main Bus Stand, ${locationName || 'City'}`,
      contact: '022-87654321',
      stock: {
        blood: {
          'A+': { units: 5, rate: 800 },
          'A-': { units: 1, rate: 900 },
          'B+': { units: 10, rate: 800 },
          'B-': { units: 4, rate: 900 },
          'O+': { units: 30, rate: 800 },
          'O-': { units: 6, rate: 1000 },
          'AB+': { units: 12, rate: 800 },
          'AB-': { units: 0, rate: 1000 }
        },
        plasma: { units: 8, rate: 1400 },
        platelets: { units: 12, rate: 1800 }
      }
    },
    {
      id: 3,
      name: `Apex Care Center, ${locationName || 'Local'}`,
      distance: '21.4 km',
      address: `Ring Road Outskirts, ${locationName || 'City'}`,
      contact: '022-11223344',
      stock: {
        blood: {
          'A+': { units: 45, rate: 900 },
          'A-': { units: 8, rate: 1000 },
          'B+': { units: 33, rate: 900 },
          'B-': { units: 5, rate: 1000 },
          'O+': { units: 50, rate: 900 },
          'O-': { units: 12, rate: 1100 },
          'AB+': { units: 20, rate: 900 },
          'AB-': { units: 3, rate: 1200 }
        },
        plasma: { units: 25, rate: 1600 },
        platelets: { units: 18, rate: 2200 }
      }
    }
  ];
};

export default function NeedBlood() {
  const { t } = useTranslation();
  
  const [location, setLocation] = useState({
    district_id: '', district: '', taluka_id: '', taluka: '', village: ''
  });

  const [requestData, setRequestData] = useState(null);
  const [nearbyBanks, setNearbyBanks] = useState([]);
  const [expandedBankId, setExpandedBankId] = useState(null);
  
  const [reservingBankId, setReservingBankId] = useState(null);
  const [notification, setNotification] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const requestedBloodGroup = formData.get('bloodGroup');

    setRequestData({
      bloodGroup: requestedBloodGroup,
      location: location.district || location.city || 'your area'
    });

    setNearbyBanks(getNearbyBloodBanks(location.district));
  };

  const toggleBankDetails = (id) => {
    setExpandedBankId(expandedBankId === id ? null : id);
  };

  // Simulate sending a request to the bank and waiting for their approval/rejection
  const handleReserve = (bank) => {
    setReservingBankId(bank.id);
    
    // Simulate a 3-second delay for the blood bank to review the request
    setTimeout(() => {
      setReservingBankId(null);
      
      // Randomly simulate Acceptance (70% chance) or Rejection (30% chance)
      const isAccepted = Math.random() > 0.3;

      if (isAccepted) {
        setNotification({
          title: "Request Accepted!",
          message: `${bank.name} has accepted your request. They have reserved ${requestData.bloodGroup} units for you. Please contact them immediately.`,
          type: "success"
        });
      } else {
        setNotification({
          title: "Request Declined",
          message: `${bank.name} is currently unable to fulfill this request due to high demand. Please try reserving at another nearby blood bank.`,
          type: "error"
        });
      }

      // Auto-hide the notification after 8 seconds
      setTimeout(() => {
        setNotification(null);
      }, 8000);
    }, 3000);
  };

  return (
    <>
      {/* Toast Notification Container */}
      {notification && (
        <div className={`toast-notification toast-${notification.type}`}>
          <div className="toast-icon">
            {notification.type === 'success' ? <FaBell /> : <FaTimesCircle />}
          </div>
          <div className="toast-content">
            <h4>{notification.title}</h4>
            <p>{notification.message}</p>
          </div>
          <button className="toast-close" onClick={() => setNotification(null)}>&times;</button>
        </div>
      )}

      <PageHeader title={t('need.title')} subtitle={t('need.subtitle')} />

      <section className="section">
        <div className="container">
          
          {!requestData ? (
            <>
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
                      <select name="bloodGroup" className="form-control" required defaultValue="">
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
            </>
          ) : (
            
            /* ----------------- RESULTS VIEW ----------------- */
            <div className="blood-banks-results">
              <div className="form-success" style={{ marginBottom: '30px' }}>
                <FaCheckCircle /> Request processed. Available blood banks near <strong>{requestData.location}</strong> (30 km range).
              </div>

              <div className="results-header">
                <h3>Available Blood Banks</h3>
                <p>Showing stock availability and rates. Click a bank to view full inventory.</p>
              </div>

              <div className="bank-list">
                {nearbyBanks.map((bank) => {
                  const isExpanded = expandedBankId === bank.id;
                  const requestedBloodStock = bank.stock.blood[requestData.bloodGroup];
                  const isReserving = reservingBankId === bank.id;

                  return (
                    <div key={bank.id} className={`bank-card ${isExpanded ? 'expanded' : ''}`}>
                      
                      <div className="bank-card-header" onClick={() => toggleBankDetails(bank.id)}>
                        <div className="bank-info-main">
                          <h4>{bank.name}</h4>
                          <p className="bank-address"><FaMapMarkerAlt /> {bank.address} <span>({bank.distance})</span></p>
                          <p className="bank-contact"><FaPhoneAlt /> {bank.contact}</p>
                        </div>
                        <div className="bank-quick-status">
                          <div className={`status-badge ${requestedBloodStock.units > 0 ? 'available' : 'unavailable'}`}>
                            {requestData.bloodGroup}: {requestedBloodStock.units > 0 ? `${requestedBloodStock.units} Units` : 'Out of Stock'}
                          </div>
                          {isExpanded ? <FaChevronUp className="toggle-icon" /> : <FaChevronDown className="toggle-icon" />}
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="bank-card-details">
                          <h5 className="inventory-title">Complete Inventory Status</h5>
                          
                          <div className="inventory-grid">
                            {BLOOD_GROUPS.map((bg) => {
                              const item = bank.stock.blood[bg];
                              const isRequested = bg === requestData.bloodGroup;
                              return (
                                <div key={bg} className={`inventory-item ${isRequested ? 'highlight-item' : ''} ${item.units === 0 ? 'out-of-stock' : ''}`}>
                                  <div className="item-bg"><FaTint /> {bg}</div>
                                  <div className="item-stats">
                                    <span className="item-units">{item.units} Units</span>
                                    <span className="item-rate"><FaRupeeSign /> {item.rate} / unit</span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          <div className="other-components">
                            <div className="component-card">
                              <strong>Plasma</strong>
                              <span>{bank.stock.plasma.units} Units Available</span>
                              <span className="rate"><FaRupeeSign /> {bank.stock.plasma.rate} / unit</span>
                            </div>
                            <div className="component-card">
                              <strong>Platelets</strong>
                              <span>{bank.stock.platelets.units} Units Available</span>
                              <span className="rate"><FaRupeeSign /> {bank.stock.platelets.rate} / unit</span>
                            </div>
                          </div>

                          <div className="bank-actions">
                            <button 
                              className="btn btn-primary" 
                              style={{ 
                                backgroundColor: isReserving ? '#999' : '#d32f2f', 
                                color: '#fff', 
                                border: 'none',
                                cursor: isReserving ? 'not-allowed' : 'pointer'
                              }}
                              onClick={() => handleReserve(bank)}
                              disabled={isReserving}
                            >
                              {isReserving ? 'Awaiting Bank Approval...' : 'Reserve Blood'}
                            </button>
                            <a href={`tel:${bank.contact}`} className="btn" style={{ border: '1px solid #ccc', background: 'transparent', textDecoration: 'none' }}>
                              Call Blood Bank
                            </a>
                          </div>

                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div style={{ textAlign: 'center', marginTop: '30px' }}>
                <button 
                  onClick={() => setRequestData(null)} 
                  className="btn" 
                  style={{ background: 'transparent', textDecoration: 'underline' }}
                >
                  Submit Another Request
                </button>
              </div>

            </div>
          )}
        </div>
      </section>
    </>
  );
}