import express from "express";
import UserController from "../controllers/user.js";
const router = express.Router();

const userController = new UserController();
router.post("/register", userController.userRegister);
router.post("/login", userController.userLogin);

export default router;
