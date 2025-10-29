import { Request, Response } from "express";
import { FeriasService } from "./feriasService";

const service = new FeriasService();

export const calcularFeriasController = (req: Request, res: Response) => {
  try {
    const result = service.calcularFerias(req.body);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};
