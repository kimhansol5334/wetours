import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../hooks/useTypeSelector';
import { getTourById } from '../features/tours/tourUnitSlice';
import logo from '../assets/img/logo-white.png';

const Details: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { state } = location;

  const id = state;

  useEffect(() => {
    dispatch(getTourById(id));
  }, [dispatch]);

  const { data, error, loading } = useAppSelector((state) => state.tour);
  const tourData = data?.data?.data;

  return (
    <div>
      <div className="w-full leading-5 inline-block relative overflow-hidden bg-[#f7f7f7]">
        <img
          src={`${process.env.PUBLIC_URL}/img/${tourData?.imageCover}`}
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
      <div className="relative h-[100vh] ">
        <div className="h-[100vh] transform -skew-y-6 origin-top-left bg-[#f7f7f7]"></div>
        <div className="mt-10 absolute top-10 font-semibold left-1/2 translate-x-[-50%] text-black text-3xl tracking-widest bg-gradient-to-r from-start to-end gradient-text">
          {tourData?.name}
        </div>
        <div className="w-full h-[50vh] absolute top-[25vh] left-1/2 translate-x-[-50%] flex p-16">
          <div className="mr-10 w-1/2">
            <div className="p-5 text-gray-500 ">YOU ARE GOING TO FALL IN LOVE WITH NATURE!</div>
            <div className="py-5 pl-5 pr-10">{tourData?.description}</div>
          </div>
          <div className="relative w-1/2 h-full">
            <img
              src={`${process.env.PUBLIC_URL}/img/${tourData?.images[0]}`}
              className="block h-48 absolute -top-[10%] -left-10 shadow-2xl hover:z-10 transform hover:scale-110 transition-transform duration-300 custom-outline"
            ></img>
            <img
              src={`${process.env.PUBLIC_URL}/img/${tourData?.images[1]}`}
              className="block h-48 absolute top-0 right-[20%] shadow-2xl hover:z-10 transform hover:scale-110 transition-transform duration-300 custom-outline"
            ></img>
            <img
              src={`${process.env.PUBLIC_URL}/img/${tourData?.images[2]}`}
              className="block h-48 absolute top-20 left-[10%] shadow-2xl hover:z-10 transform hover:scale-110 transition-transform duration-300 custom-outline"
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
