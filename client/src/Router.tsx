import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Nav from './components/Nav';
import Login from './pages/Login';
import Main from './pages/Main';
import Details from './pages/Details';
import Test from './Test';

const Router = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/test" element={<Test />} />
        <Route path="/tour/:slug" element={<Details />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
