import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Register from './pages/Register'
import Login from './pages/Login'
import { Toaster } from 'react-hot-toast'
import PrivateRoute from './components/PrivateRoute'
import Profile from './pages/Profile'
import UpdateProfile from './pages/UpdateProfile'
import Auth from './components/Auth'

const App = () => {
  return (
    <div className='container m-auto'>
      <Navbar />
      <Toaster position='top-right' toastOptions={({
        duration: 4000,
        removeDelay: false,
        style: {

        }
      })} />
      <div className="px-2">
        <Routes >
          <Route element={<Auth/>}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/profile/edit/:id" element={<UpdateProfile />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </div>

    </div>
  )
}

export default App