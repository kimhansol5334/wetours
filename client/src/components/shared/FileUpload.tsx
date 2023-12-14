import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useAppDispatch } from '../../hooks/useTypeSelector';
import { updateUser } from '../../features/users/tryLoginSlice';

const FileUpload: React.FC = () => {
  const dispatch = useAppDispatch();
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
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

      // 업로드 성공 처리
      dispatch(updateUser(formData));
      console.log('업로드 성공:', response.data);
    } catch (error) {
      // 업로드 실패 처리
      console.error('업로드 실패:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
};

export default FileUpload;
