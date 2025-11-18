import mongoose from "mongoose"
import User from "../model/user.js"
import { comparePass, createHash } from "../utils/bcrypt.js"
import { createToken } from "../utils/jwt.js"

export const addUser = async(req,res)=>{
    try {
        if(!req.body) return res.status(500).send({message:"can't do without req.body"})
        const {name,email,password} = req.body
        if(!name || !email || !password){
            return res.status(400).send({message:"provide all required field"})
        }else{
            let isUser = await User.findOne({email})
            if(isUser){
                return res.status(400).send({message:"User mail id Already Exists"})
            }else{
                let hashedPassword = createHash(password)
                let userDetails = new User({...req.body,password:hashedPassword})
               await userDetails.save()

               return res.status(201).send({message:"user created successfully"})
            }
        }
    } catch (error) {
        return res.status(500).send({message:"Something went wrong",error:error.message})
    }
}

export const loginUser = async(req,res)=>{
    try {
        if(!req.body) return res.status(500).send({message:"can't do without req.body"})
        
            const {email,password} = req.body;

            if(!email || !password){
                return res.status(400).send({message:"provide all required field"})
            }else{
                let user = await User.findOne({email})
                if(user){
                    let isMatched = comparePass(password,user.password)
                    if(!isMatched){
                        return res.status(400).send({message:"wrong password"})
                    }else{
                        let token = createToken({id:user._id})
                        res.cookie("token",token)
                        return res.status(200).send({message:"login successfully"})
                    }
                }else{
                    return res.status(400).send({message:"Register first"})
                }
            }

    } catch (error) {
        return res.status(500).send({message:"Something went wrong",error:error.message})
    }
}