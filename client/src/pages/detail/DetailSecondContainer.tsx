import React, { FC } from 'react';
import { TourData } from '../../models/tourModels';

interface TourProps {
  tour: TourData | undefined;
}

const DetailSecondContainer: FC<TourProps> = ({ tour }) => {
  return (
    <div className="relative h-[100vh] ">
      <div className="h-[100vh] transform -skew-y-6 origin-top-left bg-[#f7f7f7]"></div>
      <div className="mt-10 absolute top-10 font-semibold left-1/2 translate-x-[-50%] text-black text-3xl tracking-widest bg-gradient-to-r from-start to-end gradient-text">
        {tour?.name}
      </div>
      <div className="w-full h-[50vh] absolute top-[25vh] left-1/2 translate-x-[-50%] flex p-16">
        <div className="mr-10 w-1/2">
          <div className="p-5 text-gray-500 ">YOU ARE GOING TO FALL IN LOVE WITH NATURE!</div>
          <div className="py-5 pl-5 mr-24">{tour?.description}</div>
        </div>
        <div className="relative w-1/2 h-full">
          <img
            src={`${process.env.PUBLIC_URL}/img/${tour?.images[0]}`}
            className="block h-48 absolute -top-[10%] -left-10 shadow-2xl hover:z-10 transform hover:scale-110 transition-transform duration-300 custom-outline"
          ></img>
          <img
            src={`${process.env.PUBLIC_URL}/img/${tour?.images[1]}`}
            className="block h-48 absolute top-0 right-[20%] shadow-2xl hover:z-10 transform hover:scale-110 transition-transform duration-300 custom-outline"
          ></img>
          <img
            src={`${process.env.PUBLIC_URL}/img/${tour?.images[2]}`}
            className="block h-48 absolute top-20 left-[10%] shadow-2xl hover:z-10 transform hover:scale-110 transition-transform duration-300 custom-outline"
          ></img>
        </div>
      </div>
    </div>
  );
};

export default DetailSecondContainer;
