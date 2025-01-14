//7 file
import mongoose,{Schema} from "mongoose";
import Jwt  from "jsonwebtoken";
import bcrypt from "bcrypt"//this is used for encryption for ex passward

const userSchema = new Schema(
    {
        username:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim:true,
            index: true
        },
        email:{
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim:true,
        },
        fullname:{
            type: String,
            required: true,
            trim:true,
            index: true
        },
        avatar: {
            type: String, //cloudinary url
            required: true,
        },
        coverImage: {
            type:String,// cloudinary url  just like aws
        },
        watchHistory: [
            {
            type: Schema.Types.ObjectIdectId,
            ref:"video"
            }
        ],
        password:{
            type: String,
            required: [true, 'Password is required']
        },
        refereshToken: {
            type:string
        }
        


    },
    {
        timestamps: true     
     }
)

userSchema.pre("save", async function (next) { 
    if(! this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.generateAccessToken= function(){
    return Jwt.sign(
        {//this is the payload portion
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname:this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,//this is the signature protion
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY//this is the expiry time
        }
    )
}
userSchema.methods.generateRefreshToken= function(){
        return Jwt.sign(
    {
        _id: this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFERESH_TOKEN_EXPIRY
    }
)}

export const User = mongoose.model("User",userSchema)


//line no 58:-here pre is a hook by mongoose which helps to perform some functonaliya before saving (as we wave sent a parameter save in the pre methord)
//line no 59:-this line chech if the password is not modified then just return next() due to this the enctyption is applied in only that case when the password is modified if we will not do this then whenever we will save any component of userSchema  in that case it will encrypt the password ex: if we change the coverphoto before saving it will encrypt the password which is unessecery.
//note:- isModifed () is a function provide by mongose which checks if any object is modified
//line no 60:-this bcrypt function encrypts the password and 10 is the no of rounds of hashing performed

// line 65: in this we are gererating access token in which the .sign() is the signature protion of jwt tokens where we need to pass some detail of the user , secret key which we store in .env folder and the expiery time.
//line 78: it is used to generate refresh token whole process is same as the access token just its refresh time is more in comparison to access token