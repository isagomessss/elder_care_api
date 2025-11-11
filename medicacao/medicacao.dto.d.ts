export declare class CreateMedicacaoDto {
    idosoId: string;
    cuidadorId: string;
    nome: string;
    descricao: string;
    horario: string;
    inicio: string;
    fim: string;
}
export declare class UpdateMedicacaoDto {
    ativa?: boolean;
    descricao?: string;
    horario?: string;
    inicio?: string;
    fim?: string;
}
export declare class RetirarMedicacaoDto {
    motivo?: string;
}
