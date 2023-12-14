import React, { FC } from 'react';
import { TourProps } from '../../models/tourModels';

const DetailSecondContainer: FC<TourProps> = ({ tour }) => {
  return (
    <div className="relative h-[100vh] ">
      <div className="h-[100vh] transform -skew-y-6 origin-top-left bg-default"></div>
      <div className="absolute top-10 right-0 lg:left-1/2 translate-x-[-50%] mt-10 text-black text-3xl text-center font-semibold tracking-widest bg-gradient-to-r from-start to-end gradient-text">
        {tour?.name.toUpperCase()}
      </div>
      <div className="absolute h-[50vh] w-full p-5 lg:flex top-[25vh] lg:left-1/2 lg:translate-x-[-50%] lg:p-16">
        <div className="lg:w-1/2 mr-10">
          <div className="p-5 text-gray-600 font-semibold">YOU ARE GOING TO FALL IN LOVE WITH NATURE!</div>
          <div className="mr-24 py-5 pl-5 text-gray-500">{tour?.description}</div>
        </div>
        <div className="relative hidden lg:block lg:h-full w-1/2">
          <img
            src={`${process.env.REACT_APP_SERVER_URL}/public/img/tours/${tour?.images[0]}`}
            className="absolute block h-52 -top-[10%] -left-10 shadow-2xl rounded-md hover:z-10 transform hover:scale-110 transition-transform duration-300 custom-outline"
          ></img>
          <img
            src={`${process.env.REACT_APP_SERVER_URL}/public/img/tours/${tour?.images[1]}`}
            className="absolute block h-52 top-3 right-[12%] shadow-2xl rounded-md hover:z-10 transform hover:scale-110 transition-transform duration-300 custom-outline"
          ></img>
          <img
            src={`${process.env.REACT_APP_SERVER_URL}/public/img/tours/${tour?.images[2]}`}
            className="absolute block h-52 top-20 left-[10%] shadow-2xl rounded-md hover:z-10 transform hover:scale-110 transition-transform duration-300 custom-outline"
          ></img>
        </div>
      </div>
    </div>
  );
};

export default DetailSecondContainer;
