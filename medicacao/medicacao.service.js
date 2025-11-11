"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicacaoService = void 0;
const common_1 = require("@nestjs/common");
const firebase_config_1 = require("../../firebase.config");
const firestore_1 = require("firebase-admin/firestore");
let MedicacaoService = class MedicacaoService {
    medicacoes = firebase_config_1.firestore.collection('medicacoes');
    notificacoes = firebase_config_1.firestore.collection('notificacoes');
    isSameDay(a, b) {
        return (a.getFullYear() === b.getFullYear() &&
            a.getMonth() === b.getMonth() &&
            a.getDate() === b.getDate());
    }
    async create(dto) {
        const inicio = new Date(dto.inicio);
        const fim = new Date(dto.fim);
        const medicacaoRef = await this.medicacoes.add({
            ...dto,
            inicio: firestore_1.Timestamp.fromDate(inicio),
            fim: firestore_1.Timestamp.fromDate(fim),
            ativa: true,
            ultimaNotificacao: null,
            retiradaManualEm: null,
            motivoRetirada: null,
        });
        return { id: medicacaoRef.id, message: 'Medicação cadastrada com sucesso!' };
    }
    async gerarNotificacoesDoDia() {
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        const snapshot = await this.medicacoes.get();
        const batch = firebase_config_1.firestore.batch();
        let notificacoesCriadas = 0;
        snapshot.forEach((doc) => {
            const data = doc.data();
            if (!data.ativa)
                return;
            const inicio = data.inicio instanceof firestore_1.Timestamp
                ? data.inicio.toDate()
                : new Date(data.inicio);
            const fim = data.fim instanceof firestore_1.Timestamp ? data.fim.toDate() : new Date(data.fim);
            const ultimaNotificacao = data.ultimaNotificacao
                ? data.ultimaNotificacao instanceof firestore_1.Timestamp
                    ? data.ultimaNotificacao.toDate()
                    : new Date(data.ultimaNotificacao)
                : null;
            if (hoje >= inicio && hoje <= fim) {
                if (ultimaNotificacao && this.isSameDay(ultimaNotificacao, hoje)) {
                    return;
                }
                const notifRef = this.notificacoes.doc();
                batch.set(notifRef, {
                    usuarioId: data.cuidadorId,
                    titulo: `Hora da medicação 💊`,
                    mensagem: `Lembrete: administrar "${data.nome}" para o paciente hoje (${data.horario}).`,
                    dataEnvio: firestore_1.Timestamp.now(),
                    lida: false,
                    medicacaoId: doc.id,
                });
                batch.update(doc.ref, {
                    ultimaNotificacao: firestore_1.Timestamp.fromDate(hoje),
                });
                notificacoesCriadas++;
            }
        });
        if (notificacoesCriadas > 0) {
            await batch.commit();
        }
        return {
            message: notificacoesCriadas
                ? 'Notificações do dia geradas com sucesso!'
                : 'Nenhuma notificação gerada para hoje.',
        };
    }
    async findByIdoso(idosoId) {
        const snapshot = await this.medicacoes.where('idosoId', '==', idosoId).get();
        return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    }
    async update(id, dto) {
        const data = Object.fromEntries(Object.entries(dto).filter(([_, v]) => v !== undefined));
        if ('inicio' in data && data.inicio) {
            data.inicio = firestore_1.Timestamp.fromDate(new Date(data.inicio));
        }
        if ('fim' in data && data.fim) {
            data.fim = firestore_1.Timestamp.fromDate(new Date(data.fim));
        }
        if ('ativa' in data) {
            if (data.ativa === true) {
                data.retiradaManualEm = null;
                data.motivoRetirada = null;
            }
            if (data.ativa === false) {
                data.ultimaNotificacao = null;
            }
        }
        await this.medicacoes.doc(id).update(data);
        return { message: 'Medicação atualizada com sucesso' };
    }
    async retirar(id, dto) {
        const docRef = this.medicacoes.doc(id);
        const doc = await docRef.get();
        if (!doc.exists) {
            throw new Error('Medicação não encontrada');
        }
        const data = doc.data();
        if (data?.ativa === false) {
            return { message: 'Medicação já está inativa' };
        }
        const batch = firebase_config_1.firestore.batch();
        batch.update(docRef, {
            ativa: false,
            retiradaManualEm: firestore_1.Timestamp.now(),
            motivoRetirada: dto.motivo ?? null,
            ultimaNotificacao: null,
        });
        const notificacoesSnapshot = await this.notificacoes
            .where('medicacaoId', '==', id)
            .get();
        notificacoesSnapshot.forEach((notif) => batch.delete(notif.ref));
        await batch.commit();
        return { message: 'Medicação retirada manualmente com sucesso' };
    }
    async delete(id) {
        const batch = firebase_config_1.firestore.batch();
        const medicacaoRef = this.medicacoes.doc(id);
        batch.delete(medicacaoRef);
        const notificacoesSnapshot = await this.notificacoes
            .where('medicacaoId', '==', id)
            .get();
        notificacoesSnapshot.forEach((doc) => batch.delete(doc.ref));
        await batch.commit();
        return { message: 'Medicação removida com sucesso' };
    }
};
exports.MedicacaoService = MedicacaoService;
exports.MedicacaoService = MedicacaoService = __decorate([
    (0, common_1.Injectable)()
], MedicacaoService);
//# sourceMappingURL=medicacao.service.js.map