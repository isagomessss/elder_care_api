import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { firestore } from '../../firebase.config';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Timestamp } from 'firebase-admin/firestore';

@Injectable()
export class AuthService {
  private usuariosCollection = firestore.collection('usuários');

  constructor(private jwtService: JwtService) {}

  async register(dto: RegisterDto) {
    const userExists = await this.usuariosCollection.where('email', '==', dto.email).get();
    if (!userExists.empty) throw new BadRequestException('E-mail já cadastrado.');

    const hashedPassword = await bcrypt.hash(dto.senha, 10);
    const userData = {
      ...dto,
      senha: hashedPassword,
      dataCadastro: Timestamp.now(),
    };

    const userRef = await this.usuariosCollection.add(userData);
    const payload = { id: userRef.id, email: dto.email, tipo: dto.tipo };
    const token = this.jwtService.sign(payload);

    return { token, usuario: { id: userRef.id, ...dto, senha: undefined } };
  }

  async login(dto: LoginDto) {
    const snapshot = await this.usuariosCollection.where('email', '==', dto.email).get();
    if (snapshot.empty) throw new UnauthorizedException('Credenciais inválidas.');

    const userDoc = snapshot.docs[0];
    const user = userDoc.data() as any;
    const senhaCorreta = await bcrypt.compare(dto.senha, user.senha);
    if (!senhaCorreta) throw new UnauthorizedException('Credenciais inválidas.');

    const payload = { id: userDoc.id, email: user.email, tipo: user.tipo };
    const token = this.jwtService.sign(payload);

    return { token, usuario: { id: userDoc.id, ...user, senha: undefined } };
  }

  async validateUser(userId: string) {
    const doc = await this.usuariosCollection.doc(userId).get();
    if (!doc.exists) return null;
    return { id: doc.id, ...doc.data() };
  }
}
