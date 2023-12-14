import React, { useEffect, useState } from 'react';
import useLogout from '../hooks/useLogout';
import { useAppSelector } from '../hooks/useTypeSelector';
import { useUserInfo } from '../hooks/useUserInfo';
import { Link } from 'react-router-dom';
import logo from '../assets/img/logo-white.png';
import Cookies from 'js-cookie';

const Nav = () => {
  const logout = useLogout();
  const { userInfo } = useUserInfo();

  const userName = userInfo?.data.user.name;
  const userImage = userInfo?.data.user.photo;

  console.log(userImage);

  return (
    <nav className=" flex justify-between items-center h-[10vh] p-8 bg-[#444444] text-white">
      <Link to="/" className="font-thin hover:bg-55c57a hover:text-white hover:shadow-custom hover:-translate-y-0.5">
        ALL TOURS
      </Link>
      <Link to="/">
        <img src={logo} alt="logo" className="w-16"></img>
      </Link>
      <div className="flex items-center">
        {userInfo ? (
          <Link to={`/mypage/${userName}`} className="flex-all-center">
            <img
              src={`${process.env.REACT_APP_SERVER_URL}/public/img/users/${userImage}`}
              className="w-8 mr-2 rounded-full"
            ></img>
            {userName}
          </Link>
        ) : (
          <Link
            to="/login"
            className="font-thin hover:bg-55c57a hover:text-white hover:shadow-custom hover:-translate-y-0.5"
          >
            LOG IN
          </Link>
        )}

        {userInfo ? (
          <button
            className="ml-10 font-thin hover:bg-55c57a hover:text-white hover:shadow-custom hover:-translate-y-0.5"
            onClick={logout}
          >
            LOG OUT
          </button>
        ) : (
          <Link
            to="/signup"
            className="ml-10 px-6 py-3 font-thin border border-white rounded-full hover:bg-white hover:text-[#444444] hover:shadow-custom hover:-translate-y-0.5 transition-all duration-300 ease-in-out"
          >
            SIGN UP
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Nav;
