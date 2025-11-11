import { NotificacoesDto } from './notificacoes.dto';
export declare class NotificacoesService {
    private collection;
    findAll(): Promise<{
        id: string;
    }[]>;
    findByUsuario(usuarioId: string): Promise<{
        id: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
    }>;
    update(id: string, data: Partial<NotificacoesDto>): Promise<{
        id: string;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
