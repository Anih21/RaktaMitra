/**
 * useBloodData — Custom React Hook
 *
 * Fetches district-wise blood availability from the backend.
 * Returns a Map keyed by district name for O(1) lookup in the map component.
 * Auto-refreshes every 15 minutes.
 */

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:5000';
const REFRESH_INTERVAL = 15 * 60 * 1000; // 15 minutes

export default function useBloodData() {
  const [districtData, setDistrictData] = useState(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastRefresh, setLastRefresh] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/districts`, { timeout: 8000 });
      const districts = response.data;

      // Build a Map for fast lookup: "Pune" -> { totalUnits, status, bloodBanks }
      const map = new Map();
      districts.forEach((d) => {
        map.set(d.district.toLowerCase(), d);
      });

      setDistrictData(map);
      setError(null);
      setLastRefresh(new Date());
    } catch (err) {
      console.warn('[useBloodData] Failed to fetch district data:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-refresh every 15 minutes
  useEffect(() => {
    const timer = setInterval(fetchData, REFRESH_INTERVAL);
    return () => clearInterval(timer);
  }, [fetchData]);

  return { districtData, loading, error, lastRefresh, refresh: fetchData };
}
