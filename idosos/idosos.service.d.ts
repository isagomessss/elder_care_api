import { Idosos } from './idosos.entity';
import { IdososDto } from './idosos.dto';
export declare class IdososService {
    private collection;
    private toTimestamp;
    setFotoBase64(id: string, fotoBase64: string | null): Promise<any>;
    gerarIdentificadorUnico(): Promise<number>;
    private calcularIdade;
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
    findByIdentificador(identificador: number): Promise<any>;
    findByCuidador(cuidadorId: string): Promise<any[]>;
    findAll(): Promise<any[]>;
    findOne(id: string): Promise<any>;
    findByResponsavel(responsavelId: string): Promise<{
        id: string;
    }[]>;
    update(id: string, data: Partial<Idosos>): Promise<any>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
