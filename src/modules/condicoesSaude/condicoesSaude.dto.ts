// condicoesSaude.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CondicaoSaudeDto {
  @ApiProperty({ example: 'Diabetes' })
  nome: string;

  @ApiProperty({ example: 'Doença crônica que afeta a glicose no sangue', required: false })
  descricao?: string;
}
