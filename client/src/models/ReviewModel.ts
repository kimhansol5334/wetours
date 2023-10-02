export type User = {
  role: string;
  _id: string;
  name: string;
  email: string;
  photo: string;
};

export type Review = {
  createdAt: string;
  _id: string;
  review: string;
  rating: number;
  user: User;
  tour: string;
  __v: number;
  id: string;
};

export type Reviews = {
  status: string;
  results: number;
  data: {
    data: Review[];
  };
};
