import dotenv from "dotenv"
import connectDB from "./db/indexdb.js"



dotenv.config({               //this is just a simple function written to import .env 
    path: './env'            //file properly

})

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`server is running at port : ${process.env.PORT}`)
    })
})
.catch((err)=>{
    console .log("Mongo Db connction failed",err);
})