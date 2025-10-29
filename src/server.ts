import express from 'express';
import cors from "cors";

import feriasRoutes from './modules/ferias/feriasRoutes';
import rescisaoRoutes from "./modules/rescisao/rescisaoRoutes";
import horasExtrasRoutes from './modules/horasExtras/horasExtrasRoutes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rotas doS móduloS
app.use('/api/ferias', feriasRoutes);
app.use("/api", rescisaoRoutes);
app.use('/api', horasExtrasRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

export default app;