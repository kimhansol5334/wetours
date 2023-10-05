import React, { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks/useTypeSelector';
import { login } from '../features/users/userLoginSlice';
import { tryLogin } from '../features/users/tryLoginSlice';
import { setId, setPw } from '../features/users/authSlice';

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
    await dispatch(tryLogin({ id, pw })); // <-- await를 사용해 비동기 작업 완료 대기
  };

  useEffect(() => {
    if (data) {
      const token = data.token;
      Cookies.set('jwt', token, { expires: 90 });
      dispatch(login());
      navigate('/');
    }
  }, [data]);
  return (
    <div className="bg-default h-[80vh] flex-all-center">
      <div className="p-20 bg-white shadow-2xl w-[50%] h-[70%]">
        <div className="mb-5 text-xl font-medium bg-gradient-to-r from-end to-start gradient-text">
          LOG INTO YOUR ACCOUNT
        </div>
        <div className="mb-1 text-base text-gray-500 font-medium">Email adress</div>
        <input className="p-3 bg-default w-full mb-8" type="email" value={id} onChange={emailHandler}></input>
        <div className="mb-1 text-base text-gray-500 font-medium">Password</div>
        <input className="p-3 bg-default w-full" type="password" value={pw} onChange={passwordHandler}></input>
        <button
          className=" mt-6 px-8 py-3 bg-green-500 opacity-90 text-white text-sm font-light rounded-full hover:shadow-custom hover:-translate-y-0.5"
          onClick={handleLogin}
        >
          LOGIN
        </button>
      </div>
    </div>
  );
};

export default Login;
