/**
 * DistrictModal — Blood Bank Detail Panel
 *
 * Slide-in side panel showing blood availability for a clicked district.
 * Contains a searchable table of all blood banks in that district.
 */

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import '../styles/district-modal.css';

const API_BASE = 'http://localhost:5000';
const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const STATUS_LABELS = {
  HIGH:     'High Availability',
  MEDIUM:   'Medium Availability',
  LOW:      'Low Availability',
  CRITICAL: 'Critical — Urgent Need',
  'NO DATA':'No Data Available',
};

function formatDate(dateStr) {
  if (!dateStr) return '—';
  try {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });
  } catch {
    return '—';
  }
}

export default function DistrictModal({ districtName, onClose }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  const fetchDetail = useCallback(async () => {
    if (!districtName) return;
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(
        `${API_BASE}/api/districts/${encodeURIComponent(districtName)}`,
        { timeout: 8000 }
      );
      setData(res.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load district data.');
    } finally {
      setLoading(false);
    }
  }, [districtName]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const filteredBanks = data?.bloodBanks?.filter((bank) =>
    bank.name.toLowerCase().includes(search.toLowerCase()) ||
    bank.address.toLowerCase().includes(search.toLowerCase())
  ) ?? [];

  const status = data?.status || 'NO DATA';

  return (
    <div className="dm-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="dm-panel" role="dialog" aria-modal="true" aria-label={`${districtName} blood availability`}>

        {/* Header */}
        <div className="dm-header">
          <div className="dm-header-left">
            <h2>🗺️ {districtName}</h2>
            <span className={`dm-status-badge ${status}`}>
              <span className="dm-status-dot" />
              {STATUS_LABELS[status] || status}
            </span>
          </div>
          <button className="dm-close-btn" onClick={onClose} aria-label="Close">✕</button>
        </div>

        {loading && (
          <div className="dm-state">
            <div className="dm-spinner" />
            Loading blood bank data...
          </div>
        )}

        {error && !loading && (
          <div className="dm-state">
            ⚠️ {error}
            <br />
            <button
              onClick={fetchDetail}
              style={{ marginTop: 12, padding: '6px 16px', cursor: 'pointer',
                background: '#c0392b', color: '#fff', border: 'none', borderRadius: 6 }}
            >
              Retry
            </button>
          </div>
        )}

        {data && !loading && (
          <>
            {/* Stats */}
            <div className="dm-stats">
              <div className="dm-stat-card">
                <div className="dm-stat-value">{data.totalUnits.toLocaleString('en-IN')}</div>
                <div className="dm-stat-label">Total Blood Units</div>
              </div>
              <div className="dm-stat-card">
                <div className="dm-stat-value">{data.bloodBanks?.length || 0}</div>
                <div className="dm-stat-label">Blood Banks</div>
              </div>
              <div className="dm-stat-card">
                <div className="dm-stat-value" style={{ fontSize: '1.1rem', color: '#333' }}>
                  {status}
                </div>
                <div className="dm-stat-label">Status</div>
              </div>
            </div>

            {/* Search */}
            <div className="dm-search-wrap">
              <input
                type="text"
                placeholder="🔍 Search blood bank or address..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search blood banks"
              />
            </div>

            {/* Table */}
            <div className="dm-table-wrap">
              {filteredBanks.length === 0 ? (
                <div className="dm-state">No blood banks match your search.</div>
              ) : (
                <table className="dm-table">
                  <thead>
                    <tr>
                      <th>Blood Bank</th>
                      <th>Address</th>
                      {BLOOD_TYPES.map((bt) => <th key={bt}>{bt}</th>)}
                      <th>Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBanks.map((bank, idx) => (
                      <tr key={idx}>
                        <td title={bank.name}>{bank.name}</td>
                        <td title={bank.address}>{bank.address || '—'}</td>
                        {BLOOD_TYPES.map((bt) => (
                          <td key={bt}>
                            <span className={`dm-cell-unit${bank[bt] === 0 ? ' zero' : ''}`}>
                              {bank[bt]}
                            </span>
                          </td>
                        ))}
                        <td>
                          <span className="dm-last-updated">{formatDate(bank.lastUpdated)}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Footer */}
            <div className="dm-footer">
              Source: eRaktKosh / Maharashtra Blood Bank Network &nbsp;•&nbsp;
              Showing {filteredBanks.length} of {data.bloodBanks?.length} banks
            </div>
          </>
        )}
      </div>
    </div>
  );
}
