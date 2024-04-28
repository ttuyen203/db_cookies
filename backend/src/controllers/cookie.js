import Cookie from "../models/cookie.js";

class CookieController {
  async getAllCookies(req, res) {
    try {
      const cookies = await Cookie.find({});
      return res.status(200).json({
        message: "Lấy tất cả cookie thành công",
        data: cookies,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
  async getCookieDetail(req, res) {
    try {
      const cookie = await Cookie.findById(req.params.id);
      if (!cookie) {
        return res.status(404).json({
          message: "Không tìm thấy cookie",
        });
      }
      return res.status(200).json({
        message: "Lấy chi tiết cookie thành công",
        data: cookie,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
  async createCookie(req, res) {
    try {
      const cookie = await Cookie.create(req.body);
      if (!cookie) {
        return res.status(404).json({
          message: "Không tìm thấy cookie",
        });
      }
      return res.status(201).json({
        message: "Thêm cookie thành công",
        data: cookie,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
  async updateCookie(req, res) {
    try {
      const cookie = await Cookie.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!cookie) {
        return res.status(404).json({
          message: "Không tìm thấy cookie",
        });
      }
      return res.status(200).json({
        message: "Sửa cookie thành công",
        data: cookie,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
  async deleteCookie(req, res) {
    try {
      const cookie = await Cookie.findByIdAndDelete(req.params.id);
      if (!cookie) {
        return res.status(404).json({
          message: "Không tìm thấy cookie",
        });
      }
      return res.status(200).json({
        message: "Xóa cookie thành công",
        data: cookie,
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message,
      });
    }
  }
}

export default CookieController;
