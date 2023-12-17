import React, { useState } from 'react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useReviewOnTour } from '../hooks/useReviewsOnTour';
import { useUserInfo } from '../hooks/useUserInfo';
import useInputHandler from '../hooks/useInputHandler';
import RatingModal from '../components/RatingModal';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useTypeSelector';
import { getAllReviews } from '../features/reviews/allReviewSlice';

const Review = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data } = useAppSelector((state) => state.allreviews);
  const { userInfo } = useUserInfo();
  const { reviews, loading, tourId, currentPath } = useReviewOnTour();
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [review, handleReview] = useInputHandler('');
  const dataLength = data?.results || 0;
  const userImage = userInfo?.data.user.photo;

  useEffect(() => {
    dispatch(getAllReviews({ id: tourId }));
  }, []);

  useEffect(() => {
    let queryParams = '';

    queryParams += `page=${pageNumber}`;

    navigate(`${currentPath}?${queryParams}`, { state: { tourId } });
  }, [pageNumber]);

  const handlePageUp = (event: React.MouseEvent) => {
    event.preventDefault();
    setPageNumber(pageNumber + 1);
  };

  const handlePageDown = (event: React.MouseEvent) => {
    event.preventDefault();
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const handleRatingModal = () => {
    if (review == '') {
      alert('there is no comment!');
    } else setIsRatingModalOpen(true);
  };

  return (
    <div className="relative h-[140vh] p-20">
      <div className="absolute h-full w-full bottom-0 left-0  bg-green-400 opacity-30 "></div>
      <img
        className="absolute h-full top-0 left-0 opacity-20"
        src={`${process.env.REACT_APP_SERVER_URL}/public/img/tours/tour-4-cover.jpg`}
      ></img>

      {loading ? (
        <div className="text-gray-500">loading...</div>
      ) : (
        reviews?.map((review) => (
          <div
            key={review.id}
            className="flex items-center h-32 w-[80%] mb-6 p-10 bg-default shadow-2xl opacity-80 border border-gray-300 -skew-x-12"
          >
            <div className="absolute top-2 right-4 text-sm">{review.rating}★</div>
            <img
              src={`${process.env.REACT_APP_SERVER_URL}/public/img/users/${review.user.photo}`}
              alt="profile"
              className="w-12 h-12 mr-4 rounded-full object-cover  skew-x-12 border border-green-400"
            ></img>
            <div className="skew-x-12">{review.review}</div>
            <div className="absolute flex-all-center right-5 bottom-2">
              <p className="mr-5 text-gray-600">{review.user.name}</p>
              <p className="text-gray-500 text-xs">{format(new Date(review.createdAt), 'MMM d')}</p>
            </div>
          </div>
        ))
      )}
      <div>
        {pageNumber > 1 && (
          <button
            onClick={handlePageDown}
            className="relative m-3 p-3 z-10 bg-none text-green-800 border border-none text-xl"
            value="1"
          >
            ← PREV
          </button>
        )}
        {pageNumber < dataLength / 5 && (
          <button
            onClick={handlePageUp}
            className="relative m-3 p-3 z-10 bg-none text-green-800 border border-none text-xl"
            value="1"
          >
            NEXT →
          </button>
        )}
      </div>
      <div className="flex-all-center h-[200px] w-[80%] opacity-80">
        <img
          src={`${process.env.REACT_APP_SERVER_URL}/public/img/users/${userImage}`}
          className="h-12 w-12 mr-2 rounded-full"
        ></img>
        <input
          className="w-[70%] h-[20%] m-5 p-5 bg-transparent border-b border-black focus:outline-none focus:border-pink-400"
          value={review}
          onChange={handleReview}
          placeholder="leave your comment.."
        ></input>
        <button
          onClick={handleRatingModal}
          className="h-10 mt-5 px-6  bg-gray-400 text-white text-sm font-light opacity-90 rounded-full hover:shadow-custom hover:-translate-y-0.5"
        >
          POST
        </button>
      </div>
      <RatingModal isRatingModalOpen={isRatingModalOpen} setIsRatingModalOpen={setIsRatingModalOpen} review={review} />
    </div>
  );
};

export default Review;
