import { HorasExtrasInput, HorasExtrasOutput } from "./horasExtrasEntity";

export class HorasExtrasService {
  calcularHorasExtras(dados: HorasExtrasInput): HorasExtrasOutput {
    const {
      salarioMensal,
      horasExtras,
      percentualAdicional = 50,
      horasMensais = 220,
    } = dados;

    if (salarioMensal <= 0 || horasExtras < 0) {
      throw new Error("Dados inválidos para cálculo de horas extras.");
    }

    const valorHora = salarioMensal / horasMensais;
    const valorHoraExtra = valorHora * (1 + percentualAdicional / 100);
    const totalHorasExtras = valorHoraExtra * horasExtras;
    const salarioComHorasExtras = salarioMensal + totalHorasExtras;

    return {
      valorHora: parseFloat(valorHora.toFixed(2)),
      valorHoraExtra: parseFloat(valorHoraExtra.toFixed(2)),
      totalHorasExtras: parseFloat(totalHorasExtras.toFixed(2)),
      salarioComHorasExtras: parseFloat(salarioComHorasExtras.toFixed(2)),
    };
  }
}
