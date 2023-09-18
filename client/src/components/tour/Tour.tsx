import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import TourImage from './TourImage';
import TourCenter from './TourCenter';
import TourBottom from './TourBottom';
import { TourData } from '../../models/tourModels';

interface TourProps {
  tour: TourData;
}

const Tour: FC<TourProps> = ({ tour }) => {
  return (
    <div className="bg-white">
      <TourImage tour={tour} />
      <TourCenter tour={tour} />
      <TourBottom tour={tour} />
    </div>
  );
};

export default Tour;
