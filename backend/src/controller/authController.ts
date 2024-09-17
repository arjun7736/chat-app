import { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/error";
import UserDB from "../model/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../entities/User";
import { PasswordValidator } from "../utils/passwordValidator";

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      throw new CustomError(400, "Email and password is required");

    const existUser = await UserDB.findOne({ email });
    if (!existUser) throw new CustomError(400, "User not found");

    const valiedPass = await bcrypt.compare(password, existUser.password);
    if (!valiedPass) throw new CustomError(400, "Email or Password is Wrong");

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new CustomError(500, "JWT secret is not defined");

    const token = jwt.sign({ id: existUser._id }, secret, { expiresIn: "1h" });

    res.json({
      token: token,
      user: new User(
        existUser._id,
        existUser.email,
        existUser.profilePicture,
        existUser.phoneNumber,
        existUser.name
      ),
    });
  } catch (error) {
    next(error);
  }
};

export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, confirmPassword } = req.body;
    if (!email || !password || !confirmPassword)
      throw new CustomError(400, "All fields are required");

    if (password !== confirmPassword)
      throw new CustomError(400, "Password and confirm password must be same");

    if (!PasswordValidator(password))
      throw new CustomError(
        400,
        "Try to add uppercase,lowercase,symbol,number in password"
      );

    const existUser = await UserDB.findOne({ email });
    if (existUser) throw new CustomError(400, "User already exist");
    const hashedPassword = await bcrypt.hash(password, 10);

    await UserDB.create({
      email,
      password: hashedPassword,
      profilePicture: "",
    });
    res.json({
      message: "User created successfully",
    });
  } catch (error) {
    next(error);
  }
};
