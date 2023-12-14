import React, { FC, useState } from 'react';
import useLogout from '../hooks/useLogout';
import useInputHandler from '../hooks/useInputHandler';
import { useAppDispatch } from '../hooks/useTypeSelector';
import { userDelete } from '../features/users/userDeleteSlice';
import { DeleteModalProps } from '../models/PropsModel';

const DeleteModal: FC<DeleteModalProps> = ({ isDeleteModalOpen, setIsDeleteModalOpen }) => {
  const dispatch = useAppDispatch();
  const logout = useLogout();
  const [pw, handlePwChange] = useInputHandler('');

  const handleDeleteAccount = async () => {
    if (window.confirm('정말 삭제합니까?')) {
      const resultAction = await dispatch(userDelete({ pw }));
      if (userDelete.fulfilled.match(resultAction)) {
        logout();
        alert('삭제 되었습니다');
      } else {
        alert('incorrect password!!');
        handlePwChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
      }
    } else {
      alert('취소 되었습니다!');
      handlePwChange({ target: { value: '' } } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const offModal = () => {
    setIsDeleteModalOpen(false);
  };

  if (!isDeleteModalOpen) return null;
  return (
    <div className=" fixed h-[100vh] top-0 left-0 bottom-0 right-0 bg-gray-300/60 z-999">
      <div className="fixed z-1000 bg-white h-[30%] w-[30%] top-1/3 left-1/2 opacity-100 -translate-x-1/2 traslate-y-1/2 flex flex-col justify-around items-center">
        <button className="fixed z-1000 top-2 right-2" onClick={offModal}>
          x
        </button>
        <div>verify your current password</div>
        <input className="border-2 border-black w-[60%] p-2" value={pw} onChange={handlePwChange} type="password" />
        <button onClick={handleDeleteAccount}>delete</button>
      </div>
    </div>
  );
};

export default DeleteModal;
