//file no 10
import multer from "multer";
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, "./public/temp")
    },
    filename: function (req,file,cb) {
        cb(null, file.originalname)
    }  
    })
    export const upload = multer({
        storage,
    
})


//the above code helps to manage the files thet we get rom the user as a request