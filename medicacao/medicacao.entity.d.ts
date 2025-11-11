import { Timestamp } from 'firebase-admin/firestore';
export declare class MedicacaoEntity {
    id?: string;
    idosoId: string;
    cuidadorId: string;
    nome: string;
    descricao: string;
    horario: string;
    inicio: Timestamp;
    fim: Timestamp;
    ativa: boolean;
    ultimaNotificacao?: Timestamp | null;
    retiradaManualEm?: Timestamp | null;
    motivoRetirada?: string | null;
}
