import React, { FC } from 'react';
import { TourData } from '../../models/tourModels';
import { FiMapPin } from 'react-icons/fi';

interface TourProps {
  tour: TourData;
}

const TourCenter: FC<TourProps> = ({ tour }) => {
  const TOUR_ICON_DATA = [
    {
      id: 1,
      content: tour.startLocation.description,
      icon: <FiMapPin color="green" />,
    },
    {
      id: 2,
      content: tour.startDates[0],
      icon: <FiMapPin color="green" />,
    },
    {
      id: 3,
      content: tour.locations.length,
      icon: <FiMapPin color="green" />,
      tag: 'stops',
    },
    {
      id: 4,
      content: tour.maxGroupSize,
      icon: <FiMapPin color="green" />,
      tag: 'people',
    },
  ];
  return (
    <div className="text-sm font-light p-5 pb-3">
      <div className="text-xs text-gray-600 font-light mb-2">{tour.summary}</div>
      <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 font-light mb-2">
        {TOUR_ICON_DATA.map((icon) => (
          <div className="flex items-center" key={icon.id}>
            <div className="mr-1">{icon.icon}</div>
            {icon.content}
            <span className="ml-1">{icon.tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TourCenter;
