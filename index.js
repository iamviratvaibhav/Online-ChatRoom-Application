import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import userRoute from './routes/user.router.js'
import messagesRoute from './routes/messeges.route.js'
import cors from 'cors'
import { app, server } from './SocketIO/server.js'


dotenv.config()
const PORT=process.env.PORT ||5000
const URI=process.env.MONGODB_URI

try {
    mongoose.connect(URI);
    console.log('Database connected')
} catch (error) {
    console.log(error)
}
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use("/api/user", userRoute);
app.use("/api/user", messagesRoute);


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
