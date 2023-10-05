import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useTypeSelector';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/img/logo-white.png';
import Cookies from 'js-cookie';
import { persistor } from '../store';
import { resetAuth } from '../features/users/authSlice';

const Nav = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data } = useAppSelector((state) => state.trylogin);
  const jwt = Cookies.get('jwt');
  const userName = data?.data.user.name;

  const handleLogout = async () => {
    Cookies.remove('jwt');
    dispatch(resetAuth());
    await persistor.purge();
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="p-8 bg-[#444444] text-white h-[10vh] flex justify-between items-center">
      <Link to="/" className="font-thin hover:bg-55c57a hover:text-white hover:shadow-custom hover:-translate-y-0.5">
        ALL TOURS
      </Link>
      <Link to="/">
        <img src={logo} alt="logo" className="w-16"></img>
      </Link>
      <div className="flex items-center">
        {jwt ? (
          <button>{userName}</button>
        ) : (
          <Link
            to="/login"
            className="font-thin hover:bg-55c57a hover:text-white hover:shadow-custom hover:-translate-y-0.5"
          >
            LOG IN
          </Link>
        )}

        {jwt ? (
          <button
            className="ml-10 font-thin hover:bg-55c57a hover:text-white hover:shadow-custom hover:-translate-y-0.5"
            onClick={handleLogout}
          >
            LOG OUT
          </button>
        ) : (
          <Link
            to="/signup"
            className="ml-10 px-6 py-3 font-thin border-white border rounded-full hover:bg-white hover:text-[#444444] hover:shadow-custom hover:-translate-y-0.5 transition-all duration-300 ease-in-out"
          >
            SIGN UP
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Nav;
