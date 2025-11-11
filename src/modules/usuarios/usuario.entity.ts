// src/modules/users/user.model.ts
export interface Usuario {
  cpf: string;
  dataCadastro: FirebaseFirestore.Timestamp;
  dataNascimento: FirebaseFirestore.Timestamp;
  email: string;
  endereco: string;
  fotoUrl: string;
  nome: string;
  telefone: string;
  tipo: 'Cuidador' | 'Responsável' | 'Admin';
}