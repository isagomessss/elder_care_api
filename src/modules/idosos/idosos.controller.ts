// idosos.controller.ts
import { Body, Controller, Get, Param, Post, Put, Delete, NotFoundException, Patch, BadRequestException } from '@nestjs/common';
import { IdososService } from './idosos.service';
import { IdososDto } from './idosos.dto';
import type { Idosos } from './idosos.entity';
import { ApiBody, ApiTags } from '@nestjs/swagger';

class AtualizarFotoBase64Dto {
  fotoBase64!: string | null;
}

@ApiTags('Idosos')
@Controller('idosos')
export class IdososController {
  constructor(private readonly idososService: IdososService) { }

  @Post()
  @ApiBody({ type: IdososDto })
  create(@Body() dto: IdososDto) {
    return this.idososService.create(dto);
  }
  
  @Get('cuidador/:cuidadorId')
  findByCuidador(@Param('cuidadorId') cuidadorId: string) {
    return this.idososService.findByCuidador(cuidadorId);
  }

  @Put('vincular')
  async vincularIdoso(@Body() data: { identificador: number; responsavelId: string }) {
    const idoso = await this.idososService.findByIdentificador(data.identificador);
    if (!idoso) throw new NotFoundException('Idoso não encontrado');

    await this.idososService.update(idoso.id, { responsavelId: data.responsavelId });
    return { message: 'Idoso vinculado com sucesso' };
  }

  // ⚡️ NOVO: Atualizar somente a fotoUrl (ou limpar)


  @Patch(':id/foto-base64')
  async atualizarFotoBase64(
    @Param('id') id: string,
    @Body() body: AtualizarFotoBase64Dto,
  ) {
    const raw = body?.fotoBase64;
    if (!raw) return this.idososService.setFotoBase64(id, null);

    // (opcional) validação básica de Base64
    const isBase64 = /^[A-Za-z0-9+/=]+$/.test(raw);
    if (!isBase64) throw new BadRequestException('String Base64 inválida');

    return this.idososService.setFotoBase64(id, raw);
  }


  @Get()
  findAll() {
    return this.idososService.findAll();
  }

  @Get('responsavel/:responsavelId')
  findByResponsavel(@Param('responsavelId') responsavelId: string) {
    return this.idososService.findByResponsavel(responsavelId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.idososService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Idosos>) {
    return this.idososService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.idososService.delete(id);
  }
}
