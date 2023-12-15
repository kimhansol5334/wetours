import React, { useState } from 'react';
import { useUserInfo } from '../hooks/useUserInfo';
import DeleteModal from '../components/DeleteModal';
import ChangePasswordModal from '../components/ChangePasswordModal';
import FileUpload from '../components/shared/FileUpload';

const Mypage = () => {
  const { userInfo } = useUserInfo();
  const userData = userInfo?.data.user;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isChangeModalOpen, setIsChangeModalOpen] = useState(false);

  const changeModalHandler = () => {
    setIsChangeModalOpen(true);
  };
  const deleteModalHandler = () => {
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="h-[100vh] bg-default flex-all-center relative">
      <img
        className="absolute h-full w-full opacity-40"
        src={`${process.env.REACT_APP_SERVER_URL}/public/img/tours/tour-4-cover.jpg`}
      ></img>
      <div className="absolute h-full w-full bottom-0 left-0  bg-gradient-to-r from-green-200 to-green-300 opacity-60 "></div>
      <div className="bg-default w-[30%] h-[60%] flex relative flex-col justify-around items-center rounded-xl">
        <div className=" text-center pt-2">
          <div className="bg-gradient-to-r from-end to-start gradient-text text-3xl mb-3 tracking-wider">
            {userData?.name}
          </div>
          <div className="bg-gradient-to-r text-green-500 tracking-wider font-light text-sm">{userData?.email}</div>
        </div>
        <div className="w-48 h-48 mb-12">
          <FileUpload />
        </div>
        <div className="flex">
          <button
            className="absolute bottom-3 left-3 p-2 bg-green-700 opacity-80 text-white text-sm font-light rounded-3xl hover:shadow-custom hover:-translate-y-0.5"
            onClick={changeModalHandler}
          >
            change password
          </button>
          <button
            className="text-black absolute bottom-3 right-3  p-2 bg-red-500 opacity-80  text-sm font-light rounded-3xl hover:shadow-custom hover:-translate-y-0.5"
            onClick={deleteModalHandler}
          >
            delete account
          </button>
        </div>
        <DeleteModal isDeleteModalOpen={isDeleteModalOpen} setIsDeleteModalOpen={setIsDeleteModalOpen} />
        <ChangePasswordModal isChangeModalOpen={isChangeModalOpen} setIsChangeModalOpen={setIsChangeModalOpen} />
      </div>
    </div>
  );
};

export default Mypage;
