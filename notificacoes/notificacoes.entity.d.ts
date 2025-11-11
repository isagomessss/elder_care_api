export interface Notificacoes {
    dataEnvio: FirebaseFirestore.Timestamp;
    lida: boolean;
    mensagem: string;
    titulo: string;
    usuarioId: string;
    tarefaId: string;
    tipo?: string;
}
