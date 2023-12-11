import Cookies from 'js-cookie';
import { persistor } from '../store';
import { PATH } from '../constants/path/path';
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
  const navigate = useNavigate();

  const logout = async () => {
    Cookies.remove('jwt');
    await persistor.purge();
    navigate(PATH.ROOT);
    window.location.reload();
  };

  return logout;
};
