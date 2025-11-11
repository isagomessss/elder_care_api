import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { CondicoesSaudeService } from './condicoesSaude.service';
import { CondicaoSaudeDto } from './condicoesSaude.dto';
import type { CondicaoSaude } from './condicoesSaude.entity';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('CondicoesSaude')
@Controller('condicoesSaude')
export class CondicoesSaudeController {
  constructor(private readonly condicoesSaudeService: CondicoesSaudeService) {}

  @Post()
  @ApiBody({ type: CondicaoSaudeDto })
  create(@Body() dto: CondicaoSaudeDto) {
    return this.condicoesSaudeService.create(dto);
  }

  @Get()
  findAll() {
    return this.condicoesSaudeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.condicoesSaudeService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<CondicaoSaude>) {
    return this.condicoesSaudeService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.condicoesSaudeService.delete(id);
  }
}
