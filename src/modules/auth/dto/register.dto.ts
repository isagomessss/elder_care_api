import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'joao@email.com' })
  email: string;

  @ApiProperty({ example: '123456' })
  senha: string;

  @ApiProperty({ example: 'João Silva' })
  nome: string;

  @ApiProperty({ example: 'Cuidador', enum: ['Cuidador', 'Responsável'] })
  tipo: 'Cuidador' | 'Responsável';
}
