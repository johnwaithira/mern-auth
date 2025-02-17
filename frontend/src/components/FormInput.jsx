import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'

const FormInput = ({
    type,
    placeholder,
    value,
    name,
    onChange,
    hasError,
    err,
    r = false
}) => {

    const [val, setVal] = useState(value)
    const handleChange = (e) => {
        setVal(e.target.value)
        onChange(e)
    }

    return (
        <div>
            <p className='text-red-500'>{
                (hasError && !err) ? (`${name} cannot be empty`) : ("")}</p>
            <input readOnly={r} disabled={r} type={type} value={val} onChange={handleChange} className={`w-full p-2 outline-1 rounded-lg outline-gray-300 focus:outline-indigo-600 ${hasError ? 'outline-red-300' : ''}`} name={name} id={name} placeholder={placeholder} />
        </div>
    )
}

export default FormInput