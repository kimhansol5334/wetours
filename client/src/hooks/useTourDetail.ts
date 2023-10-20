import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './useTypeSelector';
import { getTourById } from '../features/tours/tourUnitSlice';

export const useTourDetail = (id: string) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTourById(id));
  }, [dispatch, id]);

  const { data, error, loading } = useAppSelector((state) => state.tour);
  const tour = data?.data?.data;

  return { tour, error, loading };
};
