import { Router } from "express";
import { calcularFeriasController } from "./feriasController";

const router = Router();

router.post("/simulador/ferias", calcularFeriasController);

export default router;
