import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaCampground, FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUsers } from 'react-icons/fa';
import PageHeader from '../components/PageHeader';
import '../styles/pages.css';

const CAMPS = [
  { id: 1, organizer: 'Lions Club of Pune', date: '28 June 2026', time: '9:00 AM - 4:00 PM', venue: 'Shivaji Nagar Community Hall, Pune' },
  { id: 2, organizer: 'Rotary Club Mumbai', date: '02 July 2026', time: '10:00 AM - 3:00 PM', venue: 'Andheri Sports Complex, Mumbai' },
  { id: 3, organizer: 'NSS Unit, Nagpur University', date: '05 July 2026', time: '9:30 AM - 2:00 PM', venue: 'University Campus Ground, Nagpur' },
  { id: 4, organizer: 'Indian Red Cross Society', date: '10 July 2026', time: '9:00 AM - 5:00 PM', venue: 'District Collector Office, Nashik' },
  { id: 5, organizer: 'Maharashtra Police Welfare Association', date: '15 July 2026', time: '10:00 AM - 1:00 PM', venue: 'Police Headquarters, Thane' },
  { id: 6, organizer: 'Jaycees Aurangabad', date: '20 July 2026', time: '9:00 AM - 3:00 PM', venue: 'Town Hall, Aurangabad' }
];

export default function Camps() {
  const { t } = useTranslation();

  return (
    <>
      <PageHeader title={t('camps.title')} subtitle={t('camps.subtitle')} />

      <section className="section">
        <div className="container">
          <div className="grid grid-3">
            {CAMPS.map((camp) => (
              <div className="card list-card" key={camp.id}>
                <div className="list-card-top">
                  <div className="list-card-icon"><FaCampground /></div>
                </div>
                <h3>{camp.organizer}</h3>
                <div className="list-card-meta">
                  <FaCalendarAlt /> {t('camps.date')}: {camp.date}
                </div>
                <div className="list-card-meta">
                  <FaClock /> {t('camps.time')}: {camp.time}
                </div>
                <div className="list-card-meta">
                  <FaMapMarkerAlt /> {camp.venue}
                </div>
                <div className="list-card-footer">
                  <button type="button" className="btn btn-saffron">
                    <FaUsers /> {t('camps.register')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
