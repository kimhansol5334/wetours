import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/logo-white.png';

const Nav = () => {
  return (
    <nav className="p-8 bg-[#444444] text-white h-[10vh] flex justify-between items-center">
      <Link to="/" className="font-thin hover:bg-55c57a hover:text-white hover:shadow-custom hover:-translate-y-0.5">
        ALL TOURS
      </Link>
      <Link to="/">
        <img src={logo} alt="logo" className="w-16"></img>
      </Link>
      <div className="flex items-center">
        <Link
          to="/login"
          className="font-thin hover:bg-55c57a hover:text-white hover:shadow-custom hover:-translate-y-0.5"
        >
          LOG IN
        </Link>
        <Link
          to="/signup"
          className="ml-10 px-6 py-3 font-thin border-white border rounded-full hover:bg-white hover:text-[#444444] hover:shadow-custom hover:-translate-y-0.5 transition-all duration-300 ease-in-out"
        >
          SIGN UP
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
