import React, { useState } from 'react';
import { format } from 'date-fns';
import { useAppDispatch, useAppSelector } from '../hooks/useTypeSelector';
import { useNavigate } from 'react-router-dom';
import { postReview } from '../features/reviews/postReview';
import { useReviewOnTour } from '../hooks/useReviewsOnTour';
import { useUserInfo } from '../hooks/useUserInfo';

const Review = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userInfo } = useUserInfo();
  const userId = userInfo?.data.user._id;
  const { reviews, error, loading, tourId, currentPath } = useReviewOnTour();
  const [review, setReview] = useState('');

  const handlePageChange = (page: number, event: React.MouseEvent) => {
    event.preventDefault();

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

  return (
    <div className="relative h-[180vh] p-20">
      <img className="absolute h-full top-0 left-0 opacity-20" src={`${process.env.PUBLIC_URL}/img/tour-1-1.jpg`}></img>
      {reviews?.map((review) => (
        <div
          key={review.id}
          className="flex items-center h-28 w-[60%] mb-6 p-10 bg-default shadow-2xl opacity-80 border border-gray-300 -skew-x-12"
        >
          <img
            src={`${process.env.PUBLIC_URL}/img/${review.user.photo}`}
            alt="profile"
            className="w-12 mr-4 rounded-full skew-x-12 border border-green-400"
          ></img>
          <div className="skew-x-12">{review.review}</div>
          <div className="absolute flex-all-center right-5 bottom-2">
            <p className="mr-5 text-gray-600">{review.user.name}</p>
            <p className="text-gray-500 text-xs">{format(new Date(review.createdAt), 'MMM d')}</p>
          </div>
        </div>
      ))}
      <div>
        <button
          onClick={(event) => handlePageChange(1, event)}
          className="relative m-3 p-3 z-10 bg-default text-black border "
          value="1"
        >
          1
        </button>
        <button
          onClick={(event) => handlePageChange(2, event)}
          className="relative m-3 p-3 z-10 border bg-default text-black "
          value="2"
        >
          2
        </button>
        <button
          onClick={(event) => handlePageChange(3, event)}
          className="relative m-3 p-3 z-10 border bg-default text-black"
          value="3"
        >
          3
        </button>
      </div>
      <div className="absolute h-[200px] w-[80%] bottom-10 m-4 p-5 bg-default opacity-80">
        <div className="mb-10 bg-gradient-to-r from-start to-end gradient-text text-3xl text-center font-semibold tracking-widest">
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
