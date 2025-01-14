//3 file
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))// limit of data that can be recived by form filling
app.use(express.urlencoded({extended: true, limit:"16kb"}))//limit on recived by urls
app.use(express.static("public"))
app.use(cookieParser()) //helps the server to handle the cookies of the browser

import userRouter from './routes/user.routes.js'
app.use("/api/v1/users", userRouter)
export {app}