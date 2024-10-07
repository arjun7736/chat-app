import express from "express"
import { removeProfileImage, updateImage, updateProfile } from "../controller/userController"
import multer from "multer"

const router= express.Router()

const upload =multer({dest:"uploads/profiles/"})

router.post("/updateProfile",updateProfile)
router.post("/updateImage",upload.single("profilePicture"),updateImage)
router.delete("/deleteImage",removeProfileImage)

export default router
