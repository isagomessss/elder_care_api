import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class VisitaDto {
  @ApiProperty({
    example: '2025-10-25T14:30:00.000Z',
    description: 'Data e hora da visita',
  })
  @IsNotEmpty()
  dataVisita: Date;

  @ApiProperty({
    example: 'user123',
    description: 'ID do responsável pela visita',
  })
  @IsString()
  @IsNotEmpty()
  responsavelId: string;

  @ApiProperty({
    example: 'user456',
    description: 'ID do cuidador que criou a visita',
  })
  @IsString()
  @IsNotEmpty()
  cuidadorId: string;

  @ApiProperty({
    example: 'idoso789',
    description: 'ID do idoso que receberá a visita',
  })
  @IsString()
  @IsNotEmpty()
  idosoId: string;

  @ApiProperty({
    example: 'Rua das Flores, 123 - Centro',
    description: 'Local onde a visita será realizada',
  })
  @IsString()
  @IsNotEmpty()
  localVisita: string; // 👈 Novo campo obrigatório

  @ApiProperty({
    example: 'Verificar pressão arterial',
    description: 'Observações adicionais',
  })
  @IsOptional()
  @IsString()
  observacoes?: string;
}
