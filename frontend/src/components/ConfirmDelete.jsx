import React, { useEffect, useState } from 'react'
import Header from './Header'

const ConfirmDelete = ({ onConfirm, onCancel, check }) => {


    const [text, setText] = useState("")
    const [del, setDel] = useState(false)

    const handledel = (e) => {
        setText(e.target.value)
    }
    useEffect(() => {
        text === check ? setDel(true) : setDel(false)
    }, [text])
    return (
        <div className='bg-white inset-0 fixed flex justify-center items-center ' >
            <div className='bg-white w-full sm:w-120 rounded-2xl p-5 sm:p-10 m-3 shadow-lg'>
                <div className=''>
                    <Header
                        title="Delete Account!"
                    />
                    <p>Are you sure you want to delete your account?</p>
                    <p className='text-emerald-700 py-2'>Type  <span className='bg-gray-200 p-1 text-black rounded-[5px] select-none'>{check}</span> </p>

                    <div className='pt-3'>
                        <input type="text" onChange={handledel} placeholder={check} name="" id="text" className='outline-1 w-full p-2 outline-gray-300 placeholder-green-900' />
                    </div>

                    <div className='pt-5 flex justify-between'>
                        <button onClick={onCancel} className='bg-gray-700 px-5 py-2 rounded-2xl hover:bg-black text-white cursor-pointer'>Cancel</button>
                        <button onClick={onConfirm} className=' px-5 py-2 rounded-2xl text-white bg-red-700 hover:text-white cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-black' disabled={!del} >Delete</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmDelete