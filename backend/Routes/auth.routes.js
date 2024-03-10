import express from "express";
import signUp from "../controllers/auth/signUp.js";
import login from "../controllers/auth/login.js";
import logout from "../controllers/auth/logout.js";

const router = express.Router();

router.post("/login", login);

router.post("/logout", logout);

router.post("/signup", signUp);

export default router;
