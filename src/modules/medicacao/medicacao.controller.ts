import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { MedicacaoService } from './medicacao.service';
import {
  CreateMedicacaoDto,
  RetirarMedicacaoDto,
  UpdateMedicacaoDto,
} from './medicacao.dto';

@Controller('medicacoes')
export class MedicacaoController {
  constructor(private readonly service: MedicacaoService) {}

  @Post()
  create(@Body() dto: CreateMedicacaoDto) {
    return this.service.create(dto);
  }

  @Get('idoso/:idosoId')
  findByIdoso(@Param('idosoId') idosoId: string) {
    return this.service.findByIdoso(idosoId);
  }

  @Get('gerar-notificacoes')
  gerarNotificacoesDoDia() {
    return this.service.gerarNotificacoesDoDia();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateMedicacaoDto) {
    return this.service.update(id, dto);
  }

  @Patch(':id/retirar')
  retirar(@Param('id') id: string, @Body() dto: RetirarMedicacaoDto) {
    return this.service.retirar(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
