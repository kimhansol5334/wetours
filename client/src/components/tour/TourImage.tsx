import React, { FC } from 'react';
import { TourData } from '../../models/tourModels';

interface TourProps {
  tour: TourData;
}

const TourImage: FC<TourProps> = ({ tour }) => {
  return (
    <div className="h-[200px] w-full tracking-wider leading-5 inline-block relative overflow-hidden">
      <img
        src={`${process.env.PUBLIC_URL}/img/${tour.imageCover}`}
        alt="test"
        className="h-full w-full object-cover transform -skew-y-6 origin-top-left"
      />
      <div className="w-full h-full absolute bottom-0 left-0 bg-gradient-to-r from-green-200 to-green-300 opacity-50 transform -skew-y-6 origin-top-left"></div>
      <div className="p-3 font-light text-lg bg-green-600 opacity-70 text-white absolute bottom-4 right-4">
        {tour.name}
      </div>
    </div>
  );
};

export default TourImage;
