import { MedicacaoService } from './medicacao.service';
import { CreateMedicacaoDto, RetirarMedicacaoDto, UpdateMedicacaoDto } from './medicacao.dto';
export declare class MedicacaoController {
    private readonly service;
    constructor(service: MedicacaoService);
    create(dto: CreateMedicacaoDto): Promise<{
        id: string;
        message: string;
    }>;
    findByIdoso(idosoId: string): Promise<{
        id: string;
    }[]>;
    gerarNotificacoesDoDia(): Promise<{
        message: string;
    }>;
    update(id: string, dto: UpdateMedicacaoDto): Promise<{
        message: string;
    }>;
    retirar(id: string, dto: RetirarMedicacaoDto): Promise<{
        message: string;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
