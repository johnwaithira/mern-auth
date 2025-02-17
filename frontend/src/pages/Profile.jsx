import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ConfirmDelete from "../components/ConfirmDelete";
import { useState } from "react";
import toast from "react-hot-toast";
import { deleteSuccess } from "../redux/user/userSlice";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user)
  const [showPopup, setShowPopup] = useState(false)

  const navigate = useNavigate()

  const dispatcher = useDispatch()

  const handleDelete = async (e) => {
    try {
      toast.loading("Deleting....")
      const res = await fetch(`/user/data/delete/${currentUser._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      })
      const data = await res.json()
      if (data.success === false) {
        toast.error(data.message)
      }
      else {
        setShowPopup(false)
        toast.success(data.message)
        dispatcher(deleteSuccess())
        navigate("/login")
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setShowPopup(false)
    }

  }
  const cancelPop = () => {
    setShowPopup(false)
  }
  return (
    <>
      <div className='mt-5 sm:mt-15 bg-sky-100 shadow-xl sm:max-w-lg px-5 py-10  rounded-[10px] sm:rounded-[20px]'>
        <Header
          title="Account"
          subtitle="My infomartion"
        />
        <div>
          <p className='text-2xl  pb-2 font-serif font-semibold'>{currentUser.name}</p>
          <p style={{
            wordWrap: "break-word"
          }} className='text-wrap w-full text-xl font-mono'> &gt; {currentUser.email}</p>
        </div>

        <div className='mt-10'>
          <button onClick={() => navigate(`/profile/edit/${currentUser._id}`)} className='outline-1 px-10 py-2 cursor-pointer hover:bg-black hover:text-white'>Update</button>
        </div>
      </div>
      {
        showPopup && <ConfirmDelete
          check={`mern-auth/${currentUser.username}/${new Date().getFullYear()}`}
          onCancel={cancelPop}
          onConfirm={handleDelete}
        />
      }
      <div className="pt-10 ">
        <button className="bg-red-400 p-3 cursor-pointer hover:bg-red-600 text-white" onClick={() => setShowPopup(true)}>Delete</button>

      </div>
    </>

  )
}

export default Profile