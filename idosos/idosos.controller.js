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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdososController = void 0;
const common_1 = require("@nestjs/common");
const idosos_service_1 = require("./idosos.service");
const idosos_dto_1 = require("./idosos.dto");
const swagger_1 = require("@nestjs/swagger");
class AtualizarFotoBase64Dto {
    fotoBase64;
}
let IdososController = class IdososController {
    idososService;
    constructor(idososService) {
        this.idososService = idososService;
    }
    create(dto) {
        return this.idososService.create(dto);
    }
    findByCuidador(cuidadorId) {
        return this.idososService.findByCuidador(cuidadorId);
    }
    async vincularIdoso(data) {
        const idoso = await this.idososService.findByIdentificador(data.identificador);
        if (!idoso)
            throw new common_1.NotFoundException('Idoso não encontrado');
        await this.idososService.update(idoso.id, { responsavelId: data.responsavelId });
        return { message: 'Idoso vinculado com sucesso' };
    }
    async atualizarFotoBase64(id, body) {
        const raw = body?.fotoBase64;
        if (!raw)
            return this.idososService.setFotoBase64(id, null);
        const isBase64 = /^[A-Za-z0-9+/=]+$/.test(raw);
        if (!isBase64)
            throw new common_1.BadRequestException('String Base64 inválida');
        return this.idososService.setFotoBase64(id, raw);
    }
    findAll() {
        return this.idososService.findAll();
    }
    findByResponsavel(responsavelId) {
        return this.idososService.findByResponsavel(responsavelId);
    }
    findOne(id) {
        return this.idososService.findOne(id);
    }
    update(id, data) {
        return this.idososService.update(id, data);
    }
    delete(id) {
        return this.idososService.delete(id);
    }
};
exports.IdososController = IdososController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBody)({ type: idosos_dto_1.IdososDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [idosos_dto_1.IdososDto]),
    __metadata("design:returntype", void 0)
], IdososController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('cuidador/:cuidadorId'),
    __param(0, (0, common_1.Param)('cuidadorId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], IdososController.prototype, "findByCuidador", null);
__decorate([
    (0, common_1.Put)('vincular'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], IdososController.prototype, "vincularIdoso", null);
__decorate([
    (0, common_1.Patch)(':id/foto-base64'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, AtualizarFotoBase64Dto]),
    __metadata("design:returntype", Promise)
], IdososController.prototype, "atualizarFotoBase64", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], IdososController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('responsavel/:responsavelId'),
    __param(0, (0, common_1.Param)('responsavelId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], IdososController.prototype, "findByResponsavel", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], IdososController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], IdososController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], IdososController.prototype, "delete", null);
exports.IdososController = IdososController = __decorate([
    (0, swagger_1.ApiTags)('Idosos'),
    (0, common_1.Controller)('idosos'),
    __metadata("design:paramtypes", [idosos_service_1.IdososService])
], IdososController);
//# sourceMappingURL=idosos.controller.js.map