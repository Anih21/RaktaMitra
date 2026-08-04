import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaMapMarkerAlt, FaSearch, FaSpinner } from 'react-icons/fa';

export default function MaharashtraMapSelector({ value, onChange, error }) {
  const { t } = useTranslation();
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState('');

  // Initial Coordinates centered around Maharashtra (Aurangabad/Chhatrapati Sambhajinagar)
  const defaultLat = 19.7515;
  const defaultLng = 75.7139;

  useEffect(() => {
    if (window.L) {
      initMap();
    } else {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);

      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => {
        initMap();
      };
      document.body.appendChild(script);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  const initMap = () => {
    if (mapRef.current || !mapContainerRef.current) return;

    const initialLat = value?.latitude || defaultLat;
    const initialLng = value?.longitude || defaultLng;
    const initialZoom = value?.latitude ? 13 : 7;

    const map = window.L.map(mapContainerRef.current).setView([initialLat, initialLng], initialZoom);
    mapRef.current = map;

    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const customIcon = window.L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      setMarker(lat, lng, customIcon);
      reverseGeocode(lat, lng);
    });

    if (value?.latitude && value?.longitude) {
      setMarker(value.latitude, value.longitude, customIcon);
    }
  };

  const setMarker = (lat, lng, icon) => {
    if (!mapRef.current) return;

    if (markerRef.current) {
      markerRef.current.setLatLng([lat, lng]);
    } else {
      const marker = window.L.marker([lat, lng], {
        icon: icon,
        draggable: true
      }).addTo(mapRef.current);

      marker.on('dragend', () => {
        const pos = marker.getLatLng();
        reverseGeocode(pos.lat, pos.lng);
      });

      markerRef.current = marker;
    }
  };

  const parseNominatimAddress = (data) => {
    const address = data.address || {};
    const lat = data.lat;
    const lon = data.lon;

    const state = address.state || 'Maharashtra';
    const district = address.district || address.county || address.state_district || address.region || '';
    const taluka = address.subdistrict || address.taluk || address.tehsil || address.subcounty || '';
    const city = address.village || address.town || address.city || address.municipality || address.suburb || address.neighbourhood || '';
    const pincode = address.postcode || '';

    return {
      latitude: parseFloat(lat),
      longitude: parseFloat(lon),
      district,
      taluka,
      city,
      state,
      pincode
    };
  };

  const reverseGeocode = async (lat, lng) => {
    setLoading(true);
    setSearchError('');
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&zoom=18&accept-language=en`
      );
      if (!response.ok) throw new Error('Reverse geocoding failed');
      const data = await response.json();
      
      if (data && data.address) {
        const parsed = parseNominatimAddress(data);
        onChange(parsed);
      }
    } catch (err) {
      console.error(err);
      setSearchError(t('validation.reverseGeocodeError') || 'Failed to retrieve address details.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setSearchError('');
    try {
      const queryStr = `${searchQuery}, Maharashtra, India`;
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(queryStr)}&limit=1&accept-language=en`
      );
      if (!response.ok) throw new Error('Search failed');
      const data = await response.json();

      if (data && data.length > 0) {
        const result = data[0];
        const lat = parseFloat(result.lat);
        const lon = parseFloat(result.lon);

        if (mapRef.current) {
          mapRef.current.setView([lat, lon], 14);
          
          const customIcon = window.L.icon({
            iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          });

          setMarker(lat, lon, customIcon);
          const parsed = parseNominatimAddress(result);
          onChange(parsed);
        }
      } else {
        setSearchError(t('validation.locationNotFound') || 'Location not found. Try a different place name.');
      }
    } catch (err) {
      console.error(err);
      setSearchError(t('validation.searchError') || 'Search error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="map-selector-container">
      <form onSubmit={handleSearch} className="map-search-form">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t('fields.searchLocation')}
          className="map-search-input"
        />
        <button type="submit" className="btn btn-primary map-search-btn" disabled={loading}>
          {loading ? <FaSpinner className="spin" /> : <FaSearch />}
          <span>{t('fields.search')}</span>
        </button>
      </form>

      {searchError && <div className="alert alert-error" style={{ margin: '8px 0' }}>{searchError}</div>}

      <p className="map-instruction">{t('fields.mapInstruction')}</p>

      <div 
        ref={mapContainerRef} 
        className={`map-canvas ${error ? 'map-canvas-error' : ''}`}
        style={{ height: '320px', width: '100%', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--color-border)' }}
      />

      {error && <span className="error-text" style={{ marginTop: '4px', display: 'block' }}>{error}</span>}

      {value?.latitude && (
        <div className="location-preview-card">
          <h4>{t('fields.selectedLocation')}</h4>
          <div className="preview-grid">
            <div className="preview-item">
              <span className="label">{t('fields.coordinates')}:</span>
              <span className="val">{value.latitude.toFixed(5)}, {value.longitude.toFixed(5)}</span>
            </div>
            <div className="preview-item">
              <span className="label">{t('fields.district')}:</span>
              <span className="val">{value.district || '-'}</span>
            </div>
            <div className="preview-item">
              <span className="label">{t('fields.taluka')}:</span>
              <span className="val">{value.taluka || '-'}</span>
            </div>
            <div className="preview-item">
              <span className="label">{t('fields.city')}:</span>
              <span className="val">{value.city || '-'}</span>
            </div>
            <div className="preview-item">
              <span className="label">{t('fields.state')}:</span>
              <span className="val">{value.state || '-'}</span>
            </div>
            <div className="preview-item">
              <span className="label">{t('fields.pincode')}:</span>
              <span className="val">{value.pincode || '-'}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
