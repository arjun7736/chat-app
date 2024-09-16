import mongoose,{Schema,Document} from "mongoose";

export interface IUser{
    email:string,
    password:string,
    profilePicture:string
}

const UserSchema =new Schema<IUser>({
    email:{
        type:String,
        required:true,
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