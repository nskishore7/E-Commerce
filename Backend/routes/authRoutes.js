import express from "express"
import { addUser, loginUser } from "../controller/authController.js";

const authRouters = express.Router()

//add user
authRouters.post("/add",addUser)


//login user
authRouters.post("/login",loginUser)

export default authRouters;