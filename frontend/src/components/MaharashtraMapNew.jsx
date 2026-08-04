/**
 * MaharashtraMapNew — Interactive SVG Map with Live Blood Availability Colors
 *
 * Props:
 *  - districtData: Map<string, { totalUnits, status, bloodBanks }> (lowercase keys)
 *  - onDistrictClick(name): called when a district is clicked
 */

import { useState, useCallback, useRef, useMemo } from 'react';
import maharashtraGeoJSON from '../data/maharashtra-districts.json';
import { computeBBox, featureToSvgPath, featureCentroid } from '../utils/geoToSvg';
import { getDistrictInfo } from '../data/districtInfo';

const SVG_WIDTH = 800;
const SVG_HEIGHT = 700;
const PADDING = 5;

const projectionConfig = { width: SVG_WIDTH, height: SVG_HEIGHT, padding: PADDING };

// Status → fill color mapping
const STATUS_COLORS = {
  HIGH:     '#28a745',
  MEDIUM:   '#ffc107',
  LOW:      '#fd7e14',
  CRITICAL: '#dc3545',
  'NO DATA':'#6c757d',
};

const STATUS_LABELS = {
  HIGH:     '🟢 High',
  MEDIUM:   '🟡 Medium',
  LOW:      '🟠 Low',
  CRITICAL: '🔴 Critical',
  'NO DATA':'⚫ No Data',
};

/**
 * Returns the fill color for a district based on blood availability status.
 * Falls back to the district's static color from districtInfo if no live data.
 */
function getDistrictFill(districtName, districtData, isHovered, staticColor) {
  if (!districtData || districtData.size === 0) {
    // No data yet — use static gradient colors
    return null; // signal to use gradient
  }

  const key = districtName.toLowerCase();
  const info = districtData.get(key);
  if (!info) return null; // use gradient fallback

  const baseColor = STATUS_COLORS[info.status] || STATUS_COLORS['NO DATA'];
  return isHovered
    ? baseColor          // solid on hover
    : baseColor + 'cc';  // slight transparency when idle
}

