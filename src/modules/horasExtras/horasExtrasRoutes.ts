import { Router } from "express";
import { HorasExtrasController } from "./horasExtrasController";

const router = Router();
const controller = new HorasExtrasController();

router.post("/horas-extras", controller.calcular);

export default router;
