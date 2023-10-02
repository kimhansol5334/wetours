import React, { FC } from 'react';
import TourImage from './TourImage';
import TourCenter from './TourCenter';
import TourBottom from './TourBottom';
import { TourProps } from '../../models/tourModels';

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
