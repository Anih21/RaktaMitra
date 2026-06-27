import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaSearch, FaWarehouse, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import PageHeader from '../components/PageHeader';
import '../styles/pages.css';

const BLOOD_BANKS = [
  { id: 1, name: 'State Blood Bank, Mumbai', city: 'Mumbai', district: 'Mumbai City', phone: '022-2410XXXX', status: 'available' },
  { id: 2, name: 'Sassoon General Hospital Blood Bank', city: 'Pune', district: 'Pune', phone: '020-2612XXXX', status: 'available' },
  { id: 3, name: 'Government Medical College Blood Bank', city: 'Nagpur', district: 'Nagpur', phone: '0712-274XXXX', status: 'limited' },
  { id: 4, name: 'Civil Hospital Blood Bank', city: 'Nashik', district: 'Nashik', phone: '0253-225XXXX', status: 'available' },
  { id: 5, name: 'Indian Red Cross Society Blood Bank', city: 'Thane', district: 'Thane', phone: '022-2534XXXX', status: 'unavailable' },
  { id: 6, name: 'Government Medical College Blood Bank', city: 'Aurangabad', district: 'Aurangabad', phone: '0240-233XXXX', status: 'available' },
  { id: 7, name: 'Chhatrapati Pramila Raje Blood Bank', city: 'Kolhapur', district: 'Kolhapur', phone: '0231-265XXXX', status: 'limited' },
  { id: 8, name: 'Civil Hospital Blood Bank', city: 'Solapur', district: 'Solapur', phone: '0217-272XXXX', status: 'available' }
];

const STATUS_LABEL_KEY = {
  available: 'available',
  limited: 'limited',
  unavailable: 'unavailable'
};

export default function BloodBanks() {
  const { t } = useTranslation();
  const [query, setQuery] = useState('');

  const filtered = BLOOD_BANKS.filter((bank) =>
    `${bank.city} ${bank.district} ${bank.name}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  return (
    <>
      <PageHeader title={t('banks.title')} subtitle={t('banks.subtitle')} />

      <section className="section">
        <div className="container">
          <div className="search-bar">
            <FaSearch />
            <input
              type="text"
              placeholder={t('banks.searchPlaceholder')}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label={t('banks.searchPlaceholder')}
            />
          </div>

          {filtered.length === 0 ? (
            <p style={{ textAlign: 'center' }}>{t('common.noResults')}</p>
          ) : (
            <div className="grid grid-3">
              {filtered.map((bank) => (
                <div className="card list-card" key={bank.id}>
                  <div className="list-card-top">
                    <div className="list-card-icon"><FaWarehouse /></div>
                    <span className={`badge badge-${bank.status}`}>
                      {t(`banks.${STATUS_LABEL_KEY[bank.status]}`)}
                    </span>
                  </div>
                  <h3>{bank.name}</h3>
                  <div className="list-card-meta">
                    <FaMapMarkerAlt /> {bank.city}, {bank.district}
                  </div>
                  <div className="list-card-meta">
                    <FaPhoneAlt /> {bank.phone}
                  </div>
                  <div className="list-card-footer">
                    <a href={`tel:${bank.phone}`} className="btn btn-outline">
                      {t('banks.viewDetails')}
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
