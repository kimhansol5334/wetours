import React from 'react'
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className='p-8 bg-[#444444] text-white h-[8vh] flex justify-between items-center'>
      <div>left</div>
      <div>Wetours</div>
      <Link to='/login'>LOGIN</Link>
    </nav>
  )
}

export default Nav