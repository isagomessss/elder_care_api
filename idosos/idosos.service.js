"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdososService = void 0;
const common_1 = require("@nestjs/common");
const firebase_config_1 = require("../../firebase.config");
const firestore_1 = require("firebase-admin/firestore");
let IdososService = class IdososService {
    collection = firebase_config_1.firestore.collection('idosos');
    toTimestamp(value) {
        if (!value)
            return undefined;
        if (value instanceof firestore_1.Timestamp)
            return value;
        if (typeof value === 'object' && value._seconds)
            return firestore_1.Timestamp.fromMillis(value._seconds * 1000);
        if (typeof value === 'string')
            return firestore_1.Timestamp.fromDate(new Date(value));
        return undefined;
    }
    async setFotoBase64(id, fotoBase64) {
        const ref = this.collection.doc(id);
        const snap = await ref.get();
        if (!snap.exists)
            throw new common_1.NotFoundException('Idoso não encontrado');
        const payload = {
            fotoBase64: fotoBase64 ?? null,
            dataAtualizacaoFoto: firestore_1.Timestamp.now(),
        };
        Object.keys(payload).forEach(key => payload[key] === undefined && delete payload[key]);
        await ref.update(payload);
        return this.findOne(id);
    }
    async gerarIdentificadorUnico() {
        let identificador;
        let existe = true;
        while (existe) {
            identificador = Math.floor(10000 + Math.random() * 90000);
            const snapshot = await this.collection
                .where('identificador', '==', identificador)
                .limit(1)
                .get();
            existe = !snapshot.empty;
        }
        return identificador;
    }
    calcularIdade(dataNascimento) {
        const hoje = new Date();
        let idade = hoje.getFullYear() - dataNascimento.getFullYear();
        const mes = hoje.getMonth() - dataNascimento.getMonth();
        if (mes < 0 || (mes === 0 && hoje.getDate() < dataNascimento.getDate())) {
            idade--;
        }
        return idade;
    }
    async create(dto) {
        const identificador = dto.identificador && dto.identificador > 0
            ? dto.identificador
            : await this.gerarIdentificadorUnico();
        let dataNascimentoStr = dto.dataNascimento;
        if (dataNascimentoStr.includes('/')) {
            const [dia, mes, ano] = dataNascimentoStr.split('/');
            dataNascimentoStr = `${ano}-${mes}-${dia}`;
        }
        const dataNascimentoDate = new Date(dataNascimentoStr);
        if (isNaN(dataNascimentoDate.getTime())) {
            throw new Error('Data de nascimento inválida');
        }
        const idade = this.calcularIdade(dataNascimentoDate);
        const idoso = {
            ...dto,
            identificador,
            idade,
            dataCadastro: this.toTimestamp(dto.dataCadastro) ?? firestore_1.Timestamp.now(),
            dataNascimento: firestore_1.Timestamp.fromDate(dataNascimentoDate),
            fotoBase64: dto.fotoBase64 || null,
        };
        const docRef = await this.collection.add(idoso);
        return { id: docRef.id, ...idoso };
    }
    async findByIdentificador(identificador) {
        const snapshot = await this.collection
            .where('identificador', '==', identificador)
            .limit(1)
            .get();
        if (snapshot.empty)
            return null;
        const doc = snapshot.docs[0];
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            dataCadastro: data.dataCadastro?._seconds
                ? new Date(data.dataCadastro._seconds * 1000)
                : data.dataCadastro,
            dataNascimento: data.dataNascimento?._seconds
                ? new Date(data.dataNascimento._seconds * 1000)
                : data.dataNascimento,
        };
    }
    async findByCuidador(cuidadorId) {
        const snapshot = await this.collection
            .where('cuidadorId', '==', cuidadorId)
            .get();
        if (snapshot.empty)
            return [];
        return snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                dataCadastro: data.dataCadastro?._seconds
                    ? new Date(data.dataCadastro._seconds * 1000)
                    : data.dataCadastro,
                dataNascimento: data.dataNascimento?._seconds
                    ? new Date(data.dataNascimento._seconds * 1000)
                    : data.dataNascimento,
            };
        });
    }
    async findAll() {
        const snapshot = await this.collection.get();
        return snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                dataCadastro: data.dataCadastro?._seconds
                    ? new Date(data.dataCadastro._seconds * 1000)
                    : data.dataCadastro,
                dataNascimento: data.dataNascimento?._seconds
                    ? new Date(data.dataNascimento._seconds * 1000)
                    : data.dataNascimento,
            };
        });
    }
    async findOne(id) {
        const doc = await this.collection.doc(id).get();
        if (!doc.exists)
            throw new Error('Idoso não encontrado');
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            dataCadastro: data.dataCadastro?._seconds
                ? new Date(data.dataCadastro._seconds * 1000)
                : data.dataCadastro,
            dataNascimento: data.dataNascimento?._seconds
                ? new Date(data.dataNascimento._seconds * 1000)
                : data.dataNascimento,
        };
    }
    async findByResponsavel(responsavelId) {
        const snapshot = await this.collection
            .where("responsavelId", "==", responsavelId)
            .get();
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
    }
    async update(id, data) {
        data.dataCadastro = this.toTimestamp(data.dataCadastro);
        data.dataNascimento = this.toTimestamp(data.dataNascimento);
        if (data.dataNascimento instanceof firestore_1.Timestamp) {
            const dataNasc = data.dataNascimento.toDate();
            data.idade = this.calcularIdade(dataNasc);
        }
        Object.keys(data).forEach(key => data[key] === undefined && delete data[key]);
        await this.collection.doc(id).update(data);
        return this.findOne(id);
    }
    async delete(id) {
        await this.collection.doc(id).delete();
        return { message: 'Idoso removido com sucesso' };
    }
};
exports.IdososService = IdososService;
exports.IdososService = IdososService = __decorate([
    (0, common_1.Injectable)()
], IdososService);
//# sourceMappingURL=idosos.service.js.map