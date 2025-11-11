"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CondicoesSaudeService = void 0;
const common_1 = require("@nestjs/common");
const firebase_config_1 = require("../../firebase.config");
let CondicoesSaudeService = class CondicoesSaudeService {
    collection = firebase_config_1.firestore.collection('condicoesSaude');
    async create(dto) {
        const condicao = { ...dto };
        const docRef = await this.collection.add(condicao);
        return { id: docRef.id, ...condicao };
    }
    async findAll() {
        const snapshot = await this.collection.get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
    async findOne(id) {
        const doc = await this.collection.doc(id).get();
        if (!doc.exists)
            throw new Error('Condição de saúde não encontrada');
        return { id: doc.id, ...doc.data() };
    }
    async update(id, data) {
        await this.collection.doc(id).update(data);
        const updated = await this.findOne(id);
        return updated;
    }
    async delete(id) {
        await this.collection.doc(id).delete();
        return { message: 'Condição de saúde removida com sucesso' };
    }
};
exports.CondicoesSaudeService = CondicoesSaudeService;
exports.CondicoesSaudeService = CondicoesSaudeService = __decorate([
    (0, common_1.Injectable)()
], CondicoesSaudeService);
//# sourceMappingURL=condicoesSaude.service.js.map