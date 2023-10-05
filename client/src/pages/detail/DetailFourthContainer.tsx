import React from 'react';
import { Link } from 'react-router-dom';

const DetailFourthContainer = () => {
  return (
    <div className="flex-all-center h-[30vh] -mt-2 bg-default">
      <Link
        to="/"
        className="px-6 py-3 bg-green-500 text-white text-sm font-light opacity-90 rounded-full hover:shadow-custom hover:-translate-y-0.5"
      >
        DISCOVER ALL TOURS
      </Link>
    </div>
  );
};

export default DetailFourthContainer;
