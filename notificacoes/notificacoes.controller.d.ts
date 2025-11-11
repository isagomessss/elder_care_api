import { NotificacoesService } from './notificacoes.service';
import { NotificacoesDto } from './notificacoes.dto';
export declare class NotificacoesController {
    private readonly notificacoesService;
    constructor(notificacoesService: NotificacoesService);
    findAll(): Promise<{
        id: string;
    }[]>;
    findByUsuario(usuarioId: string): Promise<{
        id: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
    }>;
    update(id: string, dto: Partial<NotificacoesDto>): Promise<{
        id: string;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
