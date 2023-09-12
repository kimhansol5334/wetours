import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav'
import Login from './pages/Login';
import Main from './pages/Main';
import Test from './Test'

const Router = () => {
  return (
    <BrowserRouter>
    <Nav />
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/test" element={<Test />} />
    </Routes>
  </BrowserRouter>
  )
}

export default Router