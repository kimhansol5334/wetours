import Cookies from 'js-cookie';
import axios from 'axios';
import { persistor } from '../store';
import { PATH } from '../constants/path/path';
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
  const navigate = useNavigate();

  const logout = async () => {
    await axios.get(`${process.env.REACT_APP_API_URL}/users/logout`, { withCredentials: true });
    await persistor.purge();
    navigate(PATH.ROOT);
    window.location.reload();
  };

  return logout;
};

export default useLogout;
