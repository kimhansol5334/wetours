import React, { FC, useCallback } from 'react';
import { TourProps } from '../../models/tourModels';
import { useBooking } from '../../hooks/useBooking';

const DetailBookingContainer: FC<TourProps> = ({ tour }) => {
  const id = tour._id;

  const { data, error, loading } = useBooking(id);

  const handleBooking = useCallback(() => {
    window.open(data?.session.url, '_blank', 'noopener, noreferrer');
  }, []);

  return (
    <div className="flex-all-center relative h-[80vh] bg-default overflow-hidden">
      <img
        src={`${process.env.PUBLIC_URL}/img/${tour?.images[0]}`}
        className="absolute h-full w-full object-cover"
      ></img>
      <div className=" absolute -left-20 h-full w-3/5  bg-white opacity-80 -skew-x-12"></div>
      <div className="flex-all-center h-[30%] w-[50%] p-5 bg-white shadow-2xl z-10">
        <div className="mr-5">
          <div className="mr-5 mb-2 bg-gradient-to-r from-start to-end gradient-text text-xl tracking-wider">
            WHAT ARE YOU WAITING FOR?
          </div>
          <div className="text-gray-500 font-light">${tour.price}. Infinite memories. Make it yours today!</div>
        </div>

        <button
          className="px-6 py-2 bg-green-500 text-white text-sm font-light opacity-90 rounded-full hover:shadow-custom hover:-translate-y-0.5"
          onClick={handleBooking}
        >
          BOOK TOUR NOW!
        </button>
      </div>
    </div>
  );
};

export default DetailBookingContainer;
