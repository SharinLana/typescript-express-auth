import { Router } from "express";
import { getProtectedPage, getMainPage, getLoginForm, login, logout, requireAuth } from "../controllers/authControllers";

const router = Router();

router.route("/").get(getMainPage);
router.route("/login").get(getLoginForm).post(login)
router.route("/logout").get(logout)
router.route("/protected").get(requireAuth, getProtectedPage)

export default router;
