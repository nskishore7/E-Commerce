import mongoose from "mongoose"



async function dbConnection(){
   try {
    await mongoose.connect("mongodb://localhost:27017/E-commerce")
    console.log("db connection successful")
   } catch (error) {
    console.log("db connection failed")
   }
}

export default dbConnection