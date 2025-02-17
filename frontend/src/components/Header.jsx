import React from 'react'

const Header = ({ title, subtitle }) => {
    return (
        <div>
            <div className='pb-6'>
                <h1 className='text-3xl font-bold'>{title}</h1>
                <p className='pt-2 text-gray-600'>{subtitle}</p>
            </div>
        </div>
    )
}

export default Header