import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const Auth = () => {
    const { currentUser } = useSelector((state)=>state.user)
  return (
    <>
    {
        currentUser ? <Navigate to='/profile'/>: <Outlet/>
    }
    </>
  )
}

export default Auth