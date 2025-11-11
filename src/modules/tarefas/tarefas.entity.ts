export interface Tarefas {
    cuidadorId: string;
    dataHora: FirebaseFirestore.Timestamp;
    descricao: string;
    idosoId: string;
    status: 'Pendente' | 'Concluida' | 'Atrasada';
    titulo: string;
}