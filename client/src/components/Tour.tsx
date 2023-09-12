import React,{FC} from 'react'

type Location = {
    type: 'Point';
    coordinates: [number, number];
    description: string;
    address?: string;
    _id?: string;
    day?: number;
  };
  
  type Guide = {
    role: 'lead-guide' | 'guide';
    _id: string;
    name: string;
    email: string;
    photo: string;
  };

type TourData = {
    startLocation: Location;
    ratingsAverage: number;
    ratingsQuantity: number;
    images: string[];
    startDates: string[];
    secretTour: boolean;
    guides: Guide[];
    _id: string;
    name: string;
    duration: number;
    maxGroupSize: number;
    difficulty: 'easy' | 'medium' | 'hard';  // 가능한 난이도 값을 추측하였습니다.
    price: number;
    summary: string;
    description: string;
    imageCover: string;
    locations: Location[];
    slug: string;
  };

  interface TourProps {
    tour: TourData;
  }

const Tour: FC<TourProps> = ({tour}) => {
  return (
    <div>
    <div className="text-sm font-medium text-red-500 pb-3">{tour.name}</div>
    <div className="text-xs">{tour.price}</div>
  </div>
  )
}

export default Tour