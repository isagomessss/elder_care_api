import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
}
