export type TipoRescisao = "sem_justa_causa" | "pedido_demissao" | "justa_causa";

export interface RescisaoInput {
  salarioMensal: number;
  mesesTrabalhados: number;
  avisoPrevioIndenizado?: boolean;
  tipoRescisao: TipoRescisao;
}

export interface VerbaItem {
  verba: string;
  valor: number;
}

export interface DescontoItem {
  tipo: string;
  valor: number;
}

export interface RescisaoOutput {
  resumo: VerbaItem[];
  descontos: DescontoItem[];
  totalBruto: number;
  totalLiquido: number;
}
