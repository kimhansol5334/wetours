import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './useTypeSelector';
import { bookingOnTour } from '../features/bookings/bookingSlice';

export const useBooking = (id: string) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(bookingOnTour({ id: id }));
  }, [dispatch, id]);

  const { data, error, loading } = useAppSelector((state) => state.booking);

  return { data, error, loading };
};
