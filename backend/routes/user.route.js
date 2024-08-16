import express from "express";
import { singup, signin } from "../controllers/user.controller.js";

const router = express.Router()

router.post('/singup' , singup)
router.post('/signin', signin)

export default router