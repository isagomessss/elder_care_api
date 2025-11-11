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
exports.NotificacoesController = void 0;
const common_1 = require("@nestjs/common");
const notificacoes_service_1 = require("./notificacoes.service");
const swagger_1 = require("@nestjs/swagger");
let NotificacoesController = class NotificacoesController {
    notificacoesService;
    constructor(notificacoesService) {
        this.notificacoesService = notificacoesService;
    }
    findAll() {
        return this.notificacoesService.findAll();
    }
    findByUsuario(usuarioId) {
        return this.notificacoesService.findByUsuario(usuarioId);
    }
    findOne(id) {
        return this.notificacoesService.findOne(id);
    }
    update(id, dto) {
        return this.notificacoesService.update(id, dto);
    }
    delete(id) {
        return this.notificacoesService.delete(id);
    }
};
exports.NotificacoesController = NotificacoesController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NotificacoesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('usuario/:usuarioId'),
    __param(0, (0, common_1.Param)('usuarioId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NotificacoesController.prototype, "findByUsuario", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NotificacoesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], NotificacoesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NotificacoesController.prototype, "delete", null);
exports.NotificacoesController = NotificacoesController = __decorate([
    (0, swagger_1.ApiTags)('Notificações'),
    (0, common_1.Controller)('notificacoes'),
    __metadata("design:paramtypes", [notificacoes_service_1.NotificacoesService])
], NotificacoesController);
//# sourceMappingURL=notificacoes.controller.js.map