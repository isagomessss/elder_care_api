"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificacoesDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class NotificacoesDto {
    titulo;
    mensagem;
    usuarioId;
    tipo;
    tarefaId;
    lida;
    dataEnvio;
}
exports.NotificacoesDto = NotificacoesDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Lembrete de medicação' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], NotificacoesDto.prototype, "titulo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Não se esqueça de dar o remédio das 14h.' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], NotificacoesDto.prototype, "mensagem", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'user123' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], NotificacoesDto.prototype, "usuarioId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Visita', description: 'Tipo da notificação (Visita, Tarefa, etc.)' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], NotificacoesDto.prototype, "tipo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'tarefa456', description: 'ID da tarefa relacionada' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], NotificacoesDto.prototype, "tarefaId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], NotificacoesDto.prototype, "lida", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: new Date().toISOString(),
        description: 'Data de envio da notificação',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], NotificacoesDto.prototype, "dataEnvio", void 0);
//# sourceMappingURL=notificacoes.dto.js.map