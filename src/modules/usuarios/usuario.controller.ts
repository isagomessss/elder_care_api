// src/modules/users/users.controller.ts
import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { UsuariosService } from './usuario.service';
import type { Usuario } from './usuario.entity';
import { UsuariosDto } from './usuario.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Usuarios')
@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usersService: UsuariosService) {}

  @Post()
  @ApiBody({type: UsuariosDto})
  create(@Body() dto: UsuariosDto) {
    return this.usersService.create(dto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() user: Partial<Usuario>) {
    return this.usersService.update(id, user);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
