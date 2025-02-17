import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Form from '../components/FormInput'
import toast from 'react-hot-toast'
import Button from '../components/Button'
import AuthUI from '../components/AuthUI'


const Register = () => {

  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const [hasError, setHasError] = useState({
    name: "",
    email: "",
    password: ""
  })

  const handleChange = (e) => {
    const { id, value } = e.target
    setFormData({
      ...formData,
      [id]: value
    })
  }


  const handleSubmitData = async (e) => {
    setIsLoading(true)
    isLoading && toast.loading("Processing...")
    e.preventDefault()
    const newError = {}

    if (!formData.name.trim()) {
      newError.name = "Name field required"
      toast.error(newError.name)
    }
    if (!formData.email.trim()) {
      newError.password = "Password cannot be empty"
      toast.error(newError.password)
    }
    if (!formData.email.trim()) {
      newError.email = "Email field required"
      toast.error(newError.name)
    }

    if (Object.keys(newError).length > 0) {
      setHasError(newError)
      setIsLoading(false)
      return
    }
    setHasError({})
    console.log(formData);

    try {
      setIsLoading(true)

      const res = await fetch("/user/auth/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()

      if (data.success === false) {
        setIsLoading(false)
        toast.error(data.message)
        return
      }
      setFormData({})
      setIsLoading(false)
      toast.success(data.message)
      setTimeout(() => {
        navigate("/login")
      }, 2000)
    } catch (error) {
      toast.error(error.message)
      setIsLoading(false)
    }

    setIsLoading(false)
  }

  return (
    <>
      <AuthUI
        title="Register"
        slogan="Create your account now"
        children={
          <>

            <form className='flex flex-col gap-3 w-full' onSubmit={handleSubmitData}>
              <Form type="text" placeholder="Enter your Full Name" value="" name="name" onChange={handleChange} hasError={!!hasError.name} />
              <Form type="email" placeholder="Enter your email" value="" name="email" onChange={handleChange} hasError={!!hasError.email} />
              <Form type="password" placeholder="Enter password" value="" name="password" onChange={handleChange} hasError={!!hasError.password} />
              <div className="flex justify-end mt-5">
                <button type='submit' className={` py-2 px-3 rounded-md  font-semibold text-sm cursor-pointer ${isLoading ? "bg-green-300 text-black" : "bg-indigo-500 text-white"}`}>{isLoading ? "Creating ..." : "Create"}</button>
              </div>
            </form>
            <Button />
            <p className="flex justify-between">
              <span>Already have an account?</span>
              <Link className="text-sky-700 font-bold" to="/login">Login</Link>
            </p>
          </>
        }
      />
    </>
  )
}

export default Register