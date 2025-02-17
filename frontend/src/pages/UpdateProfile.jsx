
import React, { useState } from 'react'
import Form from '../components/FormInput'
import { useDispatch, useSelector } from 'react-redux'
import { updateFailure, updateStart, updateSuccess } from '../redux/user/userSlice'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'

const UpdateProfile = () => {

  const dispatcher = useDispatch()
  const navigate = useNavigate()
  const { currentUser, isLoading } = useSelector((state) => state.user)
  const [formData, setFormData] = useState({
    name: currentUser.name,
    username: currentUser.username,
    email: currentUser.email,
    password: currentUser.passowrd
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
    try {
      dispatcher(updateStart())
      toast.loading("Updating...")
      const res = await fetch(`/user/data/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (data.success === false) {
        dispatcher(updateFailure(data.message))
        toast.error(data.message)
        return
      }
      dispatcher(updateSuccess(data))
      toast.success("Updated successfully")
      navigate("/profile")


    } catch (error) {
      dispatcher(updateFailure(error.message))
      toast.error(error.message)
      return
    }
  }

  return (
    <div className='mt-20 max-w-lg'>
    <Header
    title="User info <update/>"
    subtitle="Update your credentials"
    />
      <form className='flex flex-col gap-3 w-full' onSubmit={handleSubmitData}>
        <Form type="text" placeholder="Update name" value={currentUser.name} name="name" onChange={handleChange} />
        <Form type="text" placeholder="Update username" value={currentUser.username} name="username" onChange={handleChange} />
        <Form r={true} type="email" placeholder=""  value={currentUser.email} name="email" onChange={handleChange} />
        <Form type="password" placeholder="Set password" value="" name="password" onChange={handleChange} />
        <div className="flex justify-end mt-5">
          <button type='submit' className={` py-2 px-3 rounded-md  font-semibold text-sm cursor-pointer ${isLoading ? "bg-green-300 text-black" : "bg-indigo-500 text-white"}`}>{isLoading ? "Updating ..." : "Update"}</button>
        </div>
      </form>
    </div>
  )
}

export default UpdateProfile