import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/error";
import UserDB from "../model/userModel";
import { User } from "../entities/User";
import { renameSync, unlinkSync } from "fs";

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, phoneNumber, id } = req.body;
    if (!name || !phoneNumber)
      throw new CustomError(400, "All field Must be filled");
    const user = await UserDB.findByIdAndUpdate(
      id,
      { name, phoneNumber },
      { new: true }
    );
    if (!user) {
      throw new CustomError(500, "Error While Updating");
    }
    res.json(
      new User(
        user._id,
        user.email,
        user.profilePicture,
        user.phoneNumber,
        user.name
      )
    );
  } catch (error) {
    next(error);
  }
};
export const updateImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    if (!req.file) throw new CustomError(400, "Image Required");
    const date =Date.now()
    let fileName ="uploads/profiles/"+date+req.file.originalname
    renameSync(req.file.path,fileName)
    const user = await UserDB.findByIdAndUpdate(
      req.body.id,
      { profilePicture: fileName},
      { new: true }
    );
    if (!user) throw new CustomError(500, "Error While Updating");
    res.json(
      new User(
        user._id,
        user.email,
        user.profilePicture,
        user.phoneNumber,
        user.name
      )
    );
  } catch (error) {
    next(error);
  }
};

export const removeProfileImage = async(
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {id}=req.body.id
    const user= await UserDB.findById(id)
    if(!user) throw new CustomError(404,"invalied User")
    
    if(user.profilePicture){
      unlinkSync(user.profilePicture)
    }
    user.profilePicture=""
    user.save()
  } catch (error) {
    next(error);
  }
};
