import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks/useTypeSelector';
import Cookies from 'js-cookie';
import { tryLogin } from '../features/users/tryLoginSlice';
import { setId, setPw } from '../features/users/authSlice';
import InputField from '../components/shared/InputField';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const id = useAppSelector((state) => state.auth.id);
  const pw = useAppSelector((state) => state.auth.pw);

  const { data } = useAppSelector((state) => state.trylogin);

  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setId(e.target.value));
  };
  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPw(e.target.value));
  };

  const handleLogin = async () => {
    await dispatch(tryLogin({ id, pw }));
  };

  useEffect(() => {
    if (data) {
      const token = data.token;
      Cookies.set('jwt', token, { expires: 90, path: '/', sameSite: 'Lax' });
      navigate('/');
    }
  }, [data]);
  return (
    <div className="bg-default h-[100vh] flex-all-center">
      <div className="p-20 bg-white shadow-2xl w-[50%] h-[65%]">
        <div className="mb-5 text-xl font-medium bg-gradient-to-r from-end to-start gradient-text">
          LOG INTO YOUR ACCOUNT
        </div>
        <InputField label="Email address" type="email" value={id} onChange={emailHandler} />
        <InputField label="Password" type="password" value={pw} onChange={passwordHandler} />
        <button
          className="mt-6 px-8 py-3 bg-green-500 opacity-90 text-white text-sm font-light rounded-full hover:shadow-custom hover:-translate-y-0.5"
          onClick={handleLogin}
        >
          LOGIN
        </button>
      </div>
    </div>
  );
};

export default Login;
