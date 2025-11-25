import { Request, Response } from "express";
import { chatbotService } from "./chatbotService";

export const askChatbot = async (req: Request, res: Response) => {
  try {
    const { sessionId, question } = req.body;

    if (!question) {
      res.status(400).json({ error: "A pergunta é obrigatória." });
      return;
    }

    const id = sessionId || "default-session";
    const answer = await chatbotService.ask(id, question);

    res.json({ answer });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro interno." });
  }
};