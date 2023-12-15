import React, { useState } from 'react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { useReviewOnTour } from '../hooks/useReviewsOnTour';
import { useUserInfo } from '../hooks/useUserInfo';
import useInputHandler from '../hooks/useInputHandler';
import RatingModal from '../components/RatingModal';

const Review = () => {
  const navigate = useNavigate();
  const { userInfo } = useUserInfo();
  const { reviews, error, loading, tourId, currentPath } = useReviewOnTour();
  const [review, handleReview] = useInputHandler('');
  const userImage = userInfo?.data.user.photo;
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);

  const handlePageChange = (page: number, event: React.MouseEvent) => {
    event.preventDefault();

    let queryParams = '';
    if (page) {
      queryParams += `page=${page}`;
    }

    navigate(`${currentPath}?${queryParams}`, { state: { tourId } });
  };

  const handleRatingModal = () => {
    setIsRatingModalOpen(true);
  };

  return (
    <div className="relative h-[130vh] p-20">
      <div className="absolute h-full w-full bottom-0 left-0  bg-green-400 opacity-30 "></div>
      <img
        className="absolute h-full top-0 left-0 opacity-20"
        src={`${process.env.REACT_APP_SERVER_URL}/public/img/tours/tour-4-cover.jpg`}
      ></img>
      {reviews?.map((review) => (
        <div
          key={review.id}
          className="flex items-center h-28 w-[60%] mb-6 p-10 bg-default shadow-2xl opacity-80 border border-gray-300 -skew-x-12"
        >
          <div className="absolute top-2 right-2 text-sm">{review.rating}★</div>
          <img
            src={`${process.env.REACT_APP_SERVER_URL}/public/img/users/${review.user.photo}`}
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
      <div className="flex-all-center h-[200px] w-[80%] opacity-80">
        <img
          src={`${process.env.REACT_APP_SERVER_URL}/public/img/users/${userImage}`}
          className="h-12 w-12 mr-2 rounded-full"
        ></img>
        <input
          className="w-[70%] h-[20%] bg-transparent m-5 p-5 border-b border-black focus:outline-none focus:border-pink-400"
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
