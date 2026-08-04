import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaSearch, FaHospital, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import PageHeader from '../components/PageHeader';
import '../styles/pages.css';

const HOSPITALS = [
  { id: 1, name: 'KEM Hospital', city: 'Mumbai', type: 'government', phone: '022-2410XXXX' },
  { id: 2, name: 'Sassoon General Hospital', city: 'Pune', type: 'government', phone: '020-2612XXXX' },
  { id: 3, name: 'Apollo Hospital', city: 'Nashik', type: 'private', phone: '0253-660XXXX' },
  { id: 4, name: 'Government Medical College Hospital', city: 'Nagpur', type: 'government', phone: '0712-274XXXX' },
  { id: 5, name: 'Fortis Hospital', city: 'Mumbai', type: 'private', phone: '022-6754XXXX' },
  { id: 6, name: 'Civil Hospital', city: 'Solapur', type: 'government', phone: '0217-272XXXX' },
  { id: 7, name: 'Wockhardt Hospital', city: 'Nagpur', type: 'private', phone: '0712-660XXXX' },
  { id: 8, name: 'Government Medical College Hospital', city: 'Aurangabad', type: 'government', phone: '0240-233XXXX' }
];

export default function Hospitals() {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');

  const filtered = HOSPITALS.filter((h) =>
    `${h.name} ${h.city}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <PageHeader title={t('hospitals.title')} subtitle={t('hospitals.subtitle')} />

      <section className="section">
        <div className="container">
          <div className="search-bar">
            <FaSearch />
            <input
              type="text"
              placeholder={t('hospitals.searchPlaceholder')}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label={t('hospitals.searchPlaceholder')}
            />
          </div>

          {filtered.length === 0 ? (
            <p style={{ textAlign: 'center' }}>{t('common.noResults')}</p>
          ) : (
            <div className="grid grid-3">
              {filtered.map((h) => (
                <div className="card list-card" key={h.id}>
                  <div className="list-card-top">
                    <div className="list-card-icon"><FaHospital /></div>
                    <span className={`badge badge-${h.type}`}>
                      {t(`hospitals.${h.type}`)}
                    </span>
                  </div>
                  <h3>{h.name}</h3>
                  <div className="list-card-meta">
                    <FaMapMarkerAlt /> {h.city}
                  </div>
                  <div className="list-card-meta">
                    <FaPhoneAlt /> {h.phone}
                  </div>
                  <div className="list-card-footer">
                    <a href={`tel:${h.phone}`} className="btn btn-outline">
                      {t('hospitals.viewDetails')}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
