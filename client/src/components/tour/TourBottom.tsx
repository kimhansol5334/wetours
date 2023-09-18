import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { TourData } from '../../models/tourModels';

interface TourProps {
  tour: TourData;
}

const TourBottom: FC<TourProps> = ({ tour }) => {
  return (
    <div className="bg-[#F7F7F7] px-5 py-4 flex justify-between items-center">
      <div>
        <div>
          <span className="font-medium text-sm text-gray-500">${tour.price} </span>
          <span className="text-xs text-gray-400 font-light">per person</span>
        </div>
        <div>
          <span className="font-medium text-sm text-gray-500">{tour.ratingsAverage} </span>
          <span className="text-xs text-gray-400 font-light">rating</span>
          <span className=" text-sm text-gray-400 font-light">({tour.ratingsQuantity})</span>
        </div>
      </div>
      <div>
        <Link
          to={`/tour/${tour.slug}`}
          state={tour._id}
          className="bg-green-500 opacity-80 px-6 py-3 text-white text-sm font-light rounded-3xl hover:shadow-custom hover:-translate-y-0.5"
        >
          DETAILS
        </Link>
      </div>
    </div>
  );
};

export default TourBottom;
