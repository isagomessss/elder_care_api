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
exports.MedicacaoController = void 0;
const common_1 = require("@nestjs/common");
const medicacao_service_1 = require("./medicacao.service");
const medicacao_dto_1 = require("./medicacao.dto");
let MedicacaoController = class MedicacaoController {
    service;
    constructor(service) {
        this.service = service;
    }
    create(dto) {
        return this.service.create(dto);
    }
    findByIdoso(idosoId) {
        return this.service.findByIdoso(idosoId);
    }
    gerarNotificacoesDoDia() {
        return this.service.gerarNotificacoesDoDia();
    }
    update(id, dto) {
        return this.service.update(id, dto);
    }
    retirar(id, dto) {
        return this.service.retirar(id, dto);
    }
    remove(id) {
        return this.service.delete(id);
    }
};
exports.MedicacaoController = MedicacaoController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [medicacao_dto_1.CreateMedicacaoDto]),
    __metadata("design:returntype", void 0)
], MedicacaoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('idoso/:idosoId'),
    __param(0, (0, common_1.Param)('idosoId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MedicacaoController.prototype, "findByIdoso", null);
__decorate([
    (0, common_1.Get)('gerar-notificacoes'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MedicacaoController.prototype, "gerarNotificacoesDoDia", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, medicacao_dto_1.UpdateMedicacaoDto]),
    __metadata("design:returntype", void 0)
], MedicacaoController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/retirar'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, medicacao_dto_1.RetirarMedicacaoDto]),
    __metadata("design:returntype", void 0)
], MedicacaoController.prototype, "retirar", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MedicacaoController.prototype, "remove", null);
exports.MedicacaoController = MedicacaoController = __decorate([
    (0, common_1.Controller)('medicacoes'),
    __metadata("design:paramtypes", [medicacao_service_1.MedicacaoService])
], MedicacaoController);
//# sourceMappingURL=medicacao.controller.js.map