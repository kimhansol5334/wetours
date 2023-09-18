import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/logo-white.png';

const Nav = () => {
  return (
    <nav className="p-8 bg-[#444444] text-white h-[10vh] flex justify-between items-center">
      <Link to="/" className="font-thin hover:bg-55c57a hover:text-white hover:shadow-custom hover:-translate-y-0.5">
        ALL TOURS
      </Link>
      <img src={logo} alt="logo" className="w-16"></img>
      <Link
        to="/login"
        className="font-thin hover:bg-55c57a hover:text-white hover:shadow-custom hover:-translate-y-0.5"
      >
        LOG IN
      </Link>
    </nav>
  );
};

export default Nav;
