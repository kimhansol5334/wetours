import React, { FC } from 'react';
import logo from '../../assets/img/logo-white.png';
import { TourData } from '../../models/tourModels';

interface TourProps {
  tour: TourData | undefined;
}

const DetailFirstContainer: FC<TourProps> = ({ tour }) => {
  return (
    <div className="w-full leading-5 inline-block relative overflow-hidden bg-[#f7f7f7]">
      <img
        src={`${process.env.PUBLIC_URL}/img/${tour?.imageCover}`}
        alt="test"
        className=" w-full h-[80vh] object-cover transform -skew-y-6 origin-top-left"
      />
      <div className=" w-full h-full absolute bottom-0 left-0 bg-gradient-to-r from-green-400 to-green-300 opacity-80 transform -skew-y-6 origin-top-left"></div>
      <img src={logo} alt="logo" className="w-16 absolute top-10 left-10"></img>
      <div className="absolute top-40 text-white left-1/2 translate-x-[-50%]">
        <div className="text-6xl font-light tracking-widest">O U T D O O R S</div>
        <div className="mt-3 text-lg font-medium text-center tracking-[12px]">IS WHERE LIFE HAPPENS</div>
      </div>
    </div>
  );
};

export default DetailFirstContainer;
