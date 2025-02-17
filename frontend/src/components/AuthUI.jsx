import React from 'react'
import pic from '../assets/focus-promo.png'
import Header from './Header'


const AuthUI = ({ title, slogan, children }) => {
    return (
        <div className='pt-10 flex '>
            <div className='px-3 sm:px-0 sm:max-w-md w-full'>
                <Header title={title} subtitle={slogan} />
                {children}
            </div>
            <div className='w-full  hidden sm:p-5 sm:flex sm:items-center sm:justify-center '>
                <div className=''>
                    <img src={pic} />
                </div>
            </div>
        </div>
    )
}

export default AuthUI