import { GoogleGenerativeAI, ChatSession } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const INITIAL_HISTORY = [
  {
    role: "user",
    parts: [{ text: `
      Você é o "Assistente Meu Direito CLT", um especialista jurídico em Direito do Trabalho no Brasil.
      
      SUAS REGRAS DE OURO:
      1. Responda APENAS com base na CLT (Consolidação das Leis do Trabalho) e jurisprudências do TST.
      2. Se a pergunta fugir do tema (ex: futebol, receitas), diga educadamente que só trata de leis trabalhistas.
      3. Seja direto, empático e use linguagem simples para trabalhadores leigos.
      4. Sempre que possível, cite o artigo da lei (ex: "Conforme o Art. 482 da CLT...").
      5. ALERTA: Você é uma IA informativa. Para casos complexos ou processos judiciais, sempre recomende um advogado humano.
      
      Você entendeu suas diretrizes?
    ` }]
  },
  {
    role: "model",
    parts: [{ text: "Entendido perfeitamente. Sou o Assistente Meu Direito CLT. Seguirei suas diretrizes estritamente, respondendo apenas sobre legislação trabalhista brasileira de forma clara e citando a lei quando aplicável." }]
  }
];

interface MySession {
  chat: ChatSession;
  lastActivity: number;
}

class ChatbotService {
  private genAI: GoogleGenerativeAI;
  private model: any;
  
  private sessions: Map<string, MySession> = new Map();

  constructor() {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY não configurada no .env");
    }

    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    this.model = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    setInterval(() => this.cleanupSessions(), 10 * 60 * 1000);
  }

  public async ask(sessionId: string, question: string): Promise<string> {

    let session = this.sessions.get(sessionId);

    if (!session) {
      const chat = this.model.startChat({
        history: [...INITIAL_HISTORY], 
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.3, 
        },
      });

      session = { chat, lastActivity: Date.now() };
      this.sessions.set(sessionId, session);
    }

    session.lastActivity = Date.now();

    try {
      const result = await session.chat.sendMessage(question);
      const response = result.response;
      const text = response.text();

      return text;

    } catch (error: any) {
      console.error("Erro na API do Google:", error);
      
      if (error.message?.includes("SAFETY")) {
        return "Desculpe, não posso responder a essa pergunta pois ela viola as diretrizes de segurança da IA.";
      }
      
      if (error.message?.includes("429")) {
        return "Estou recebendo muitas perguntas no momento. Aguarde alguns segundos e tente novamente.";
      }

      return "Desculpe, ocorreu um erro técnico ao processar sua dúvida. Tente novamente.";
    }
  }

  private cleanupSessions() {
    const now = Date.now();
    this.sessions.forEach((session, key) => {
      if (now - session.lastActivity > 30 * 60 * 1000) {
        this.sessions.delete(key);
      }
    });
  }
}

export const chatbotService = new ChatbotService();