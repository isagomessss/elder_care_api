// condicoesSaude.module.ts
import { Module } from '@nestjs/common';
import { CondicoesSaudeService } from './condicoesSaude.service';
import { CondicoesSaudeController } from './condicoesSaude.controller';

@Module({
  controllers: [CondicoesSaudeController],
  providers: [CondicoesSaudeService],
})
export class CondicoesSaudeModule {}
