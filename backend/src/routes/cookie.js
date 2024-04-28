import express from "express";
import CookieController from "../controllers/cookie.js";
const router = express.Router();

const cookieController = new CookieController();

router.get("/cookies", cookieController.getAllCookies);
router.get("/cookies/:id", cookieController.getCookieDetail);
router.post("/cookies", cookieController.createCookie);
router.put("/cookies/:id", cookieController.updateCookie);
router.delete("/cookies/:id", cookieController.deleteCookie);

export default router;
