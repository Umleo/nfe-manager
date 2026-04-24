export interface ProdutoNfe {
  id: string;
  item: number;
  descricao_produto: string;
  quantidade: number;
  valor_unitario: number;
  valor_total: number;
}

export interface Nfe {
  chave: string;
  razao_social: string;
  numero: number;
  data_dia: string;
  produtos: ProdutoNfe[];
}
