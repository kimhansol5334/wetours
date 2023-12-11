import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useUserInfo } from '../hooks/useUserInfo';
import { useRef } from 'react';
import DeleteModal from '../components/DeleteModal';

const Mypage = () => {
  const { userInfo } = useUserInfo();
  const userData = userInfo?.data.user;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalHandler = () => {
    setIsModalOpen(true);
  };

  console.log(userData);
  return (
    <div className="h-[100vh] bg-default flex-all-center">
      <div className="bg-slate-500 w-[40%] h-[80%] flex relative flex-col justify-center items-center">
        <div className="w-[50%] rounded-full">
          <img src={`${process.env.PUBLIC_URL}/img/${userData?.photo}`} className="object-contain rounded-full"></img>
        </div>
        <div className=" text-center pt-2">
          <div className="text-gray-700 text-xl">{userData?.name}</div>
          <div className=" tracking-wider">{userData?.email}</div>
        </div>
        <button className="text-red-500 absolute bottom-3 right-3 text-xl" onClick={modalHandler}>
          delete account
        </button>
        <DeleteModal isModalOpen={isModalOpen} />
      </div>
    </div>
  );
};

export default Mypage;
