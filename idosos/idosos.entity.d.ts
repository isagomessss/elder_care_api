export interface Idosos {
    identificador: number;
    condicoesSaudeIds: string[];
    cpf: string;
    cuidadorId: string;
    responsavelId?: string;
    dataCadastro: FirebaseFirestore.Timestamp;
    dataNascimento: FirebaseFirestore.Timestamp;
    endereco: string;
    fotoBase64?: string | null;
    dataAtualizacaoFoto?: FirebaseFirestore.Timestamp | Date;
    genero: string;
    idade: number;
    nome: string;
    observacoes?: string;
    telefoneEmergencia: string;
}
