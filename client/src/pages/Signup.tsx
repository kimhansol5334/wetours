import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks/useTypeSelector';
import { getSignUp } from '../features/users/userSignUpSlice';
import { setSignUpConfirmPw, setSignUpId, setSignUpName, setSignUpPw } from '../features/users/signUpAuthSlice';
import InputField from '../components/shared/InputField';
import useInputHandler from '../hooks/useInputHandler';

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [id, handleIdChange] = useInputHandler('');
  const [pw, handlePwChange] = useInputHandler('');
  const [confirmPw, handleConfirmPwChange] = useInputHandler('');
  const [name, handleNameChange] = useInputHandler('');

  const { data, error } = useAppSelector((state) => state.signup);

  const handleSignUp = async () => {
    await dispatch(getSignUp({ id, pw, confirmPw, name }));
  };

  useEffect(() => {
    if (error) {
      alert(error);
      console.log(error);
    }
    if (data) {
      navigate('/');
    }
  }, [error, data]);

  return (
    <div className="flex-all-center h-[100vh] bg-default ">
      <div className="h-[90%] w-[50%] p-20 bg-white shadow-2xl">
        <div className="mb-5 text-xl font-medium bg-gradient-to-r from-end to-start gradient-text">
          CREATE YOUR ACCOUNT
        </div>
        <InputField label="Your name" type="text" value={name} onChange={handleNameChange} />
        <InputField label="Email address" type="email" value={id} onChange={handleIdChange} />
        <InputField label="Password" type="password" value={pw} onChange={handlePwChange} />
        <InputField label="Confirm password" type="password" value={confirmPw} onChange={handleConfirmPwChange} />
        <button
          className="mt-6 px-8 py-3 bg-green-500 opacity-90 text-white text-sm font-light rounded-full hover:shadow-custom hover:-translate-y-0.5"
          onClick={handleSignUp}
        >
          SIGN UP
        </button>
      </div>
    </div>
  );
};

export default Signup;
