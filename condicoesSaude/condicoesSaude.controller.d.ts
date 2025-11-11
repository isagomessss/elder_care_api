import { CondicoesSaudeService } from './condicoesSaude.service';
import { CondicaoSaudeDto } from './condicoesSaude.dto';
import type { CondicaoSaude } from './condicoesSaude.entity';
export declare class CondicoesSaudeController {
    private readonly condicoesSaudeService;
    constructor(condicoesSaudeService: CondicoesSaudeService);
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
