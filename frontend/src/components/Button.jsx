import React from 'react'
import { logoGoogle, logoGithub } from 'ionicons/icons'
import { IonIcon } from '@ionic/react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { signinSuccess } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Button = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate()

  const handleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)

      const result = await signInWithPopup(auth, provider)
      toast.success("Logging in ....")
      console.log(result);

      const res = await fetch('/user/auth/google', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }, body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email
        })
      })
      const data = await res.json();
      console.log(data);
      
      dispatch(signinSuccess(data))
      navigate("/profile")
    } catch (error) {

    }
  }

  return (
    <div className='py-3'>
      <div>
        <button onClick={handleAuth} className=' w-full mb-3 flex items-center justify-center outline-1 outline-gray-300 py-2 rounded-lg cursor-pointer'>
          <p className='font-bold'>Continue with</p>
          <IonIcon className='text-3xl pl-3' icon={logoGoogle} />
        </button>
        <button className='hidden  w-full mb-3 items-center justify-center outline-1 outline-gray-300 py-2 rounded-lg cursor-pointer'>
          <p className='font-bold'>Continue with</p>
          <IonIcon className='text-3xl pl-3' icon={logoGithub} />
        </button>
      </div>
    </div>
  )
}

export default Button