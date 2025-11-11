// condicoesSaude.entity.ts
export interface CondicaoSaude {
  id?: string;        // opcional, só pra devolver o ID no response
  nome: string;       // exemplo: "Diabetes"
  descricao?: string; // opcional
}
