import { Injectable, BadRequestException } from '@nestjs/common';
import { firestore } from '../../firebase.config';
import { Timestamp } from 'firebase-admin/firestore';
import { Visita } from './visitas.entity';
import { VisitaDto } from './visitas.dto';

@Injectable()
export class VisitasService {
  private collection = firestore.collection('visitas');
  private idososCollection = firestore.collection('idosos');
  private usuariosCollection = firestore.collection('usuários');
  private notificacoesCollection = firestore.collection('notificacoes');

  async create(dto: VisitaDto) {
    if (!dto.localVisita) {
      throw new BadRequestException("O campo 'localVisita' é obrigatório.");
    }
    // ✅ valida entidades relacionadas
    const [idosoDoc, respDoc, cuidadorDoc] = await Promise.all([
      this.idososCollection.doc(dto.idosoId).get(),
      this.usuariosCollection.doc(dto.responsavelId).get(),
      this.usuariosCollection.doc(dto.cuidadorId).get(),
    ]);

    if (!idosoDoc.exists) throw new BadRequestException('Idoso não encontrado');
    if (!respDoc.exists) throw new BadRequestException('Responsável não encontrado');
    if (!cuidadorDoc.exists) throw new BadRequestException('Cuidador não encontrado');

    // ✅ monta o objeto completo
    const visita: Visita = {
      ...dto,
      dataVisita: Timestamp.fromDate(new Date(dto.dataVisita)),
    };

    // ✅ salva
    const docRef = await this.collection.add(visita);

    await this.criarNotificacaoVisita(dto, docRef.id);

    return { id: docRef.id, ...visita };
  }

  private async criarNotificacaoVisita(dto: VisitaDto, visitaId: string) {
    try {
      const idosoDoc = await this.idososCollection.doc(dto.idosoId).get();
      const nomeIdoso = idosoDoc.exists ? idosoDoc.data()?.nome : 'o idoso';

      const dataVisita = new Date(dto.dataVisita);
      const dataFormatada = dataVisita.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
      const horaFormatada = dataVisita.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      });

      await this.notificacoesCollection.add({
        titulo: '📅 Nova visita agendada',
        mensagem: `Uma visita foi marcada com ${nomeIdoso} no dia ${dataFormatada} às ${horaFormatada}.`,
        usuarioId: dto.responsavelId, // 👈 responsável recebe a notificação
        tarefaId: visitaId,
        tipo: 'Visita',
        lida: false,
        dataEnvio: Timestamp.now(),
      });
    } catch (error) {
      console.error('❌ Erro ao criar notificação de visita:', error);
    }
  }
  async findAll() {
    const snapshot = await this.collection.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async findByCuidador(cuidadorId: string) {
    const snapshot = await this.collection.where('cuidadorId', '==', cuidadorId).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async findByIdoso(idosoId: string) {
    const snapshot = await this.collection.where('idosoId', '==', idosoId).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async findByResponsavel(responsavelId: string) {
    const snapshot = await this.collection.where('responsavelId', '==', responsavelId).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async findOne(id: string) {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) throw new Error('Visita não encontrada');
    return { id: doc.id, ...doc.data() };
  }

  async update(id: string, data: Partial<VisitaDto>) {
    const updateData: any = { ...data };

    // 🔹 converte dataVisita se necessário
    if (data.dataVisita && !(data.dataVisita instanceof Timestamp)) {
      updateData.dataVisita = Timestamp.fromDate(new Date(data.dataVisita as any));
    }

    await this.collection.doc(id).update(updateData);
    return this.findOne(id);
  }

  async delete(id: string) {
    await this.collection.doc(id).delete();
    return { message: 'Visita removida com sucesso' };
  }
}
