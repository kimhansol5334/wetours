import React, { FC } from 'react';
import { TourProps } from '../../models/tourModels';
import { CiClock2, CiMoneyCheck1 } from 'react-icons/ci';
import { BsActivity } from 'react-icons/bs';
import { GoPeople } from 'react-icons/go';

const DetailThirdContainer: FC<TourProps> = ({ tour }) => {
  const THIRD_CARD_DATA = [
    {
      id: 1,
      name: 'DURAITON',
      tail: 'days',
      description: 'EXPLORE THE WORLD !',
      icon: <CiClock2 size="60" color="#6dc987" />,
      content: tour?.duration,
    },
    {
      id: 2,
      name: 'DIFFICULTY',
      description: 'scale your performance and live a healthier life!',
      icon: <BsActivity size="60" color="#6dc987" />,
      content: tour?.difficulty,
    },
    {
      id: 3,
      name: 'GROUP SIZE',
      tail: 'people',
      description: 'group size could be adjusted. please contact us.',
      icon: <GoPeople size="60" color="#6dc987" />,
      content: tour?.maxGroupSize,
    },
    {
      id: 4,
      name: 'PRICE',
      tail: '$',
      description: `BOOK NOW !`,
      icon: <CiMoneyCheck1 size="60" color="#6dc987" />,
      content: tour?.price,
    },
  ];

  return (
    <div className="relative w-full leading-5 inline-block bg-default">
      <img
        src={`${process.env.PUBLIC_URL}/img/${tour?.images[0]}`}
        alt="test"
        className="h-[90vh] w-full object-cover transform -skew-y-6 origin-top-left"
      />
      <div className="absolute h-full w-full bottom-0 left-0  bg-gradient-to-r from-green-600 to-green-500 opacity-80 transform -skew-y-6 origin-top-left"></div>
      <div className="absolute grid grid-cols-2 lg:grid-cols-4 gap-20 top-32 h-full w-full px-20">
        {THIRD_CARD_DATA.map((card) => (
          <div
            key={card.id}
            className="bg-white h-[20%] lg:h-[40%] lg:w-[210px]  p-5 opacity-90 flex flex-col justify-center items-center rounded-md transform hover:scale-105 hover:-translate-y-5 transition-transform duration-300"
          >
            <div className="mb-5">{card.icon}</div>
            <div className="mb-2 text-gray-500 text-base font-medium">{card.name}</div>
            <div className="text-green-600 text-xl font-light">
              {card.content} {card.tail}
            </div>
            <div className="mt-5 text-gray-500 text-xs font-normal text-center leading-5">{card.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailThirdContainer;
