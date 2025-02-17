import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IonIcon } from '@ionic/react'
import { menuOutline } from 'ionicons/icons'
import { useDispatch, useSelector } from 'react-redux'
import { signoutStart, signoutFailure, signoutSuccess } from '../redux/user/userSlice'
import toast from 'react-hot-toast'

const Navbar = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const { currentUser, isLoading } = useSelector((state) => state.user)
    const dispatcher = useDispatch()

    const logout = async () => {
        dispatcher(signoutStart())
        isLoading && toast.loading("Processing...")
        toast.success("Logging out....")
        try {
            const res = await fetch("/user/auth/logout", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json()
            if (data.success === false) {
                dispatcher(signoutFailure(data.message))
                return
            }
            dispatcher(signoutSuccess())
            return
        } catch (error) {
            dispatcher(signoutFailure(error.message))
        }
    }
    // logout()

    return (
        <div className="relative">
            <div className='flex justify-between items-center shadow sm:shadow-none py-4 px-2' >
                <div className=''>
                    <Link className="text-2xl font-bold text-sky-500" onClick={() => setIsMenuOpen(false)} to="/">MERN-auth</Link>
                </div>
                <div className='hidden sm:block '>
                    {
                        currentUser ? (
                            
                            <ul className='flex items-center gap-4'>
                                <Link className='font-bold rounded-full h-10 w-10 flex items-center justify-center bg-sky-200  hover:text-sky-500' to="/profile">{
                                    currentUser.name.split(" ").map((n)=>n[0]).join("").toUpperCase().slice(0,2)
                                }</Link>
                                <Link className='hover:text-sky-500' onClick={logout}>Logout</Link>
                            </ul>
                        ) : (
                            <ul className='flex gap-4'>
                                <Link className='hover:text-sky-500' to="/register">Register</Link>
                                <Link className='hover:text-sky-500' to="/login">Login</Link>
                            </ul>
                        )

                    }
                </div>

                <div onClick={() => setIsMenuOpen(!isMenuOpen)} className='sm:hidden bg-gray-100 px-2 flex items-center rounded-[5px] cursor-pointer hover:bg-blue-300' aria-controls='mobile-menu' aria-expanded="false">
                    <IonIcon className='text-3xl' icon={menuOutline} />
                </div>
            </div>
            {/* Mobile menu */}
            {
                isMenuOpen &&
                <div className='sm:hidden bg-white h-[100vh] p-3 left-0 w-full  z-50' id='mobile-menu' >
                    <ul className='flex flex-col gap-2'>
                        <Link to="/register" onClick={() => setIsMenuOpen(false)}>Register</Link>
                        <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
                    </ul>
                </div>
            }
        </div>
    )
}

export default Navbar