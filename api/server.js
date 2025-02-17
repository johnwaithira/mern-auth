import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import authrouter from './routes/auth.route.js'
import cookieParser from 'cookie-parser'
import userrouter from './routes/user.route.js'

dotenv.config()

const app = express()


// Middleware 
app.use(express.json());
app.use(cookieParser())

const port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`)
    connectDB()
})



app.use("/user/auth", authrouter)
app.use("/user/data", userrouter)


// Error hnadling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success : false,
        statusCode,
        message
    });
});
