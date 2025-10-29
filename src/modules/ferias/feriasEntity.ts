export interface FeriasInput {
  salario: number;
  mesesTrabalhados: number;
}

export interface FeriasResult {
  valorFerias: number;
  valorUmTerco: number;
  totalReceber: number;
  diasDeFerias: number;
  prazoPagamento: string;
}
