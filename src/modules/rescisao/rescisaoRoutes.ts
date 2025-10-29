import { Router } from "express";
import { RescisaoController } from "./rescisaoController";

const router = Router();
const controller = new RescisaoController();

router.post("/rescisao", controller.calcular);

export default router;
