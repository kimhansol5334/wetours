import React, { FC } from 'react';
import { useMapBox } from '../../hooks/useMapBox';
import { TourProps } from '../../models/tourModels';

const DetailMapContainer: FC<TourProps> = ({ tour }) => {
  const { mapContainer } = useMapBox({ startLocation: tour.startLocation });
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
