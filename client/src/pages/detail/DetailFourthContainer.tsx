import React from 'react';
import { Link } from 'react-router-dom';

const DetailFourthContainer = () => {
  return (
    <div className="bg-default h-[30vh] -mt-2 flex-all-center">
      <Link
        to="/"
        className="px-6 py-3 bg-green-500 opacity-90 text-white text-sm font-light rounded-full hover:shadow-custom hover:-translate-y-0.5"
      >
        DISCOVER ALL TOURS
      </Link>
    </div>
  );
};

export default DetailFourthContainer;
