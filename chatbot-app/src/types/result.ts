export interface Result<T> {
  sucesso: boolean;
  mensagem: string;
  erros: string[];
  dados: T;
}
