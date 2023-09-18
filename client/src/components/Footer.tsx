import React from 'react';
import logo from '../assets/img/logo-white.png';

const Footer = () => {
  return (
    <div className="bg-[#333333] px-5 pt-12 pb-5">
      <div className="flex justify-between">
        <div className="flex">
          <img src={logo} className="w-14 text-green-600 mr-2"></img>
          <span className="text-green-600">WETORUS</span>
        </div>
        <div className="text-gray-400 font-light text-xs mt-4">© 2023 by Hansol Kim.</div>
      </div>
    </div>
  );
};

export default Footer;
