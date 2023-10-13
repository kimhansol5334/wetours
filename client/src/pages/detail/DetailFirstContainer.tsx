import React, { FC } from 'react';
import logo from '../../assets/img/logo-white.png';
import { TourProps } from '../../models/tourModels';

const DetailFirstContainer: FC<TourProps> = ({ tour }) => {
  return (
    <div className="relative h-[80vh] w-full leading-5 inline-block overflow-hidden bg-default">
      <img
        src={`${process.env.PUBLIC_URL}/img/${tour?.imageCover}`}
        alt="test"
        className="absolute h-[80vh] w-full object-cover transform -skew-y-6 origin-top-left"
      />
      <div className="absolute h-full w-full bottom-0 left-0  bg-gradient-to-r from-green-400 to-green-300 opacity-80 transform -skew-y-6 origin-top-left"></div>
      <img src={logo} alt="logo" className="absolute w-16 top-10 left-10"></img>
      <div className="absolute top-40 left-1/2 translate-x-[-50%] text-white">
        <div className="hidden text-6xl font-light tracking-widest lg:block">O U T D O O R S</div>
        <div className="mt-3 text-lg text-center font-medium tracking-[12px]">IS WHERE LIFE HAPPENS</div>
      </div>
    </div>
  );
};

export default DetailFirstContainer;
