import React,{useEffect} from 'react'
import { useAppSelector, useAppDispatch } from '../hooks/useTypeSelector';
import { getAllTours } from '../features/tours/tourSlice'
import Tour from '../components/Tour';

const Main = () => {
  const dispatch = useAppDispatch();
  const MemoizedTour = React.memo(Tour);


  useEffect(() => {
    dispatch(getAllTours());
  }, [dispatch]);

  const { data, error, loading } = useAppSelector((state) => state.tours);

  console.log(data);

  return (
    <div className=" p-5 grid grid-cols-3 gap-4">
    {loading ? (
      <div> loading ....</div>
    ) : (
      data &&
      data.data.data.map((tour) => (
        <div className=" border  " key={tour._id}>
          <MemoizedTour tour={tour}/>
        </div>
      ))
    )}
  </div>
  )
}

export default Main