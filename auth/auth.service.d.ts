import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private jwtService;
    private usuariosCollection;
    constructor(jwtService: JwtService);
    register(dto: RegisterDto): Promise<{
        token: string;
        usuario: {
            senha: undefined;
            email: string;
            nome: string;
            tipo: "Cuidador" | "Respons\u00E1vel";
            id: string;
        };
    }>;
    login(dto: LoginDto): Promise<{
        token: string;
        usuario: any;
    }>;
    validateUser(userId: string): Promise<{
        id: string;
    } | null>;
}
