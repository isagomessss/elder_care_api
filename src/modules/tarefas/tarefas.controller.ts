// src/modules/tarefas/tarefas.controller.ts
import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { TarefasService } from './tarefas.service';
import { TarefasDto } from './tarefas.dto';
import type { Tarefas } from './tarefas.entity';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Tarefas')
@Controller('tarefas')
export class TarefasController {
  constructor(private readonly tarefasService: TarefasService) { }

  @Post()
  @ApiBody({ type: TarefasDto })
  create(@Body() dto: TarefasDto) {
    return this.tarefasService.create(dto);
  }
  @Get('idoso/:id')
  async getTarefasByIdoso(@Param('id') id: string) {
    return this.tarefasService.findByIdoso(id);
  }
  @Get()
  findAll() {
    return this.tarefasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tarefasService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() tarefa: Partial<Tarefas>) {
    return this.tarefasService.update(id, tarefa);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.tarefasService.delete(id);
  }
}
