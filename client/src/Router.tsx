import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Nav from './components/Nav';
import Login from './pages/Login';
import Main from './pages/Main';
import Detail from './pages/detail/Detail';
import Signup from './pages/Signup';
import Review from './pages/Review';
import Mypage from './pages/Mypage';

const Router = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mypage/:username" element={<Mypage />} />
        <Route path="/tour/:slug" element={<Detail />} />
        <Route path="/tour/:slug/reviews" element={<Review />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
};

export default Router;
