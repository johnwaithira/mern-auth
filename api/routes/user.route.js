import express from 'express'
import { verifyToken } from '../utils/verifyToken.js'
import { updateUser, deleteUser } from '../controllers/user.controller.js'

const userroute = express.Router()

userroute.post("/update/:id", verifyToken, updateUser)
userroute.delete("/delete/:id", verifyToken, deleteUser)

export default userroute