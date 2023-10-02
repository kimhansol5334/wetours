import React, { useState } from 'react';
import axios from 'axios';

const Test = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const IdHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };
  const PwHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const Login = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/login`, {
        email: id,
        password: password,
      });

      console.log(response.data);
    } catch (err) {
      // 로그인 실패
      console.error(err);
    }
  };

  return (
    <div>
      <input onChange={IdHandler} value={id}></input>
      <input onChange={PwHandler} value={password}></input>
      <button onClick={Login}>log in</button>
    </div>
  );
};

export default Test;
