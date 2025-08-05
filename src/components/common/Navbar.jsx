import React from 'react'
import {Link} from 'react-router-dom'


const Navbar = () => {
  return (
    <header className='fixed top-0 left-0 right-0 py-4 bg-purple-700 z-50'>
      <nav className=' container mx-auto px-6 flex justify-between items-center'>
        <div className="">
          <Link to='/' className='text-white text-2xl font-bold'>BlogApp</Link>
        </div>

        <Link className='text-xl bg-cyan-400 text-white px-5 py-2 rounded-lg' to='/create'>Create</Link>
      </nav>
    </header>
  )
}

export default Navbar