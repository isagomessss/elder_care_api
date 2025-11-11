import { CondicaoSaude } from './condicoesSaude.entity';
import { CondicaoSaudeDto } from './condicoesSaude.dto';
export declare class CondicoesSaudeService {
    private collection;
    create(dto: CondicaoSaudeDto): Promise<{
        id: string;
        nome: string;
        descricao?: string;
    }>;
    findAll(): Promise<{
        id: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
    }>;
    update(id: string, data: Partial<CondicaoSaude>): Promise<{
        id: string;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
