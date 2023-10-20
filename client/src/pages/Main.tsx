import React from 'react';
import Tour from '../components/tour/Tour';
import { useTours } from '../hooks/useTours';
import { ReactComponent as Logo } from './../assets/img/logo.svg';

const Main = () => {
  const { tours, error, loading } = useTours();

  return (
    <div>
      <div className="grid gap-5 p-20 bg-default md:grid-cols-3 md:gap-14">
        {loading ? (
          <div className="h-[100vh] bg-default"></div>
        ) : (
          tours &&
          tours?.map((tour) => (
            <div className="shadow-2xl" key={tour._id}>
              <Tour tour={tour} />
            </div>
          ))
        )}
      </div>
      <div className="p-12 bg-default">
        <div className="flex justify-between">
          <div className="flex-all-center">
            <div className="mr-5">
              <Logo fill="#3131f2" />
            </div>
            <span className="bg-gradient-to-r from-end to-start gradient-text text-xl">WETORUS</span>
          </div>
          <div className="mt-4 text-gray-400 text-xs font-light">© 2023 by Hansol Kim.</div>
        </div>
      </div>
    </div>
  );
};

export default Main;
