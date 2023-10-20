import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks/useTypeSelector';
import { getSignUp } from '../features/users/userSignUpSlice';
import { setSignUpConfirmPw, setSignUpId, setSignUpName, setSignUpPw } from '../features/users/signUpAuthSlice';
import InputField from '../components/shared/InputField';

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const id = useAppSelector((state) => state.signupAuth.id);
  const pw = useAppSelector((state) => state.signupAuth.pw);
  const confirmPw = useAppSelector((state) => state.signupAuth.confirmPw);
  const name = useAppSelector((state) => state.signupAuth.name);

  const { data, error } = useAppSelector((state) => state.signup);

  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSignUpId(e.target.value));
  };
  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSignUpPw(e.target.value));
  };
  const confirmPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSignUpConfirmPw(e.target.value));
  };
  const nameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSignUpName(e.target.value));
  };

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
    <div className="bg-default h-[100vh] flex-all-center">
      <div className="p-20 bg-white shadow-2xl w-[50%] h-[90%]">
        <div className="mb-5 text-xl font-medium bg-gradient-to-r from-end to-start gradient-text">
          CREATE YOUR ACCOUNT
        </div>
        <InputField label="Your name" type="text" value={name} onChange={nameHandler} />
        <InputField label="Email address" type="email" value={id} onChange={emailHandler} />
        <InputField label="Password" type="password" value={pw} onChange={passwordHandler} />
        <InputField label="Confirm password" type="password" value={confirmPw} onChange={confirmPasswordHandler} />
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
