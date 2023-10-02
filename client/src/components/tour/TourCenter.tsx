import React, { FC } from 'react';
import { format } from 'date-fns';
import { TourProps } from '../../models/tourModels';
import { FiMapPin } from 'react-icons/fi';
import { BsFlag, BsPerson } from 'react-icons/bs';
import { AiOutlineSchedule } from 'react-icons/ai';

const TourCenter: FC<TourProps> = ({ tour }) => {
  const date = new Date(tour.startDates[0]);
  const startDate = format(date, 'MMMM yyyy');
  const TOUR_ICON_DATA = [
    {
      id: 1,
      content: tour.startLocation.description,
      icon: <FiMapPin color="green" size="20" />,
    },
    {
      id: 2,
      content: startDate,
      icon: <AiOutlineSchedule color="green" size="20" />,
    },
    {
      id: 3,
      content: tour.locations.length,
      icon: <BsFlag color="green" size="20" />,
      tag: 'stops',
    },
    {
      id: 4,
      content: tour.maxGroupSize,
      icon: <BsPerson color="green" size="20" />,
      tag: 'people',
    },
  ];
  return (
    <div className="px-7 py-7 text-sm font-light">
      <div className=" mb-6 text-sm text-gray-600 font-light">{tour.summary}</div>
      <div className="grid grid-cols-2 gap-4 mb-2 text-xs text-gray-500 font-light">
        {TOUR_ICON_DATA.map((icon) => (
          <div className="flex items-center" key={icon.id}>
            <div className="mr-2">{icon.icon}</div>
            {icon.content}
            <span className="ml-1">{icon.tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TourCenter;
