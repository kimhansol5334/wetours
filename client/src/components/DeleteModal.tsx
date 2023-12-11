import React, { FC, useState } from 'react';
import { useAppDispatch } from '../hooks/useTypeSelector';
import { userDelete } from '../features/users/userDeleteSlice';
import { useAppSelector } from '../hooks/useTypeSelector';
import { useLogout } from '../hooks/useLogout';

const DeleteModal: FC<{ isModalOpen: boolean }> = ({ isModalOpen }) => {
  const [pw, setPw] = useState('');
  const dispatch = useAppDispatch();
  const logout = useLogout();
  const { data, error, loading } = useAppSelector((state) => state.userDelete);

  const handlePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPw(e.target.value);
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('정말 삭제합니까?')) {
      const resultAction = await dispatch(userDelete({ pw }));
      if (userDelete.fulfilled.match(resultAction)) {
        console.log(resultAction.payload);
        logout();
        alert('삭제 되었습니다');
      } else {
        alert('incorrect password!!');
        setPw('');
      }
    } else {
      alert('취소 되었습니다!');
      setPw('');
    }
  };

  const handleLogout = async () => {};

  console.log(data);
  if (!isModalOpen) return null;
  return (
    <div className=" fixed h-[100vh] top-0 left-0 bottom-0 right-0 bg-gray-300/60 z-999">
      <div className="fixed z-1000 bg-white h-[30%] w-[30%] top-1/3 left-1/2 opacity-100 -translate-x-1/2 traslate-y-1/2 flex flex-col justify-around items-center">
        <div>verify your current password</div>
        <input className="border-2 border-black w-[60%] p-2" value={pw} onChange={handlePw} type="password"></input>
        <button onClick={handleDeleteAccount}>delete</button>
      </div>
    </div>
  );
};

export default DeleteModal;
