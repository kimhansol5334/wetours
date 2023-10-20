import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './useTypeSelector';
import { getAllTours } from '../features/tours/tourSlice';

export const useTours = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllTours());
  }, [dispatch]);

  const { data, error, loading } = useAppSelector((state) => state.tours);
  const tours = data?.data.data;

  return { tours, error, loading };
};
