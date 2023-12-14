import React from 'react';

export type DeleteModalProps = {
  isDeleteModalOpen: boolean;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export type ChangePasswordModalProps = {
  isChangeModalOpen: boolean;
  setIsChangeModalOpen: any;
};
