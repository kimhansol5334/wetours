import React from 'react';

const Login = () => {
  return (
    <div className="bg-default h-[80vh] flex-all-center">
      <div className="p-20 bg-white shadow-2xl w-[50%] h-[70%]">
        <div className="mb-5 text-xl font-medium bg-gradient-to-r from-end to-start gradient-text">
          LOG INTO YOUR ACCOUNT
        </div>
        <div className="mb-1 text-base text-gray-500 font-medium">Email adress</div>
        <input className="p-3 bg-default w-full mb-8"></input>
        <div className="mb-1 text-base text-gray-500 font-medium">Password</div>
        <input className="p-3 bg-default w-full"></input>
        <button className=" mt-6 px-8 py-3 bg-green-500 opacity-90 text-white text-sm font-light rounded-full hover:shadow-custom hover:-translate-y-0.5">
          LOGIN
        </button>
      </div>
    </div>
  );
};

export default Login;
