import { Review } from './ReviewModel';

export type Location = {
  type: 'Point';
  coordinates: [number, number];
  description: string;
  address?: string;
  _id?: string;
  day?: number;
};

export type Guide = {
  role: 'lead-guide' | 'guide';
  _id: string;
  name: string;
  email: string;
  photo: string;
};

export type TourData = {
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
  difficulty: string;
  price: number;
  summary: string;
  description: string;
  imageCover: string;
  locations: Location[];
  slug: string;
  reviews: Review[];
};

export type Tours = {
  status: 'success';
  results: number;
  data: {
    data: TourData[];
  };
};

export type Tour = {
  status: 'success';
  data: {
    data: TourData;
  };
};

export type TourProps = {
  tour: TourData;
};
