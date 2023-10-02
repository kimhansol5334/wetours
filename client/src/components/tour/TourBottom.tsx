import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { TourProps } from '../../models/tourModels';

const TourBottom: FC<TourProps> = ({ tour }) => {
  return (
    <div className="flex justify-between items-center px-7 py-5 bg-default">
      <div>
        <div>
          <span className="text-sm text-gray-500 font-medium">${tour.price} </span>
          <span className="text-xs text-gray-400 font-light">per person</span>
        </div>
        <div>
          <span className="text-sm text-gray-500 font-medium">{tour.ratingsAverage} </span>
          <span className="text-xs text-gray-400 font-light">rating</span>
          <span className="text-sm text-gray-400 font-light">({tour.ratingsQuantity})</span>
        </div>
      </div>
      <div>
        <Link
          to={`/tour/${tour.slug}`}
          state={{ id: tour._id, slug: tour.slug }}
          className="px-6 py-3 bg-green-500 opacity-80 text-white text-sm font-light rounded-3xl hover:shadow-custom hover:-translate-y-0.5"
        >
          DETAILS
        </Link>
      </div>
    </div>
  );
};

export default TourBottom;
