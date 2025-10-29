import { FeriasInput, FeriasResult } from "./feriasEntity";

export class FeriasService {
  calcularFerias({ salario, mesesTrabalhados }: FeriasInput): FeriasResult {
    if (salario <= 0 || mesesTrabalhados <= 0) {
      throw new Error("Os valores de salário e meses trabalhados devem ser positivos.");
    }

    const diasDeFerias = (30 * mesesTrabalhados) / 12;
    const valorFerias = (salario / 12) * mesesTrabalhados;
    const valorUmTerco = valorFerias / 3;
    const totalReceber = valorFerias + valorUmTerco;

    return {
      valorFerias: Number(valorFerias.toFixed(2)),
      valorUmTerco: Number(valorUmTerco.toFixed(2)),
      totalReceber: Number(totalReceber.toFixed(2)),
      diasDeFerias: Number(diasDeFerias.toFixed(1)),
      prazoPagamento: "O pagamento deve ser feito até 2 dias antes do início das férias."
    };
  }
}
