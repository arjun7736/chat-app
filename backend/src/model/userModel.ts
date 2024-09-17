import mongoose,{Schema,Document} from "mongoose";

export interface IUser{
    email:string,
    password:string,
    profilePicture:string,
    phoneNumber:number,
    name:string
}

const UserSchema =new Schema<IUser>({
    email:{
        type:String,
        required:true,
    },
    phoneNumber:{
        type:Number,
    },
    name:{
        type:String,
        default:"Edit Your Name"
    },
    password:{
        type:String,
        required:true
    },
    profilePicture:{
        type:String,
    }
})
export default mongoose.model<IUser>("User",UserSchema)