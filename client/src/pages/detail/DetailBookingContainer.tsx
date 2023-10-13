import React, { FC, useEffect } from 'react';
import { TourProps } from '../../models/tourModels';
import { useAppSelector, useAppDispatch } from '../../hooks/useTypeSelector';
import { bookingOnTour } from '../../features/bookings/bookingSlice';

const DetailBookingContainer: FC<TourProps> = ({ tour }) => {
  const dispatch = useAppDispatch();
  const { data, error, loading } = useAppSelector((state) => state.booking);
  const id = tour._id;

  useEffect(() => {
    dispatch(bookingOnTour({ id: id }));
  }, [dispatch]);

  const handleBooking = () => {
    window.open(data?.session.url, '_blank', 'noopener, noreferrer');
  };

  return (
    <div className="flex-all-center h-[80vh] bg-default">
      <div className="flex-all-center h-[30%] w-[50%] p-5 bg-white shadow-2xl">
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
