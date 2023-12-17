import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useAppDispatch } from '../../hooks/useTypeSelector';
import { updateUser } from '../../features/users/tryLoginSlice';
import { useUserInfo } from '../../hooks/useUserInfo';

const FileUpload: React.FC = () => {
  const dispatch = useAppDispatch();
  const { userInfo } = useUserInfo();
  const userData = userInfo?.data.user;
  const [file, setFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(
    `${process.env.REACT_APP_SERVER_URL}/public/img/users/${userData?.photo}`,
  );

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newFile = event.target.files[0];
      setFile(newFile);
      const newImagePreviewUrl = URL.createObjectURL(newFile);
      setImagePreviewUrl(newImagePreviewUrl);
    } else {
      setFile(null);
      setImagePreviewUrl('');
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('photo', file);

    try {
      const response = await axios.patch(`${process.env.REACT_APP_API_URL}/users/updateMe`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });

      if (response.data) {
        dispatch(updateUser(response.data.user));
        console.log('업로드 성공:', response.data);
        setFile(null);
      }
      //   window.location.reload();
    } catch (error) {
      console.error('업로드 실패:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="h-48 w-48 relative">
      <input type="file" onChange={handleFileChange} className="hidden" id="fileInput" />
      <label htmlFor="fileInput">
        <img src={imagePreviewUrl} className="h-full w-full rounded-full object-cover border-2 border-pink-300" />
      </label>
      {file && (
        <button
          type="submit"
          className="absolute right-0 px-4 py-2 bg-green-500 opacity-80 text-white text-sm font-light rounded-md  hover:shadow-custom"
        >
          Save
        </button>
      )}
    </form>
  );
};

export default FileUpload;
