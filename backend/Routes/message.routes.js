import express from "express";
import sendMessage from "../controllers/messages/send.js";
import getMessages from "../controllers/messages/get.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

export default router;
