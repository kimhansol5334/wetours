import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useTypeSelector';
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { getAllReviewsOnTour, setPage } from '../features/reviews/reviewOnTour';

const Review = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const currentPath = location.pathname;
  const tourId = location.state?.tourId;
  const [searchParams] = useSearchParams();
  const pageNo = parseInt(searchParams.get('page') || '1');

  console.log(tourId);

  useEffect(() => {
    dispatch(getAllReviewsOnTour({ id: tourId, page: pageNo }));
  }, [pageNo, dispatch]);

  const handlePageChange = (page: number, event: React.MouseEvent) => {
    event.preventDefault();

    dispatch(setPage(page));
    let queryParams = '';
    if (page) {
      queryParams += `page=${page}`;
    }

    navigate(`${currentPath}?${queryParams}`, { state: { tourId } });
  };

  const { data, error, loading } = useAppSelector((state) => state.reviews);
  const reviews = data?.data?.data;

  return (
    <div className="relative p-20">
      <img className="absolute h-full top-0 left-0 opacity-60" src={`${process.env.PUBLIC_URL}/img/tour-1-1.jpg`}></img>
      {reviews?.map((review) => (
        <div key={review.id} className="flex items-center h-40 mb-6 p-10 bg-default shadow-2xl opacity-60  -skew-x-12">
          <img
            src={`${process.env.PUBLIC_URL}/img/${review.user.photo}`}
            alt="profile"
            className="h-full mr-4 rounded-full skew-x-12"
          ></img>
          <div className="skew-x-12">{review.review}</div>
        </div>
      ))}
      <div>
        <button
          onClick={(event) => handlePageChange(1, event)}
          className="relative m-3 p-3 z-10 border border-red-300"
          value="1"
        >
          1
        </button>
        <button
          onClick={(event) => handlePageChange(2, event)}
          className="relative m-3 p-3 z-10 border border-red-300"
          value="2"
        >
          2
        </button>
        <button
          onClick={(event) => handlePageChange(3, event)}
          className="relative m-3 p-3 z-10 border border-red-300"
          value="3"
        >
          3
        </button>
      </div>
    </div>
  );
};

export default Review;
