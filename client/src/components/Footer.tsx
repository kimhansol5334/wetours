import React from 'react';
import logo from '../assets/img/logo-white.png';

const Footer = () => {
  return (
    <div className="px-5 pt-12 pb-5 bg-[#333333]">
      <div className="flex justify-between">
        <div className="flex">
          <img src={logo} className="w-14 mr-2 text-green-600"></img>
          <span className="bg-gradient-to-r from-end to-start gradient-text">WETORUS</span>
        </div>
        <div className="mt-4 text-gray-400 text-xs font-light">© 2023 by Hansol Kim.</div>
      </div>
    </div>
  );
};

export default Footer;
