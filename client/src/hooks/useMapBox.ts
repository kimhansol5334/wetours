import { useRef, useState, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`;

type MapBoxProps = {
  startLocation: {
    coordinates: [number, number];
  };
};

export const useMapBox = ({ startLocation }: MapBoxProps) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [zoom, setZoom] = useState(4);

  useEffect(() => {
    const [lng, lat] = startLocation.coordinates;
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

    return () => {
      map.current?.remove();
    };
  }, [startLocation]);

  return {
    mapContainer,
  }; // setZoom(for the Zooming feature)
};
