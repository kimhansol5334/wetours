import React, { useRef, useState, useEffect, FC } from 'react';
import mapboxgl from 'mapbox-gl';
import { TourProps } from '../../models/tourModels';

mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`;

const DetailMapContainer: FC<TourProps> = ({ tour }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [zoom, setZoom] = useState(4);

  useEffect(() => {
    const [lng, lat] = tour.startLocation.coordinates;
    if (!mapContainer.current || map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [lng, lat],
      zoom: zoom,
    });

    map.current.on('load', () => {
      new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map.current!);
    });
  }, [tour]);

  return (
    <div>
      <div
        ref={mapContainer}
        className="map-container transform -skew-y-6 origin-top-left"
        style={{ width: '100%', height: '500px' }}
      />
    </div>
  );
};

export default DetailMapContainer;
