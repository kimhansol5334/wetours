import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Nav from './components/Nav';
import Login from './pages/Login';
import Main from './pages/Main';
import Detail from './pages/detail/Detail';
import Test from './pages/detail/Test';
import Signup from './pages/Signup';
import Review from './pages/Review';

const Router = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/tour/:slug" element={<Detail />} />
        <Route path="/tour/:slug/reviews" element={<Review />} />
        <Route path="/test" element={<Test />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
