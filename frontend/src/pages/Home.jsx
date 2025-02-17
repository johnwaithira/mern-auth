import React from 'react'
import toast from 'react-hot-toast'
import banner from '../assets/hero.jpg'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  return (
    <div className='h-[90vh] flex items-center'>
      <div className='relative w-full h-[80vh] rounded-[20px] shadow-2xl flex items-center bg-cover bg-center' style={{
        backgroundImage: `url(${banner})`,
      }}>
        <div className='absolute rounded-[20px] inset-0 bg-gradient-to-t from-black to-transparent'></div>
        <div className='flex z-10 text-white flex-col p-5 sm:p-20 ' >
          <h1 className='text-2xl sm:text-5xl'>Welcome to MERN-auth</h1>
          <p className='py-5'>A FullStack CRUD app</p>
          <div>
            <button className='outline-1 py-3 px-10 cursor-pointer' onClick={()=>navigate("/login")}>Login</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home