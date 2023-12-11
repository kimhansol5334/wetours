import React from 'react';
import { useEffect } from 'react';
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './useTypeSelector';
import { getAllReviewsOnTour } from '../features/reviews/reviewOnTour';

type ReviewOnTourProps = {
  id: string;
  page: number;
};

export const useReviewOnTour = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const tourId = location.state?.tourId;
  const currentPath = location.pathname;
  const pageNo = parseInt(searchParams.get('page') || '1');

  useEffect(() => {
    dispatch(getAllReviewsOnTour({ id: tourId, page: pageNo }));
  }, [pageNo, dispatch]);

  const { data: reviewInfo, error, loading } = useAppSelector((state) => state.reviews);
  const reviews = reviewInfo?.data?.data;

  return { reviews, error, loading, tourId, currentPath };
};
