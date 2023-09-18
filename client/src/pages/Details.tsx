import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/useTypeSelector';
import { getTourById } from '../features/tours/tourUnitSlice';

const Details: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { state } = location;

  const id = state;

  useEffect(() => {
    dispatch(getTourById(id));
  }, [dispatch]);

  const { data, error, loading } = useAppSelector((state) => state.tour);

  return (
    <div>
      <h1>{data?.data.data.name}</h1>
    </div>
  );
};

export default Details;
