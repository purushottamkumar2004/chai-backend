//2 file
import { DB_NAME } from "../constants.js";
import mongoose from "mongoose";


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect
            (`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`\n Mongodb connected !! DB HOST: 
               ${connectionInstance.connection.host}`)//this displays that we are
        // connected to database.
    } catch (error) {
        console.log("MONGODB connection failed", error)  //error handling
        process.exit(1)
    }
}

export default connectDB;