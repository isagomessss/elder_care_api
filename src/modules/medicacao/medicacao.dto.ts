import {
  IsString,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateMedicacaoDto {
  @IsString()
  @IsNotEmpty()
  idosoId: string;

  @IsString()
  @IsNotEmpty()
  cuidadorId: string;

  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsString()
  @IsNotEmpty()
  horario: string; // "08:00"

  @IsString()
  @IsNotEmpty()
  inicio: string; // "2025-11-05"

  @IsString()
  @IsNotEmpty()
  fim: string; // "2025-11-19"
}

export class UpdateMedicacaoDto {
  @IsOptional()
  @IsBoolean()
  ativa?: boolean;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsString()
  horario?: string;

  @IsOptional()
  @IsString()
  inicio?: string;

  @IsOptional()
  @IsString()
  fim?: string;
}

export class RetirarMedicacaoDto {
  @IsOptional()
  @IsString()
  motivo?: string;
}
