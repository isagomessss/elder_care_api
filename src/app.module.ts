// src/app.module.ts
import { Module } from '@nestjs/common';
import { UsuarioModule } from './modules/usuarios/usuario.module';
import { TarefasModule } from './modules/tarefas/tarefas.module';
import { CondicoesSaudeModule } from './modules/condicoesSaude/condicoesSaude.module';
import { IdososModule } from './modules/idosos/idosos.module';
import { NotificacoesModule } from './modules/notificacoes/notificacoes.module';
import { AuthModule } from './modules/auth/auth.module';
import { VisitasModule } from './modules/visitas/visitas.module';
import { MedicacaoModule } from './modules/medicacao/medicacao.module';

@Module({
  imports: [
    UsuarioModule,
    TarefasModule,
    CondicoesSaudeModule,
    IdososModule,
    NotificacoesModule,
    AuthModule,
    VisitasModule,
    MedicacaoModule
  ]
})
export class AppModule { }
