import { Router } from "express";
import upload from "../middlewares/upload";
import chatController from "../controllers/ChatController";

const router = Router();

router.post("/chat/upload-audio", upload.single("audio"), chatController.uploadAudio);

export default router;
 