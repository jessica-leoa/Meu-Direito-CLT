import { RescisaoInput, RescisaoOutput } from "./rescisaoEntity";

export class RescisaoService {
  calcularRescisao(dados: RescisaoInput): RescisaoOutput {
    const { salarioMensal, mesesTrabalhados, avisoPrevioIndenizado = false, tipoRescisao } = dados;

    if (salarioMensal <= 0 || mesesTrabalhados < 0 || mesesTrabalhados > 12) {
      throw new Error("Dados inválidos para cálculo da rescisão.");
    }

    // --- Verbas básicas ---
    const saldoSalario = (salarioMensal / 30) * 15; // Exemplo: 15 dias trabalhados
    const decimoTerceiroProporcional = (salarioMensal / 12) * mesesTrabalhados;
    const feriasProporcionais = (salarioMensal / 12) * mesesTrabalhados;
    const umTercoFerias = feriasProporcionais / 3;
    const avisoPrevio = avisoPrevioIndenizado ? salarioMensal : 0;

    // --- FGTS e multa ---
    const baseFGTS = saldoSalario + decimoTerceiroProporcional + feriasProporcionais + avisoPrevio;
    const depositoFGTS = baseFGTS * 0.08;
    const multaFGTS = tipoRescisao === "sem_justa_causa" ? depositoFGTS * 0.4 : 0;

    // --- Total bruto ---
    const totalBruto =
      saldoSalario +
      decimoTerceiroProporcional +
      feriasProporcionais +
      umTercoFerias +
      avisoPrevio +
      multaFGTS;

    // --- Descontos ---
    const inss = this.calcularINSS(totalBruto);
    const irrf = this.calcularIRRF(totalBruto - inss);

    const totalLiquido = totalBruto - inss - irrf;

    // --- Saída formatada ---
    return {
      resumo: [
        { verba: "Saldo de salário", valor: saldoSalario },
        { verba: "13º proporcional", valor: decimoTerceiroProporcional },
        { verba: "Férias proporcionais", valor: feriasProporcionais },
        { verba: "1/3 de férias", valor: umTercoFerias },
        { verba: "Aviso prévio indenizado", valor: avisoPrevio },
        { verba: "Multa de 40% do FGTS", valor: multaFGTS },
      ],
      descontos: [
        { tipo: "INSS", valor: inss },
        { tipo: "IRRF", valor: irrf },
      ],
      totalBruto,
      totalLiquido,
    };
  }

  // --- Cálculo do INSS baseado nas faixas progressivas ---
  private calcularINSS(base: number): number {
    if (base <= 1412) return base * 0.075;
    if (base <= 2666.68) return base * 0.09;
    if (base <= 4000.03) return base * 0.12;
    if (base <= 7786.02) return base * 0.14;
    return 7786.02 * 0.14;
  }

  // --- Cálculo do IRRF baseado nas faixas 2024 ---
  private calcularIRRF(base: number): number {
    if (base <= 2259.20) return 0;
    if (base <= 2826.65) return base * 0.075 - 169.44;
    if (base <= 3751.05) return base * 0.15 - 381.44;
    if (base <= 4664.68) return base * 0.225 - 662.77;
    return base * 0.275 - 896;
  }
}
