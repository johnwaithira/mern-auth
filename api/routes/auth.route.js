import express from 'express'
import { createUser, userLogin , Google, logout} from '../controllers/auth.controller.js'


const authrouter = express.Router()

authrouter.post('/create', createUser)
authrouter.post('/login', userLogin)
authrouter.post('/google', Google)
authrouter.get('/logout', logout )

export default authrouter