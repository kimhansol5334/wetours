import { User } from './ReviewModel';

export type LoginData = {
  status: string;
  token: string;
  data: { user: User };
};

export type UserData = {
  status: string;
  data: { user: User };
};
