import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useTypeSelector';
import { useLocation, useSearchParams, useNavigate } from 'react-router-dom';
import { getAllReviewsOnTour, setPage } from '../features/reviews/reviewOnTour';
import { postReview } from '../features/reviews/postReview';

const Review = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const currentPath = location.pathname;
  const tourId = location.state?.tourId;
  const pageNo = parseInt(searchParams.get('page') || '1');
  const { data: userInfo } = useAppSelector((state) => state.trylogin);
  const userId = userInfo?.data.user._id;

  const [review, setReview] = useState('');

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

  const handleReview = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReview(e.target.value);
  };

  const handlePostReview = () => {
    dispatch(postReview({ tour: tourId, user: userId, rating: 5, review: review }));
  };

  const { data: reviewInfo, error, loading } = useAppSelector((state) => state.reviews);
  const reviews = reviewInfo?.data?.data;

  return (
    <div className="relative p-20 h-[180vh]">
      <img className="absolute h-full top-0 left-0 opacity-20" src={`${process.env.PUBLIC_URL}/img/tour-1-1.jpg`}></img>
      {reviews?.map((review) => (
        <div
          key={review.id}
          className="flex w-[60%] items-center h-40 mb-6 p-10 bg-default shadow-2xl opacity-80 outline outline-green-400  -skew-x-12"
        >
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
          className="relative m-3 p-3 z-10 border bg-default text-black rounded-full outline-green-400 outline outline-4"
          value="1"
        >
          1
        </button>
        <button
          onClick={(event) => handlePageChange(2, event)}
          className="relative m-3 p-3 z-10 border bg-default text-black rounded-full outline-green-400 outline outline-4"
          value="2"
        >
          2
        </button>
        <button
          onClick={(event) => handlePageChange(3, event)}
          className="relative m-3 p-3 z-10 border bg-default text-black rounded-full outline-green-400 outline outline-4"
          value="3"
        >
          3
        </button>
      </div>
      <div className="absolute m-4 p-5 h-[200px] w-[80%] opacity-80 bottom-10  bg-default">
        <div className="mb-10 text-3xl text-center font-semibold tracking-widest bg-gradient-to-r from-start to-end gradient-text">
          LEAVE YOUR COMMENT!!
        </div>
        <input
          className="w-[70%] h-[20%] m-5 p-5 bg-default border border-black"
          value={review}
          onChange={handleReview}
        ></input>
        <button
          onClick={handlePostReview}
          className="mt-5 px-6 py-3 bg-green-500 text-white text-sm font-light opacity-90 rounded-full hover:shadow-custom hover:-translate-y-0.5"
        >
          POST
        </button>
      </div>
    </div>
  );
};

export default Review;
