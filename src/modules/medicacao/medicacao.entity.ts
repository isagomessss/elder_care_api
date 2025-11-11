import { Timestamp } from 'firebase-admin/firestore';

export class MedicacaoEntity {
  id?: string;
  idosoId: string;
  cuidadorId: string;
  nome: string;
  descricao: string;
  horario: string; // ex: "08:00"
  inicio: Timestamp;
  fim: Timestamp;
  ativa: boolean;
  ultimaNotificacao?: Timestamp | null;
  retiradaManualEm?: Timestamp | null;
  motivoRetirada?: string | null;
}
