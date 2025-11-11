import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class NotificacoesDto {
  @ApiProperty({ example: 'Lembrete de medicação' })
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @ApiProperty({ example: 'Não se esqueça de dar o remédio das 14h.' })
  @IsString()
  @IsNotEmpty()
  mensagem: string;

  @ApiProperty({ example: 'user123' })
  @IsString()
  @IsNotEmpty()
  usuarioId: string;

  @ApiProperty({ example: 'Visita', description: 'Tipo da notificação (Visita, Tarefa, etc.)' })
  @IsString()
  @IsOptional()
  tipo?: string;


  @ApiProperty({ example: 'tarefa456', description: 'ID da tarefa relacionada' })
  @IsString()
  @IsNotEmpty()
  tarefaId: string;

  @ApiProperty({ example: false })
  @IsBoolean()
  lida: boolean;

  @ApiProperty({
    example: new Date().toISOString(),
    description: 'Data de envio da notificação',
  })
  @IsOptional()
  dataEnvio?: Date;
}