export default function MaharashtraMapNew({ districtData, onDistrictClick }) {
  const svgRef = useRef(null);
  const [hoveredDistrict, setHoveredDistrict] = useState(null);
  const [tooltip, setTooltip] = useState({
    visible: false, x: 0, y: 0,
    name: '', division: '', totalUnits: null, bloodBanks: null, status: null,
  });

  // Pre-compute all SVG paths and centroids from GeoJSON
  const { paths } = useMemo(() => {
    const features = maharashtraGeoJSON.features;
    const bbox = computeBBox(features);

    const paths = features.map((feature) => {
      const name = feature.properties?.district || 'Unknown';
      const svgPath = featureToSvgPath(feature, bbox, projectionConfig);
      const centroid = featureCentroid(feature, bbox, projectionConfig);
      const info = getDistrictInfo(name);
      return { name, path: svgPath, centroid, color: info.color, division: info.division };
    });

    return { paths };
  }, []);

  const handleMouseMove = useCallback((e, district) => {
    const liveData = districtData?.get(district.name.toLowerCase());
    setTooltip({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      name: district.name,
      division: district.division,
      totalUnits: liveData?.totalUnits ?? null,
      bloodBanks: liveData?.bloodBanks ?? null,
      status: liveData?.status ?? null,
    });
  }, [districtData]);

  const handleMouseEnter = useCallback((name) => setHoveredDistrict(name), []);

  const handleMouseLeave = useCallback(() => {
    setHoveredDistrict(null);
    setTooltip((prev) => ({ ...prev, visible: false }));
  }, []);

  const handleDistrictClick = useCallback((name) => {
    if (onDistrictClick) onDistrictClick(name);
  }, [onDistrictClick]);

  const handleKeyDown = useCallback((e, name) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleDistrictClick(name);
    }
  }, [handleDistrictClick]);

  return (
    <div className="map-container" style={{ position: 'relative' }}>

      {/* Legend — always visible */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '5px 10px',
        marginBottom: '8px', justifyContent: 'center', padding: '0 4px',
      }}>
        {Object.entries(STATUS_COLORS).map(([status, color]) => (
          <div key={status} style={{
            display: 'flex', alignItems: 'center', gap: 4,
            fontSize: '0.68rem', color: '#555', fontWeight: 600,
            background: '#f8f8f8', border: '1px solid #eee',
            borderRadius: 999, padding: '2px 8px 2px 5px',
          }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: color, flexShrink: 0 }} />
            {status}
          </div>
        ))}
      </div>

      {/* SVG Map */}
      <svg
        ref={svgRef}
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: 'auto', display: 'block' }}
        role="img"
        aria-label="Interactive map of Maharashtra showing blood availability by district"
      >
        <defs>
          <filter id="mmap-glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Gradient fallbacks (used when no live data) */}
          {paths.map((district) => (
            <linearGradient
              key={`grad-${district.name}`}
              id={`mmap-grad-${district.name.replace(/\s/g, '')}`}
              x1="0%" y1="0%" x2="100%" y2="100%"
            >
              <stop offset="0%"   stopColor={district.color} stopOpacity={hoveredDistrict === district.name ? 0.6 : 0.18} />
              <stop offset="100%" stopColor={district.color} stopOpacity={hoveredDistrict === district.name ? 0.4 : 0.09} />
            </linearGradient>
          ))}
        </defs>

        {/* SVG background so district borders pop */}
        <rect
          x="0" y="0"
          width={SVG_WIDTH} height={SVG_HEIGHT}
          fill="#eef2f7"
          rx="6"
        />
        <g>
          {paths.map((district) => {
            const isHovered = hoveredDistrict === district.name;
            const liveFill = getDistrictFill(district.name, districtData, isHovered, district.color);
            const fill = liveFill ?? `url(#mmap-grad-${district.name.replace(/\s/g, '')})`;

            // Stroke color based on status
            const liveInfo = districtData?.get(district.name.toLowerCase());
            const strokeColor = isHovered
              ? (liveInfo ? STATUS_COLORS[liveInfo.status] : district.color)
              : 'rgba(148, 163, 184, 0.4)';

            return (
              <g key={district.name}>
                <path
                  d={district.path}
                  fill={fill}
                  stroke={strokeColor}
                  strokeWidth={isHovered ? 2.4 : 1.4}
                  strokeLinejoin="round"
                  style={{
                    cursor: 'pointer',
                    transition: 'fill 0.4s ease, stroke 0.2s ease, filter 0.2s ease',
                    filter: isHovered
                      ? `drop-shadow(0 0 10px ${strokeColor}88)`
                      : 'none',
                  }}
                  onMouseEnter={() => handleMouseEnter(district.name)}
                  onMouseMove={(e) => handleMouseMove(e, district)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleDistrictClick(district.name)}
                  onKeyDown={(e) => handleKeyDown(e, district.name)}
                  tabIndex={0}
                  role="button"
                  aria-label={`${district.name} district`}
                />
                {/* Label */}
                <text
                  x={district.centroid[0]}
                  y={district.centroid[1]}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={isHovered ? '#fff' : 'rgba(30, 30, 60, 0.8)'}
                  fontSize={isHovered ? '8' : '6.5'}
                  fontWeight={isHovered ? '700' : '400'}
                  fontFamily="Inter, sans-serif"
                  style={{ pointerEvents: 'none', userSelect: 'none', transition: 'all 0.25s ease' }}
                >
                  {district.name}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      {/* Enhanced Tooltip */}
      <div
        className={`map-tooltip${tooltip.visible ? ' visible' : ''}`}
        style={{ left: tooltip.x, top: tooltip.y }}
      >
        {/* District Name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {tooltip.status && (
            <div style={{
              width: 9, height: 9, borderRadius: '50%',
              background: STATUS_COLORS[tooltip.status] || '#6c757d',
              flexShrink: 0,
            }} />
          )}
          <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.875rem' }}>
            {tooltip.name}
          </span>
        </div>

        {/* Division */}
        <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: 2, marginLeft: tooltip.status ? 17 : 0 }}>
          {tooltip.division} Division
        </div>

        {/* Live blood data */}
        {tooltip.totalUnits !== null && (
          <div style={{
            marginTop: 8,
            paddingTop: 8,
            borderTop: '1px solid rgba(255,255,255,0.12)',
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
          }}>
            <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>
              🩸 <strong style={{ color: '#fff' }}>{tooltip.totalUnits.toLocaleString('en-IN')}</strong> units available
            </div>
            <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>
              🏥 <strong style={{ color: '#fff' }}>{tooltip.bloodBanks}</strong> blood banks
            </div>
            <div style={{
              fontSize: '0.68rem',
              fontWeight: 700,
              letterSpacing: '0.05em',
              color: STATUS_COLORS[tooltip.status] || '#6c757d',
              marginTop: 2,
            }}>
              {STATUS_LABELS[tooltip.status]}
            </div>
          </div>
        )}
        {tooltip.totalUnits === null && tooltip.visible && (
          <div style={{ marginTop: 6, fontSize: '0.72rem', color: '#64748b' }}>
            Loading availability...
          </div>
        )}
      </div>
    </div>
  );
}
