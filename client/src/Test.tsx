import React, { useState } from 'react';
import axios from 'axios';
import { useAppSelector, useAppDispatch } from './hooks/useTypeSelector';

import { decrement, increment } from './features/counters/counterSlice';

interface User {
  email: String;
  name: String;
  photo: String;
  role: String;
  _id: String;
}

function App() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const count = useAppSelector((state) => state.counter.count);
  const dispatch = useAppDispatch();

  const IdHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };
  const PasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const login = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/users/login`,
        {
          email: id,
          password: password,
        },
        {
          headers: {
            'Content-type': 'application/json',
            Accept: 'application/json',
          },
        },
      )
      .then((response) => {
        console.log(response.data);

        // 토큰을 쿠키로 저장
        if (response.data && response.data.token) {
          const token = response.data.token;

          // 쿠키에 토큰 저장
          document.cookie = `jwt=${token};path=/;max-age=3600`; // 1시간 동안 유효
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const logout = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/logout`, {
        headers: {
          Accept: 'application/json',
        },
      })
      .then((response) => {
        if (response.data.status === 'success') {
          // 로그아웃 성공 시 필요한 처리를 여기에 작성
          // 예를 들면, 클라이언트에서 JWT 쿠키를 삭제하는 것입니다.
          document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          console.log('Successfully logged out.');
        }
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });
  };
  const getTokenFromCookie = () => {
    const value = '; ' + document.cookie;
    const parts = value.split('; jwt=');

    if (parts.length === 2 && parts[1]) {
      return parts[1].split(';')[0];
    }

    return null;
  };

  const getUsers = () => {
    const token = getTokenFromCookie();

    if (!token) {
      console.error('No token found');
      return;
    }

    axios
      .get(`${process.env.REACT_APP_API_URL}/users/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setUsers(response.data.data.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  return (
    <div>
      <header>
        <p className=" text-red-500">Test Text...</p>
        <input className="border-2" onChange={IdHandler} value={id} />
        <input className="border-2" onChange={PasswordHandler} value={password} />
        <button className="bg-red-500 mr-2 p-2" onClick={login}>
          login
        </button>
        <button className="bg-red-500 p-2" onClick={logout}>
          logout
        </button>
        <button onClick={getUsers}>see all users</button>
      </header>
      {users && users.map((user, index) => <div key={index}>{user.name}</div>)}
      <div className="flex flex-col items-center">
        <p className=" text-xl">Count: {count}</p>
        <div>
          <button className="pr-3" onClick={handleIncrement}>
            UP
          </button>
          <button onClick={handleDecrement}>DOWN</button>
        </div>
      </div>
    </div>
  );
}

export default App;
