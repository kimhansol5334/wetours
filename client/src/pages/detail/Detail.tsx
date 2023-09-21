import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/useTypeSelector';
import { getTourById } from '../../features/tours/tourUnitSlice';
import logo from '../assets/img/logo-white.png';
import DetailFirstContainer from './DetailFirstContainer';
import { TourData } from '../../models/tourModels';
import DetailSecondContainer from './DetailSecondContainer';

interface TourProps {
  tour: TourData | undefined;
}

const Details: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { state } = location;

  const id = state;

  useEffect(() => {
    dispatch(getTourById(id));
  }, [dispatch]);

  const { data, error, loading } = useAppSelector((state) => state.tour);
  const tour = data?.data?.data;

  return (
    <div>
      <DetailFirstContainer tour={tour} />
      <DetailSecondContainer tour={tour} />
    </div>
  );
};

export default Details;
