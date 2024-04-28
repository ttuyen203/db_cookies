import User from "../models/user.js";
import { loginValid, registerValid } from "../validations/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

class UserController {
  async userRegister(req, res) {
    try {
      const { username, email, password } = req.body;
      const { error } = registerValid.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).json({
          message: errors,
        });
      }

      const emailValid = await User.findOne({ email });
      if (emailValid) {
        return res.status(400).json({
          message: "Email đã được đăng ký",
        });
      }

      const hashPassword = await bcryptjs.hash(password, 10);

      const newUser = await User.create({
        username,
        email,
        password: hashPassword,
      });

      return res.status(201).json({
        message: "Đăng ký thành công",
        data: newUser,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }

  async userLogin(req, res) {
    try {
      const { email, password } = req.body;
      const { error } = loginValid.validate(req.body, {
        abortEarly: false,
      });
      if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(400).json({
          message: errors,
        });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          message: "Email chưa được đăng ký",
        });
      }

      const isPassword = await bcryptjs.compare(password, user.password);
      if (!isPassword) {
        return res.status(400).json({
          message: "Mật khẩu không chính xác",
        });
      }

      const token = jwt.sign({ userId: user._id }, "hii", {
        expiresIn: "1h",
      });

      return res.status(200).json({
        message: "Đăng nhập thành công",
        token: token,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}

export default UserController;
