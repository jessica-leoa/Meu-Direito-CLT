import request from "supertest";
import app from "../../server";

describe("POST /api/horas-extras", () => {
  it("deve calcular corretamente 10 horas extras com adicional de 50%", async () => {
    const response = await request(app)
      .post("/api/horas-extras")
      .send({
        salarioMensal: 3000,
        horasExtras: 10,
        percentualAdicional: 50
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("valorHora");
    expect(response.body).toHaveProperty("valorHoraExtra");
    expect(response.body).toHaveProperty("totalHorasExtras");
    expect(response.body).toHaveProperty("salarioComHorasExtras");

    // Verifica valores aproximados
    expect(response.body.valorHora).toBeCloseTo(13.64, 2);
    expect(response.body.valorHoraExtra).toBeCloseTo(20.45, 2);
    expect(response.body.totalHorasExtras).toBeCloseTo(204.55, 2);
    expect(response.body.salarioComHorasExtras).toBeCloseTo(3204.55, 2);
  });

  it("deve calcular corretamente 5 horas extras com adicional de 100%", async () => {
    const response = await request(app)
      .post("/api/horas-extras")
      .send({
        salarioMensal: 2200,
        horasExtras: 5,
        percentualAdicional: 100
      });

    expect(response.status).toBe(200);
    expect(response.body.valorHoraExtra).toBeCloseTo(20, 2);
    expect(response.body.totalHorasExtras).toBeCloseTo(100, 2);
    expect(response.body.salarioComHorasExtras).toBeCloseTo(2300, 2);
  });

  it("deve retornar erro se o salário for inválido", async () => {
    const response = await request(app)
      .post("/api/horas-extras")
      .send({
        salarioMensal: 0,
        horasExtras: 5
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Dados inválidos para cálculo de horas extras.");
  });

  it("deve retornar erro se a quantidade de horas extras for negativa", async () => {
    const response = await request(app)
      .post("/api/horas-extras")
      .send({
        salarioMensal: 2500,
        horasExtras: -3
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Dados inválidos para cálculo de horas extras.");
  });
});
