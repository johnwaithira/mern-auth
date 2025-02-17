import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'

const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(401, "You can only update your own account"))
    }
    try {
        if (req.body.password) {
            req.body.password = bcryptjs.hashSync(req.body.password, 10)
        }
        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                name: req.body.name,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            }
        }, { new: true })
        const { password, ...rest } = updateUser._doc
        return res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}

const deleteUser = async (req, res, next) => {
    if(req.user.id != req.params.id)
    {
        return next(errorHandler(401, "Unathorized"))
    }
    try {
        const delUser = await User.findByIdAndDelete(req.params.id)
        return res.status(200).json({
            success: true,
            message: "Account deleted successfully"
        })
        
    } catch (error) {
        next(errorHandler(402, error.message))
    }
}

export { updateUser, deleteUser }