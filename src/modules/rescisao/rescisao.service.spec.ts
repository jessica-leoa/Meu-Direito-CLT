import request from "supertest";
import express from "express";
import rescisaoRoutes from "./rescisaoRoutes";

const app = express();
app.use(express.json());
app.use("/api", rescisaoRoutes);

describe("POST /api/rescisao", () => {
  it("deve calcular corretamente a rescisão sem justa causa com aviso prévio", async () => {
    const response = await request(app)
      .post("/api/rescisao")
      .send({
        salarioMensal: 3000,
        mesesTrabalhados: 6,
        avisoPrevioIndenizado: true,
        tipoRescisao: "sem_justa_causa"
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("resumo");
    expect(response.body).toHaveProperty("descontos");
    expect(response.body).toHaveProperty("totalBruto");
    expect(response.body).toHaveProperty("totalLiquido");

    const resumo = response.body.resumo;
    const verbas = resumo.map((r: any) => r.verba);

    expect(verbas).toEqual(
      expect.arrayContaining([
        "Saldo de salário",
        "13º proporcional",
        "Férias proporcionais",
        "1/3 de férias",
        "Aviso prévio indenizado",
        "Multa de 40% do FGTS"
      ])
    );

    // Teste aproximado dos totais
    expect(response.body.totalBruto).toBeCloseTo(8240, 0);
    expect(response.body.totalLiquido).toBeLessThan(response.body.totalBruto);
  });

  it("deve retornar erro quando os dados forem inválidos", async () => {
    const response = await request(app)
      .post("/api/rescisao")
      .send({
        salarioMensal: 0,
        mesesTrabalhados: -2,
        tipoRescisao: "sem_justa_causa"
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });

  it("deve calcular corretamente pedido de demissão sem aviso prévio", async () => {
    const response = await request(app)
      .post("/api/rescisao")
      .send({
        salarioMensal: 2500,
        mesesTrabalhados: 8,
        avisoPrevioIndenizado: false,
        tipoRescisao: "pedido_demissao"
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("totalLiquido");
    expect(typeof response.body.totalLiquido).toBe("number");

    // Total líquido menor que o total bruto
    expect(response.body.totalLiquido).toBeLessThan(response.body.totalBruto);
  });
});
