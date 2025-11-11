import { Injectable } from '@nestjs/common';
import { firestore } from '../../firebase.config';
import { Timestamp } from 'firebase-admin/firestore';
import {
  CreateMedicacaoDto,
  RetirarMedicacaoDto,
  UpdateMedicacaoDto,
} from './medicacao.dto';

@Injectable()
export class MedicacaoService {
  private medicacoes = firestore.collection('medicacoes');
  private notificacoes = firestore.collection('notificacoes');

  private isSameDay(a: Date, b: Date) {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }

  // 🔹 Cria medicação
  async create(dto: CreateMedicacaoDto) {
    const inicio = new Date(dto.inicio);
    const fim = new Date(dto.fim);

    const medicacaoRef = await this.medicacoes.add({
      ...dto,
      inicio: Timestamp.fromDate(inicio),
      fim: Timestamp.fromDate(fim),
      ativa: true,
      ultimaNotificacao: null,
      retiradaManualEm: null,
      motivoRetirada: null,
    });

    return { id: medicacaoRef.id, message: 'Medicação cadastrada com sucesso!' };
  }

  // 🔹 Envia notificações das medicações que são hoje
  async gerarNotificacoesDoDia() {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const snapshot = await this.medicacoes.get();

    const batch = firestore.batch();
    let notificacoesCriadas = 0;

    snapshot.forEach((doc) => {
      const data = doc.data();
      if (!data.ativa) return;

      const inicio =
        data.inicio instanceof Timestamp
          ? data.inicio.toDate()
          : new Date(data.inicio);
      const fim =
        data.fim instanceof Timestamp ? data.fim.toDate() : new Date(data.fim);
      const ultimaNotificacao = data.ultimaNotificacao
        ? data.ultimaNotificacao instanceof Timestamp
          ? data.ultimaNotificacao.toDate()
          : new Date(data.ultimaNotificacao)
        : null;

      // se hoje está entre início e fim
      if (hoje >= inicio && hoje <= fim) {
        if (ultimaNotificacao && this.isSameDay(ultimaNotificacao, hoje)) {
          return;
        }

        const notifRef = this.notificacoes.doc();
        batch.set(notifRef, {
          usuarioId: data.cuidadorId,
          titulo: `Hora da medicação 💊`,
          mensagem: `Lembrete: administrar "${data.nome}" para o paciente hoje (${data.horario}).`,
          dataEnvio: Timestamp.now(),
          lida: false,
          medicacaoId: doc.id,
        });
        batch.update(doc.ref, {
          ultimaNotificacao: Timestamp.fromDate(hoje),
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

  async findByIdoso(idosoId: string) {
    const snapshot = await this.medicacoes.where('idosoId', '==', idosoId).get();
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  }

  async update(id: string, dto: UpdateMedicacaoDto) {
    const data = Object.fromEntries(
      Object.entries(dto).filter(([_, v]) => v !== undefined)
    );

    if ('inicio' in data && data.inicio) {
      data.inicio = Timestamp.fromDate(new Date(data.inicio));
    }

    if ('fim' in data && data.fim) {
      data.fim = Timestamp.fromDate(new Date(data.fim));
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

  async retirar(id: string, dto: RetirarMedicacaoDto) {
    const docRef = this.medicacoes.doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      throw new Error('Medicação não encontrada');
    }

    const data = doc.data();
    if (data?.ativa === false) {
      return { message: 'Medicação já está inativa' };
    }

    const batch = firestore.batch();
    batch.update(docRef, {
      ativa: false,
      retiradaManualEm: Timestamp.now(),
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

  async delete(id: string) {
    const batch = firestore.batch();
    const medicacaoRef = this.medicacoes.doc(id);
    batch.delete(medicacaoRef);

    const notificacoesSnapshot = await this.notificacoes
      .where('medicacaoId', '==', id)
      .get();

    notificacoesSnapshot.forEach((doc) => batch.delete(doc.ref));

    await batch.commit();
    return { message: 'Medicação removida com sucesso' };
  }
}
