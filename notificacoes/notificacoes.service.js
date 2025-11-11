"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificacoesService = void 0;
const common_1 = require("@nestjs/common");
const firebase_config_1 = require("../../firebase.config");
const firestore_1 = require("firebase-admin/firestore");
let NotificacoesService = class NotificacoesService {
    collection = firebase_config_1.firestore.collection('notificacoes');
    async findAll() {
        const snapshot = await this.collection.get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
    async findByUsuario(usuarioId) {
        const snapshot = await this.collection.where('usuarioId', '==', usuarioId).get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
    async findOne(id) {
        const doc = await this.collection.doc(id).get();
        if (!doc.exists)
            throw new Error('Notificação não encontrada');
        return { id: doc.id, ...doc.data() };
    }
    async update(id, data) {
        const updateData = { ...data };
        if (data.dataEnvio && !(data.dataEnvio instanceof firestore_1.Timestamp)) {
            updateData.dataEnvio = firestore_1.Timestamp.fromDate(new Date(data.dataEnvio));
        }
        await this.collection.doc(id).update(updateData);
        return this.findOne(id);
    }
    async delete(id) {
        await this.collection.doc(id).delete();
        return { message: 'Notificação removida com sucesso' };
    }
};
exports.NotificacoesService = NotificacoesService;
exports.NotificacoesService = NotificacoesService = __decorate([
    (0, common_1.Injectable)()
], NotificacoesService);
//# sourceMappingURL=notificacoes.service.js.map