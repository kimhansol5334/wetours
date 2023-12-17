import React, { FC, useState } from 'react';
import { useUserInfo } from '../hooks/useUserInfo';
import { useReviewOnTour } from '../hooks/useReviewsOnTour';
import axios from 'axios';
import { useAppDispatch } from '../hooks/useTypeSelector';
import { postReview } from '../features/reviews/postReview';
import { RatingModalProps } from '../models/PropsModel';

const RatingModal: FC<RatingModalProps> = ({ isRatingModalOpen, setIsRatingModalOpen, review }) => {
  const dispatch = useAppDispatch();
  const { userInfo } = useUserInfo();
  const { tourId } = useReviewOnTour();
  const [rating, setRating] = useState(1);
  const userId = userInfo?.data.user._id;

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRating = parseFloat(event.target.value);
    setRating(newRating);
  };

  const offRatingModal = () => {
    setIsRatingModalOpen(false);
  };

  const handlePostReview = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/reviews/review-exists/${tourId}/${userId}`, {
        withCredentials: true,
      });
      if (response.data.exists) {
        alert('You have already reviewed this tour.');
      } else {
        if (review == '') {
          alert('there is no comment here');
        }
        dispatch(postReview({ tour: tourId, user: userId, rating: rating, review: review }));
        window.location.reload();
      }
    } catch (error) {
      console.error('Error checking review existence', error);
    }
  };
  if (!isRatingModalOpen) return null;
  return (
    <div className=" fixed z-999 h-[100vh] top-0 left-0 bottom-0 right-0 bg-gray-300/60 ">
      <div className="fixed flex flex-col justify-around items-center z-1000  h-[30%] w-[30%]  p-10  top-1/3 left-1/2 bg-white opacity-100 -translate-x-1/2 traslate-y-1/2 ">
        <button className="fixed z-1000 top-2 right-2" onClick={offRatingModal}>
          x
        </button>
        <div className="flex flex-col items-center">
          <div className="mb-5 text-xl font-medium bg-gradient-to-r from-end to-start gradient-text">
            Rate your experience
          </div>
          <input
            type="range"
            min="1"
            max="5"
            step="0.1"
            value={rating}
            onChange={handleSliderChange}
            className=" h-2 w-full bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="text-lg font-semibold mt-2">{rating.toFixed(1)} ★</div>
        </div>
        <button
          onClick={handlePostReview}
          className="h-10 mt-5 px-6  bg-gray-400 text-white text-sm font-light opacity-90 rounded-full hover:shadow-custom hover:-translate-y-0.5"
        >
          POST
        </button>
      </div>
    </div>
  );
};

export default RatingModal;
