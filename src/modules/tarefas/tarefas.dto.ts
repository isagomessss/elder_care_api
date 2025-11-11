import { ApiProperty } from '@nestjs/swagger';

export class TarefasDto {
  @ApiProperty({
    example: 'cuidador123',
    description: 'ID do cuidador responsável pela tarefa',
  })
  cuidadorId: string;

  @ApiProperty({
    example: '2025-10-08T14:00:00.000Z',
    description: 'Data e hora agendada da tarefa (formato ISO)',
  })
  dataHora: string; // Recebe como string, será convertida pra Timestamp no service

  @ApiProperty({
    example: 'Dar o remédio das 14h',
    description: 'Descrição detalhada da tarefa',
  })
  descricao: string;

  @ApiProperty({
    example: 'idoso456',
    description: 'ID do idoso relacionado à tarefa',
  })
  idosoId: string;

  @ApiProperty({
    example: 'Pendente',
    enum: ['Pendente', 'Concluida', 'Atrasada'],
    description: 'Status atual da tarefa',
  })
  status: 'Pendente' | 'Concluida' | 'Atrasada';

  @ApiProperty({
    example: 'Remédio 14h',
    description: 'Título breve da tarefa',
  })
  titulo: string;
}
