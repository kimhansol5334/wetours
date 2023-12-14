import React, { FC } from 'react';
import { TourProps } from '../../models/tourModels';

const TourImage: FC<TourProps> = ({ tour }) => {
  return (
    <div className="relative inline-block h-[200px] w-full tracking-wider leading-5 overflow-hidden">
      <img
        src={`${process.env.REACT_APP_SERVER_URL}/public/img/tours/${tour.imageCover}`}
        alt="test"
        className="h-full w-full object-cover transform -skew-y-6 origin-top-left"
      />
      <div className="absolute h-full w-full left-0 bottom-0 bg-gradient-to-r from-green-200 to-green-300 opacity-50 transform -skew-y-6 origin-top-left"></div>
      <div className="absolute right-4 bottom-4 p-3 bg-green-600 text-lg text-white font-light opacity-70">
        {tour.name}
      </div>
    </div>
  );
};

export default TourImage;
