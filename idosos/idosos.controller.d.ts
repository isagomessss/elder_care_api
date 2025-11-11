import { IdososService } from './idosos.service';
import { IdososDto } from './idosos.dto';
import type { Idosos } from './idosos.entity';
declare class AtualizarFotoBase64Dto {
    fotoBase64: string | null;
}
export declare class IdososController {
    private readonly idososService;
    constructor(idososService: IdososService);
    create(dto: IdososDto): Promise<{
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
        id: string;
    }>;
    findByCuidador(cuidadorId: string): Promise<any[]>;
    vincularIdoso(data: {
        identificador: number;
        responsavelId: string;
    }): Promise<{
        message: string;
    }>;
    atualizarFotoBase64(id: string, body: AtualizarFotoBase64Dto): Promise<any>;
    findAll(): Promise<any[]>;
    findByResponsavel(responsavelId: string): Promise<{
        id: string;
    }[]>;
    findOne(id: string): Promise<any>;
    update(id: string, data: Partial<Idosos>): Promise<any>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
export {};
