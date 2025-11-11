import { CreateMedicacaoDto, RetirarMedicacaoDto, UpdateMedicacaoDto } from './medicacao.dto';
export declare class MedicacaoService {
    private medicacoes;
    private notificacoes;
    private isSameDay;
    create(dto: CreateMedicacaoDto): Promise<{
        id: string;
        message: string;
    }>;
    gerarNotificacoesDoDia(): Promise<{
        message: string;
    }>;
    findByIdoso(idosoId: string): Promise<{
        id: string;
    }[]>;
    update(id: string, dto: UpdateMedicacaoDto): Promise<{
        message: string;
    }>;
    retirar(id: string, dto: RetirarMedicacaoDto): Promise<{
        message: string;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
