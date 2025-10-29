export interface HorasExtrasInput {
  salarioMensal: number;     // salário bruto mensal
  horasExtras: number;       // quantidade de horas extras trabalhadas
  percentualAdicional?: number; // adicional percentual (ex: 50%, 100%)
  horasMensais?: number;     // opcional — normalmente 220h mensais
}

export interface HorasExtrasOutput {
  valorHora: number;
  valorHoraExtra: number;
  totalHorasExtras: number;
  salarioComHorasExtras: number;
}
