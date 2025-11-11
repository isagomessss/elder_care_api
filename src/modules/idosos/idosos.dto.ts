import { ApiProperty } from '@nestjs/swagger';

export class IdososDto {
  @ApiProperty({ example: 101, description: 'Identificador único do idoso' })
  identificador?: number;

  @ApiProperty({ example: 'cond123', description: 'ID da condição de saúde' })
  condicoesSaudeIds: string[];

  @ApiProperty({ example: '123.456.789-00' })
  cpf: string;

  @ApiProperty({ example: 'cuidador123' })
  cuidadorId: string;

  @ApiProperty({ example: 'responsavel123', required: false })
  responsavelId?: string;

  @ApiProperty({ example: '2025-10-08T00:00:00.000Z' })
  dataCadastro: string;

  @ApiProperty({ example: '1990-03-05T00:00:00.000Z' })
  dataNascimento: string;

  @ApiProperty({ example: 'Rua das Flores, 123' })
  endereco: string;

  @ApiProperty({
    example: '/9j/4AAQSkZJRgABAQAAAQABAAD...',
    description: 'Imagem do idoso em Base64 (sem prefixo data:image/)',
    required: false,
  })
  fotoBase64?: string | null;

  @ApiProperty({ example: 'Masculino' })
  genero: string;

  @ApiProperty({ example: 35, required: false })
  idade?: number;

  @ApiProperty({ example: 'João Silva' })
  nome: string;

  @ApiProperty({ example: 'Sem observações', required: false })
  observacoes?: string;

  @ApiProperty({ example: '(11) 99999-9999' })
  telefoneEmergencia: string;
}
