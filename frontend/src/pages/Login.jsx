import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Form from '../components/FormInput'
import Button from '../components/Button'
import { useDispatch, useSelector } from 'react-redux'
import { signinSuccess, signinStart, signinFailure } from '../redux/user/userSlice'
import toast from 'react-hot-toast'
import AuthUI from '../components/AuthUI'

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  // const [isLoading, setIsLoading] = useState(false)

  const { isLoading, error } = useSelector((state) => state.user)

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const [hasError, setHasError] = useState({
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
    e.preventDefault()
    dispatch(signinStart())
    setHasError({})
    const newError = {}
    if (!formData.email.trim()) {
      newError.email = "Email is required"

    }
    if (!formData.password.trim()) {
      // toast.error(  newError.password)
      newError.password = "Password is required"

    }
    if (Object.keys(newError).length > 0) {
      setHasError(newError)
      toast.error( ` ${newError.email || ""}  ${newError.password || ""}`)
      dispatch(signinFailure(''))
      return
    }

    try {
      toast.loading("Logging in ....")
      const res = await fetch("/user/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
        , body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (data.success === false) {
        dispatch(signinFailure(data.message))
        toast.error(data.message)
        return
      }
      dispatch(signinSuccess(data))
      toast.success("Logged in")
      navigate("/")
    } catch (error) {
      dispatch(signinFailure(data.message))
      toast.error(error.message)
      return
    }
  }

  return (
    <div>
      <AuthUI
        title="Login"
        slogan="Access your account now"
        children={
          <>
            <form className='flex flex-col gap-3 w-full' onSubmit={handleSubmitData}>
              <Form type="text" placeholder="Enter your email" value="" name="email" onChange={handleChange} hasError={!!hasError.email} />
              <Form type="password" placeholder="Enter password" value="" name="password" onChange={handleChange} hasError={!!hasError.password} />
              <div className="flex justify-end mt-5">
                <button type='submit' className={` py-2 px-3 rounded-md  font-semibold text-sm cursor-pointer ${isLoading ? "bg-green-300 text-black" : "bg-indigo-500 text-white"}`}>{isLoading ? "Logging in ..." : "Login"}</button>
              </div>
            </form>
            <Button />
            <p className="flex justify-between">
              <span>Don't have an account?</span>
              <Link className="text-sky-700 font-medium font-bold" to="/register">Register</Link>
            </p>
          </>
        }
      />
    </div>
  )
}

export default Login