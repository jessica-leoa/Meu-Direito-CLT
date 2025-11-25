import { Router } from "express";
import { askChatbot } from "./chatbotController";

const router = Router();

router.post("/chatbot", askChatbot);

export default router;