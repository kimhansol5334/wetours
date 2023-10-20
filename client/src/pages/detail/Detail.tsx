import React from 'react';
import { useLocation } from 'react-router-dom';
import { useTourDetail } from '../../hooks/useTourDetail';
import DetailFirstContainer from './DetailFirstContainer';
import DetailSecondContainer from './DetailSecondContainer';
import DetailThirdContainer from './DetailThirdContainer';
import DetailFourthContainer from './DetailFourthContainer';
import DetailReviewContainer from './DetailReviewContainer';
import DetailBookingContainer from './DetailBookingContainer';
import DetailMapContainer from './DetailMapContainer';
import logo from '../../assets/img/logo-white.png';

const Detail: React.FC = () => {
  const location = useLocation();
  const { id, slug } = location.state;
  const { tour, error, loading } = useTourDetail(id);

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
