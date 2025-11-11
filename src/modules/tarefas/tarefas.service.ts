import { Injectable } from '@nestjs/common';
import { firestore } from '../../firebase.config';
import { Tarefas } from './tarefas.entity';
import { TarefasDto } from './tarefas.dto';
import { Timestamp } from 'firebase-admin/firestore';

@Injectable()
export class TarefasService {
  private collection = firestore.collection('tarefas');
  private notificacoes = firestore.collection('notificacoes'); // 👈 adicionamos isso

  private async updateStatusForDocs(
    docs: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>[]
  ): Promise<Set<string>> {
    const agora = new Date();
    const batch = firestore.batch();
    const atualizados = new Set<string>();

    docs.forEach((doc) => {
      const data = doc.data() as Tarefas | undefined;
      if (!data || !data.dataHora) {
        return;
      }

      const dataHora =
        data.dataHora instanceof Timestamp
          ? data.dataHora.toDate()
          : new Date(data.dataHora as any);

      const statusAtual = (data.status as string)?.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

      if (dataHora < agora && statusAtual !== 'Concluida' && statusAtual !== 'Atrasada') {
        batch.update(doc.ref, { status: 'Atrasada' });
        atualizados.add(doc.id);
      }
    });

    if (atualizados.size > 0) {
      await batch.commit();
    }

    return atualizados;
  }

  // 🔹 Criar uma nova tarefa
  async create(dto: TarefasDto) {
    const tarefa: Tarefas = {
      ...dto,
      dataHora: dto.dataHora
        ? Timestamp.fromDate(new Date(dto.dataHora))
        : Timestamp.now(),
    };

    // 🔸 Cria a tarefa
    const docRef = await this.collection.add(tarefa);

    // 🔸 Cria a notificação associada
    await this.notificacoes.add({
      usuarioId: dto.cuidadorId, // 👈 o cuidador recebe a notificação
      titulo: `Nova tarefa: ${dto.titulo}`,
      mensagem: dto.descricao,
      dataEnvio: Timestamp.now(),
      lida: false,
    });

    return { id: docRef.id, ...tarefa };
  }

  async findByIdoso(idosoId: string) {
    const snapshot = await this.collection.where('idosoId', '==', idosoId).get();
    const atualizados = await this.updateStatusForDocs(snapshot.docs);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      ...(atualizados.has(doc.id) ? { status: 'Atrasada' } : {}),
    }));
  }

  // 🔹 Listar todas as tarefas
  async findAll() {
    const snapshot = await this.collection.get();
    const atualizados = await this.updateStatusForDocs(snapshot.docs);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      ...(atualizados.has(doc.id) ? { status: 'Atrasada' } : {}),
    }));
  }

  // 🔹 Buscar uma tarefa por ID
  async findOne(id: string) {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) throw new Error('Tarefa não encontrada');

    const atualizados = await this.updateStatusForDocs([doc]);

    return {
      id: doc.id,
      ...doc.data(),
      ...(atualizados.has(doc.id) ? { status: 'Atrasada' } : {}),
    };
  }

  // 🔹 Atualizar uma tarefa
  async update(id: string, data: Partial<Tarefas>) {
    if (data.dataHora && !(data.dataHora instanceof Timestamp)) {
      data.dataHora = Timestamp.fromDate(new Date(data.dataHora as any));
    }

    await this.collection.doc(id).update(data);
    const updated = await this.findOne(id);
    return updated;
  }

  // 🔹 Deletar uma tarefa
  async delete(id: string) {
    await this.collection.doc(id).delete();
    return { message: 'Tarefa removida com sucesso' };
  }
}
