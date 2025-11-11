// src/modules/users/users.module.ts
import { Module } from '@nestjs/common';
import { UsuariosController } from './usuario.controller';
import { UsuariosService } from './usuario.service';

@Module({
  controllers: [UsuariosController],
  providers: [UsuariosService],
})
export class UsuarioModule {}
