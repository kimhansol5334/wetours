import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/useTypeSelector';
import { getAllTours } from '../features/tours/tourSlice';
import Tour from '../components/tour/Tour';

const Main = () => {
  const dispatch = useAppDispatch();
  const MemoizedTour = React.memo(Tour);

  useEffect(() => {
    dispatch(getAllTours());
  }, [dispatch]);

  const { data, error, loading } = useAppSelector((state) => state.tours);

  const tours = data?.data.data;

  console.log(data);

  return (
    <div className=" p-20 grid md:grid-cols-3 md:gap-14 bg-[#F7F7F7]">
      {loading ? (
        <div> loading ....</div>
      ) : (
        data &&
        tours?.map((tour) => (
          <div className=" border  " key={tour._id}>
            <MemoizedTour tour={tour} />
          </div>
        ))
      )}
    </div>
  );
};

export default Main;
