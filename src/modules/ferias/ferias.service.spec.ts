import { FeriasService } from "./feriasService";

describe("FeriasService", () => {
  const service = new FeriasService();

  it("deve calcular corretamente as férias proporcionais", () => {
    const result = service.calcularFerias({ salario: 3000, mesesTrabalhados: 6 });

    expect(result.valorFerias).toBeCloseTo(1500);
    expect(result.valorUmTerco).toBeCloseTo(500);
    expect(result.totalReceber).toBeCloseTo(2000);
    expect(result.diasDeFerias).toBeCloseTo(15);
    expect(result.prazoPagamento).toContain("2 dias");
  });

  it("deve lançar erro para salário ou meses inválidos", () => {
    expect(() => service.calcularFerias({ salario: 0, mesesTrabalhados: 12 })).toThrow();
    expect(() => service.calcularFerias({ salario: 2000, mesesTrabalhados: -2 })).toThrow();
  });
});
