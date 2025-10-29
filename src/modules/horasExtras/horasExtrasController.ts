import { Request, Response } from "express";
import { HorasExtrasService } from "./horasExtrasService";

export class HorasExtrasController {
  private service = new HorasExtrasService();

  calcular = (req: Request, res: Response): Response => {
    try {
      const resultado = this.service.calcularHorasExtras(req.body);
      return res.json(resultado);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  };
}
