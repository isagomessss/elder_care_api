export interface Visita {
  dataVisita: FirebaseFirestore.Timestamp;
  responsavelId: string;
  cuidadorId: string;
  idosoId: string;
  observacoes?: string;
  localVisita: string;
}
