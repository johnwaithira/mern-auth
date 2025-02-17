import jwt from "jsonwebtoken"
import User from "../models/user.model.js"
import bcryptjs from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

const createUser = async (req, res) => {
    const { name, email, password } = req.body

    const hashedPassword = bcryptjs.hashSync(password, 10)

    try {
        const findUser = await User.findOne({ email })
        if (findUser) {
            return res.status(300).json(
                {
                    success: false,
                    message: "Email already registerd"
                }
            );
        }
        const newUser = new User({
            name,
            email,
            username: name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
            password: hashedPassword
        })
        await newUser.save();
        res.status(200).json(
            {
                success: true,
                message: "User created successfully"
            }
        );


    } catch (error) {
        res.status(202).json(
            {
                success: false,
                message: error.message
            }
        );

    }
}

const userLogin = async (req, res) => {
    const { email, password } = req.body
    try {
        const validUser = await User.findOne({ email })

        if (!validUser) {
            return res.status(404).json({
                success: false,
                message: "Wrong credentials"
            })
        }
        const validPwd = bcryptjs.compareSync(password, validUser.password)
        if (!validPwd) {
            return res.status(400).json({ success: false, message: "Wrong credentials" })
        }
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET)
        const { password: pass, ...rest } = validUser._doc
        return res.cookie("access_token", token, { httpOnly: true }).status(200).json(rest)

    } catch (error) {
        return res.status(500).json({ success: false, statuscode: 203, message: error.message })
    }


}

const Google = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            const { password: pass, ...rest } = user._doc
            return res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest)
        } else {
            const pwd = Math.random().toString(36).slice(-8)
            const hashPwd = bcryptjs.hashSync(pwd, 10)
            const newUser = new User({
                name: req.body.name,
                username: req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
                email: req.body.email,
                password: hashPwd
            })

            await newUser.save()

            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET)
            const { password: pass, ...rest } = newUser._doc
            return res.cookie("access_token", token, {
                httpOnly: true
            }).status(200).json(rest)
        }

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: `"Failed to Authenticate with google"${error.message}`
        })
    }
}

const logout = async (req, res, next) => {
    try {
        res.clearCookie("access_token", {
            httpOnly: true,
            secure: true, // Ensure this matches the cookie's secure flag
            path: '/',
        });
        return res.status(200).json({ success: true, message: "Signed out" })
    } catch (error) {
        next(error)
    }

}

export { createUser, userLogin, Google, logout }