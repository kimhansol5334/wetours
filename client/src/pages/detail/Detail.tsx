import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/useTypeSelector';
import { getTourById } from '../../features/tours/tourUnitSlice';
import DetailFirstContainer from './DetailFirstContainer';
import DetailSecondContainer from './DetailSecondContainer';
import DetailThirdContainer from './DetailThirdContainer';
import DetailFourthContainer from './DetailFourthContainer';
import DetailReviewContainer from './DetailReviewContainer';
import DetailBookingContainer from './DetailBookingContainer';
import logo from '../../assets/img/logo-white.png';
import DetailMapContainer from './DetailMapContainer';

const Detail: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { id, slug } = location.state;

  useEffect(() => {
    dispatch(getTourById(id));
  }, [dispatch]);

  const { data, error, loading } = useAppSelector((state) => state.tour);
  const tour = data?.data?.data;

  return (
    <div>
      {loading ? (
        <div className="flex-all-center h-[100vh] bg-default">
          <img src={logo}></img>
        </div>
      ) : (
        <div>
          {tour ? (
            <>
              <DetailFirstContainer tour={tour} />
              <DetailSecondContainer tour={tour} />
              <DetailMapContainer tour={tour} />
              <DetailThirdContainer tour={tour} />
              <DetailFourthContainer />
              <DetailReviewContainer tour={tour} slug={slug} />
              <DetailBookingContainer tour={tour} />
            </>
          ) : (
            <div>No data available</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Detail;
