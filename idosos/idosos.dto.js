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
exports.IdososDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class IdososDto {
    identificador;
    condicoesSaudeIds;
    cpf;
    cuidadorId;
    responsavelId;
    dataCadastro;
    dataNascimento;
    endereco;
    fotoBase64;
    genero;
    idade;
    nome;
    observacoes;
    telefoneEmergencia;
}
exports.IdososDto = IdososDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 101, description: 'Identificador único do idoso' }),
    __metadata("design:type", Number)
], IdososDto.prototype, "identificador", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'cond123', description: 'ID da condição de saúde' }),
    __metadata("design:type", Array)
], IdososDto.prototype, "condicoesSaudeIds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '123.456.789-00' }),
    __metadata("design:type", String)
], IdososDto.prototype, "cpf", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'cuidador123' }),
    __metadata("design:type", String)
], IdososDto.prototype, "cuidadorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'responsavel123', required: false }),
    __metadata("design:type", String)
], IdososDto.prototype, "responsavelId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-10-08T00:00:00.000Z' }),
    __metadata("design:type", String)
], IdososDto.prototype, "dataCadastro", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1990-03-05T00:00:00.000Z' }),
    __metadata("design:type", String)
], IdososDto.prototype, "dataNascimento", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Rua das Flores, 123' }),
    __metadata("design:type", String)
], IdososDto.prototype, "endereco", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '/9j/4AAQSkZJRgABAQAAAQABAAD...',
        description: 'Imagem do idoso em Base64 (sem prefixo data:image/)',
        required: false,
    }),
    __metadata("design:type", Object)
], IdososDto.prototype, "fotoBase64", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Masculino' }),
    __metadata("design:type", String)
], IdososDto.prototype, "genero", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 35, required: false }),
    __metadata("design:type", Number)
], IdososDto.prototype, "idade", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'João Silva' }),
    __metadata("design:type", String)
], IdososDto.prototype, "nome", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Sem observações', required: false }),
    __metadata("design:type", String)
], IdososDto.prototype, "observacoes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '(11) 99999-9999' }),
    __metadata("design:type", String)
], IdososDto.prototype, "telefoneEmergencia", void 0);
//# sourceMappingURL=idosos.dto.js.map