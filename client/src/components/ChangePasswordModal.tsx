import React, { FC } from 'react';
import useInputHandler from '../hooks/useInputHandler';
import useLogout from '../hooks/useLogout';
import { useAppDispatch } from '../hooks/useTypeSelector';
import { userPasswordChange } from '../features/users/userPasswordChangeSlice';
import { ChangePasswordModalProps } from '../models/PropsModel';
import { PATH } from '../constants/path/path';
import { useNavigate } from 'react-router-dom';

const ChangePasswordModal: FC<ChangePasswordModalProps> = ({ isChangeModalOpen, setIsChangeModalOpen }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const logout = useLogout();
  const [pw, handlePwChange] = useInputHandler('');
  const [newPw, handleNewPwChange] = useInputHandler('');
  const [newPwConfirm, handleNewPwConfirmChange] = useInputHandler('');

  const offModal = () => {
    setIsChangeModalOpen(false);
  };

  const handleChangePassword = async () => {
    const actionResult = await dispatch(userPasswordChange({ pw, newPw, newPwConfirm }));
    if (userPasswordChange.fulfilled.match(actionResult)) {
      alert('변경이 완료 되었습니다!');
      navigate(PATH.ROOT);
      //   logout();
    } else if (userPasswordChange.rejected.match(actionResult)) {
      const errorResponse = actionResult.payload;
      console.log('Error: ', errorResponse);
    }
  };
  const CHANGE_MODAL_INPUT_LIST = [
    {
      id: 1,
      content: 'verify your current password',
      value: pw,
      action: handlePwChange,
    },
    {
      id: 2,
      content: 'new password',
      value: newPw,
      action: handleNewPwChange,
    },
    {
      id: 3,
      content: 'confirm your new password',
      value: newPwConfirm,
      action: handleNewPwConfirmChange,
    },
  ];

  if (!isChangeModalOpen) return null;
  return (
    <div className=" fixed h-[100vh] top-0 left-0 bottom-0 right-0 bg-gray-300/60 z-999">
      <div className="fixed z-1000 bg-white h-[50%] w-[30%] top-1/3 left-1/2 opacity-100 -translate-x-1/2 traslate-y-1/2 flex flex-col justify-around items-center">
        <button className="fixed z-1000 top-2 right-2" onClick={offModal}>
          x
        </button>
        {CHANGE_MODAL_INPUT_LIST.map((list) => (
          <div key={list.id}>
            <div>{list.content}</div>
            <input
              className="border-2 border-black w-[60%] p-2"
              value={list.value}
              onChange={list.action}
              type="password"
            ></input>
          </div>
        ))}
        <button onClick={handleChangePassword}>change</button>
      </div>
    </div>
  );
};

export default ChangePasswordModal;