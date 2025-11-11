// src/modules/users/dto/create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class UsuariosDto {
  @ApiProperty({ example: '123.456.789-00' })
  cpf: string;

  @ApiProperty({ example: '2025-10-07' })
  dataCadastro: string;

  @ApiProperty({ example: '1998-03-05T00:00:00.000Z' })
  dataNascimento: Date;

  @ApiProperty({ example: 'joao@email.com' })
  email: string;

  @ApiProperty({ example: 'Rua das Flores, 123' })
  endereco: string;

  @ApiProperty({ example: 'https://meusite.com/foto.png' })
  fotoUrl: string;

  @ApiProperty({ example: 'João Silva' })
  nome: string;

  @ApiProperty({ example: '(11) 99999-9999' })
  telefone: string;

  @ApiProperty({ example: 'cuidador', enum: ['cuidador', 'responsável'] })
  tipo: string;
}
