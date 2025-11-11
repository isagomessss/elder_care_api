import { Controller, Get, Param, Body, Post, Put, Delete } from '@nestjs/common';
import { NotificacoesService } from './notificacoes.service';
import { NotificacoesDto } from './notificacoes.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Notificações')
@Controller('notificacoes')
export class NotificacoesController {
  constructor(private readonly notificacoesService: NotificacoesService) {}

 
  @Get()
  findAll() {
    return this.notificacoesService.findAll();
  }
  

  @Get('usuario/:usuarioId')
  findByUsuario(@Param('usuarioId') usuarioId: string) {
    return this.notificacoesService.findByUsuario(usuarioId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notificacoesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: Partial<NotificacoesDto>) {
    return this.notificacoesService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.notificacoesService.delete(id);
  }
}
