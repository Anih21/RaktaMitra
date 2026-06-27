import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FaMapMarkedAlt, FaCity, FaHome, FaChevronRight, FaCheckCircle, FaInfoCircle } from 'react-icons/fa';
import { DISTRICTS, getDistrictName } from '../data/maharashtraDistricts';
import { getTalukas, getVillages, hasDigitizedData } from '../data/locationData';
import '../styles/location-picker.css';

/**
 * Maharashtra Map -> District -> Taluka -> Village picker.
 * value: { district, district_id, taluka, village }
 * onChange: (value) => void
 */
export default function MaharashtraLocationPicker({ value, onChange }) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === 'hi' || i18n.language === 'mr' ? i18n.language : 'en';

  const [hovered, setHovered] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [manualTaluka, setManualTaluka] = useState('');
  const [manualVillage, setManualVillage] = useState('');
  const svgWrapRef = useRef(null);

  const districtId = value?.district_id || '';
  const talukaId = value?.taluka_id || '';

  const selectedDistrict = DISTRICTS.find((d) => d.id === districtId);
  const talukas = districtId ? getTalukas(districtId) : [];
  const villages = districtId && talukaId ? getVillages(districtId, talukaId) : [];
  const digitized = districtId ? hasDigitizedData(districtId) : true;

  const handleHover = (e, district) => {
    setHovered(district.id);
    const wrap = svgWrapRef.current?.getBoundingClientRect();
    if (wrap) {
      setTooltipPos({
        x: ((district.x) / 100) * wrap.width,
        y: ((district.y) / 100) * wrap.height
      });
    }
  };

  const selectDistrict = (district) => {
    onChange({
      district_id: district.id,
      district: getDistrictName(district.id, lang),
      taluka_id: '',
      taluka: '',
      village: ''
    });
    setManualTaluka('');
    setManualVillage('');
  };

  const selectTaluka = (taluka) => {
    onChange({
      ...value,
      taluka_id: taluka.id,
      taluka: taluka.name[lang] || taluka.name.en,
      village: ''
    });
  };

  const selectVillage = (villageName) => {
    onChange({
      ...value,
      village: villageName
    });
  };

  const resetTo = (level) => {
    if (level === 'district') {
      onChange({ district_id: '', district: '', taluka_id: '', taluka: '', village: '' });
    } else if (level === 'taluka') {
      onChange({ ...value, taluka_id: '', taluka: '', village: '' });
    }
  };

  return (
    <div className="loc-picker">
      {/* Breadcrumb */}
      <div className="loc-breadcrumb">
        <span
          className={`loc-breadcrumb-step ${districtId ? 'done' : ''}`}
          onClick={() => districtId && resetTo('district')}
        >
          <FaMapMarkedAlt /> {selectedDistrict ? getDistrictName(districtId, lang) : t('location.selectDistrict')}
        </span>
        {districtId && (
          <>
            <FaChevronRight className="loc-breadcrumb-arrow" />
            <span
              className={`loc-breadcrumb-step ${talukaId || manualTaluka ? 'done' : ''}`}
              onClick={() => talukaId && resetTo('taluka')}
            >
              <FaCity /> {value?.taluka || manualTaluka || t('location.selectTaluka')}
            </span>
          </>
        )}
        {(talukaId || manualTaluka) && (
          <>
            <FaChevronRight className="loc-breadcrumb-arrow" />
            <span className={`loc-breadcrumb-step ${value?.village || manualVillage ? 'done' : ''}`}>
              <FaHome /> {value?.village || manualVillage || t('location.selectVillage')}
            </span>
          </>
        )}
      </div>

      {/* STEP 1: Map */}
      {!districtId && (
        <>
          <div className="loc-map-wrap" ref={svgWrapRef}>
            <svg viewBox="0 0 100 80" className="loc-map-svg" role="img" aria-label="Map of Maharashtra districts">
              {DISTRICTS.map((d) => (
                <g
                  key={d.id}
                  className={`loc-district-dot ${hovered === d.id ? 'hovered' : ''}`}
                  onMouseEnter={(e) => handleHover(e, d)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => selectDistrict(d)}
                  tabIndex={0}
                  role="button"
                  aria-label={getDistrictName(d.id, lang)}
                  onKeyDown={(e) => (e.key === 'Enter' ? selectDistrict(d) : null)}
                >
                  <circle cx={d.x} cy={d.y} r="2" />
                  <text x={d.x} y={d.y - 3} textAnchor="middle" className="loc-district-label">
                    {getDistrictName(d.id, lang)}
                  </text>
                </g>
              ))}
            </svg>

            {hovered && (
              <div
                className="loc-tooltip"
                style={{ left: tooltipPos.x, top: tooltipPos.y }}
              >
                {getDistrictName(hovered, lang)}
              </div>
            )}
          </div>
          <p className="loc-map-hint">{t('location.mapHint')}</p>
          <div className="loc-map-legend">
            <span><span className="loc-legend-dot" style={{ background: 'var(--color-saffron)' }} /> {t('location.legendDistrict')}</span>
            <span><span className="loc-legend-dot" style={{ background: 'var(--color-blue)' }} /> {t('location.legendHover')}</span>
            <span><span className="loc-legend-dot" style={{ background: 'var(--color-emergency)' }} /> {t('location.legendSelected')}</span>
          </div>
        </>
      )}

      {/* STEP 2: Taluka */}
      {districtId && !talukaId && (
        <div>
          <div className="loc-section-title"><FaCity /> {t('location.chooseTaluka')}</div>

          {digitized ? (
            <div className="loc-chip-grid">
              {talukas.map((tal) => (
                <button
                  type="button"
                  key={tal.id}
                  className="loc-chip"
                  onMouseEnter={() => setManualTaluka(tal.name[lang] || tal.name.en)}
                  onClick={() => selectTaluka(tal)}
                >
                  {tal.name[lang] || tal.name.en}
                </button>
              ))}
            </div>
          ) : (
            <>
              <div className="loc-fallback-note">
                <FaInfoCircle />
                <span>{t('location.notDigitized')}</span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder={t('location.talukaPlaceholder')}
                value={manualTaluka}
                onChange={(e) => setManualTaluka(e.target.value)}
                onBlur={() =>
                  manualTaluka &&
                  onChange({ ...value, taluka_id: 'manual', taluka: manualTaluka })
                }
              />
            </>
          )}
        </div>
      )}

      {/* STEP 3: Village */}
      {districtId && talukaId && (
        <div>
          <div className="loc-section-title"><FaHome /> {t('location.chooseVillage')}</div>

          {digitized && villages.length > 0 ? (
            <div className="loc-chip-grid">
              {villages.map((v, idx) => (
                <button
                  type="button"
                  key={idx}
                  className={`loc-chip ${value?.village === (v[lang] || v.en) ? 'selected' : ''}`}
                  onMouseEnter={() => setManualVillage(v[lang] || v.en)}
                  onClick={() => selectVillage(v[lang] || v.en)}
                >
                  {v[lang] || v.en}
                </button>
              ))}
            </div>
          ) : (
            <>
              <div className="loc-fallback-note">
                <FaInfoCircle />
                <span>{t('location.notDigitized')}</span>
              </div>
              <input
                type="text"
                className="form-control"
                placeholder={t('location.villagePlaceholder')}
                value={manualVillage}
                onChange={(e) => setManualVillage(e.target.value)}
                onBlur={() => manualVillage && selectVillage(manualVillage)}
              />
            </>
          )}
        </div>
      )}

      {value?.district && value?.village && (
        <div className="loc-summary">
          <FaCheckCircle />
          {value.village}, {value.taluka}, {value.district}
        </div>
      )}
    </div>
  );
}