import React from 'react';
import { useAppSelector } from './useTypeSelector';

export const useUserInfo = () => {
  const { data: userInfo } = useAppSelector((state) => state.trylogin);
  return { userInfo };
};
