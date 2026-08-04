/**
 * GeoJSON to SVG Path Converter
 *
 * Converts GeoJSON polygon/multipolygon coordinates into SVG path strings
 * using a Mercator-like projection. This preserves the accurate district
 * boundaries from the GeoJSON data without any approximation.
 */

/**
 * Compute the bounding box of all coordinates in a FeatureCollection
 */
export function computeBBox(features) {
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;

  for (const feature of features) {
    const geometry = feature.geometry;
    let coordSets = [];

    if (geometry.type === 'Polygon') {
      coordSets = [geometry.coordinates];
    } else if (geometry.type === 'MultiPolygon') {
      coordSets = geometry.coordinates;
    }

    for (const polygon of coordSets) {
      for (const ring of polygon) {
        for (const coord of ring) {
          const [lon, lat] = coord;
          if (lon < minX) minX = lon;
          if (lon > maxX) maxX = lon;
          if (lat < minY) minY = lat;
          if (lat > maxY) maxY = lat;
        }
      }
    }
  }

  return { minX, minY, maxX, maxY };
}

/**
 * Project a geographic coordinate (longitude, latitude) to SVG coordinates.
 */
export function projectCoordinate(lon, lat, bbox, config) {
  const { width, height, padding } = config;
  const drawWidth = width - 2 * padding;
  const drawHeight = height - 2 * padding;

  const scaleX = drawWidth / (bbox.maxX - bbox.minX);
  const scaleY = drawHeight / (bbox.maxY - bbox.minY);
  const scale = Math.min(scaleX, scaleY);

  const offsetX = padding + (drawWidth - (bbox.maxX - bbox.minX) * scale) / 2;
  const offsetY = padding + (drawHeight - (bbox.maxY - bbox.minY) * scale) / 2;

  const x = (lon - bbox.minX) * scale + offsetX;
  const y = (bbox.maxY - lat) * scale + offsetY;

  return [Math.round(x * 100) / 100, Math.round(y * 100) / 100];
}

/**
 * Convert a single ring (array of coordinates) to an SVG path segment
 */
function ringToPath(ring, bbox, config) {
  if (ring.length === 0) return '';

  const parts = [];

  for (let i = 0; i < ring.length; i++) {
    const [lon, lat] = ring[i];
    const [x, y] = projectCoordinate(lon, lat, bbox, config);

    if (i === 0) {
      parts.push(`M${x},${y}`);
    } else {
      parts.push(`L${x},${y}`);
    }
  }

  parts.push('Z');
  return parts.join(' ');
}

/**
 * Convert a GeoJSON feature (Polygon or MultiPolygon) to an SVG path string
 */
export function featureToSvgPath(feature, bbox, config) {
  const geometry = feature.geometry;
  const pathParts = [];

  if (geometry.type === 'Polygon') {
    for (const ring of geometry.coordinates) {
      pathParts.push(ringToPath(ring, bbox, config));
    }
  } else if (geometry.type === 'MultiPolygon') {
    for (const polygon of geometry.coordinates) {
      for (const ring of polygon) {
        pathParts.push(ringToPath(ring, bbox, config));
      }
    }
  }

  return pathParts.join(' ');
}

/**
 * Compute the centroid of a feature for label positioning
 */
export function featureCentroid(feature, bbox, config) {
  const geometry = feature.geometry;
  let totalX = 0,
    totalY = 0,
    count = 0;

  let coordSets = [];

  if (geometry.type === 'Polygon') {
    coordSets = [geometry.coordinates];
  } else if (geometry.type === 'MultiPolygon') {
    coordSets = geometry.coordinates;
  }

  for (const polygon of coordSets) {
    const ring = polygon[0];
    for (const coord of ring) {
      const [x, y] = projectCoordinate(coord[0], coord[1], bbox, config);
      totalX += x;
      totalY += y;
      count++;
    }
  }

  if (count === 0) return [0, 0];
  return [totalX / count, totalY / count];
}
