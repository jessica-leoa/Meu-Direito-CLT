import { Request, Response } from "express";
import { RescisaoService } from "./rescisaoService";

export class RescisaoController {
  private service = new RescisaoService();

  calcular = (req: Request, res: Response): Response => {
    try {
      const resultado = this.service.calcularRescisao(req.body);
      return res.json(resultado);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };
}
