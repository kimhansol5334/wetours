import React, { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/useTypeSelector';
import { getUserById } from '../../features/users/userUnitSlice';
import { TourData } from '../../models/tourModels';

interface DetailProps {
  tour: TourData;
  slug: string;
}

const DetailReviewContainer: FC<DetailProps> = ({ tour, slug }) => {
  return (
    <div className="relative inline-block h-[120vh] w-full p-24 leading-5">
      <img
        src={`${process.env.PUBLIC_URL}/img/${tour?.images[1]}`}
        alt="test"
        className="absolute h-full w-full top-0 left-0 object-cover z-[-1] overflow-hidden"
      />
      <div className="absolute h-full w-full top-0 left-0 z-[-1]  bg-gradient-to-r from-gray-100 to-gray-200 opacity-80"></div>
      <div className="block text-center">
        <div className="mb-10 text-3xl font-semibold tracking-widest bg-gradient-to-r from-start to-end gradient-text">
          WE MAKE PEOPLE GENUINELY HAPPY
        </div>
        {tour?.reviews.slice(0, 3).map((review) => (
          <div key={review.id} className="flex items-center h-40 p-10 mb-6 bg-default shadow-2xl opacity-60 -skew-x-12">
            <img
              src={`${process.env.PUBLIC_URL}/img/${review.user.photo}`}
              alt="profile"
              className="h-full mr-4 rounded-full skew-x-12"
            ></img>
            <div className="skew-x-12">{review.review}</div>
          </div>
        ))}
        <Link to={`/tour/${slug}/reviews`} state={{ tourId: tour._id }}>
          View All Reviews
        </Link>
      </div>
    </div>
  );
};

export default DetailReviewContainer;
