import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { TourData } from '../../models/tourModels';

interface DetailProps {
  tour: TourData;
  slug: string;
}

const DetailReviewContainer: FC<DetailProps> = ({ tour, slug }) => {
  return (
    <div className="relative h-[150vh] w-full p-24 leading-5">
      <img
        src={`${process.env.PUBLIC_URL}/img/${tour?.images[1]}`}
        alt="test"
        className="absolute h-full w-full top-0 left-0 object-cover z-[-1] overflow-hidden"
      />
      <div className="absolute h-full w-full top-0 left-0 z-[-1]  bg-gradient-to-r from-gray-100 to-gray-200 opacity-90"></div>
      <div className="absolute left-1/4">
        <div className="mb-16 text-3xl font-semibold tracking-widest bg-gradient-to-r from-start to-end gradient-text">
          WE MAKE PEOPLE GENUINELY HAPPY
        </div>
        {tour?.reviews.slice(0, 3).map((review) => (
          <div
            key={review.id}
            className="relative flex items-center h-50 w-[80%] mb-16 p-10 bg-white shadow-2xl opacity-70 -skew-x-12"
          >
            <img
              src={`${process.env.PUBLIC_URL}/img/${review.user.photo}`}
              alt="profile"
              className="w-12 mr-4 border border-green-400 rounded-full skew-x-12 shadow-xl"
            ></img>
            <div className="skew-x-12">{review.review}</div>
            <div className="absolute text-gray-500 text-xs bottom-2 right-5">{review.user.name}</div>
          </div>
        ))}
        <Link
          to={`/tour/${slug}/reviews`}
          state={{ tourId: tour._id }}
          className="inline-block mt-5 px-6 py-3 text-green-500 font-light tracking-wider underline underline-offset-8 hover:-translate-y-1 hover:bg-green-500 hover:text-white"
        >
          Read all stories →
        </Link>
      </div>
    </div>
  );
};

export default DetailReviewContainer;
