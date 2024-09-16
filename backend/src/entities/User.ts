import mongoose from "mongoose";

export class User{
    constructor(public _id:mongoose.Types.ObjectId,public email:string,public profilePicture:string){}
}