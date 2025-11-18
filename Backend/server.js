import express from "express"
import cors from "cors"
import dbConnection from "./config/dbConfig.js"
import authRouters from "./routes/authRoutes.js"
import cookieParser from "cookie-parser"


const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())


app.use("/api/v2/auth",authRouters)

dbConnection()


app.listen(7000,()=>{
    console.log("server started at http://localhost:7000")
})