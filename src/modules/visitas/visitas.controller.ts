import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { VisitasService } from './visitas.service';
import { VisitaDto } from './visitas.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Visitas')
@Controller('visitas')
export class VisitasController {
    constructor(private readonly visitasService: VisitasService) { }

    @Post()
    @ApiBody({ type: VisitaDto })
    create(@Body() dto: VisitaDto) {
        return this.visitasService.create(dto);
    }

    @Get()
    findAll() {
        return this.visitasService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.visitasService.findOne(id);
    }

    @Get('idoso/:idosoId')
    findByIdoso(@Param('idosoId') idosoId: string) {
        return this.visitasService.findByIdoso(idosoId);
    }

    @Get('cuidador/:cuidadorId')
    findByCuidador(@Param('cuidadorId') cuidadorId: string) {
        return this.visitasService.findByCuidador(cuidadorId);
    }


    @Get('responsavel/:responsavelId')
    findByResponsavel(@Param('responsavelId') responsavelId: string) {
        return this.visitasService.findByResponsavel(responsavelId);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: Partial<VisitaDto>) {
        return this.visitasService.update(id, dto);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.visitasService.delete(id);
    }
}
