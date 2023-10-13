import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/useTypeSelector';
import { getAllTours } from '../features/tours/tourSlice';
import Tour from '../components/tour/Tour';
import logo from '../assets/img/logo-white.png';

const Main = () => {
  const dispatch = useAppDispatch();
  const MemoizedTour = React.memo(Tour);

  useEffect(() => {
    dispatch(getAllTours());
  }, [dispatch]);

  const { data, error, loading } = useAppSelector((state) => state.tours);
  const tours = data?.data.data;

  return (
    <div className="grid gap-5 p-20 bg-default md:grid-cols-3 md:gap-14">
      {loading ? (
        <div className="h-[100vh] bg-default"></div>
      ) : (
        data &&
        tours?.map((tour) => (
          <div className="shadow-2xl" key={tour._id}>
            <MemoizedTour tour={tour} />
          </div>
        ))
      )}
    </div>
  );
};

export default Main;
