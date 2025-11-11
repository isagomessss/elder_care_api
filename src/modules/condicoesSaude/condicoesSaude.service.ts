import { Injectable } from '@nestjs/common';
import { firestore } from '../../firebase.config';
import { CondicaoSaude } from './condicoesSaude.entity';
import { CondicaoSaudeDto } from './condicoesSaude.dto';

@Injectable()
export class CondicoesSaudeService {
  private collection = firestore.collection('condicoesSaude');

  // 🔹 Criar uma nova condição
  async create(dto: CondicaoSaudeDto) {
    const condicao: CondicaoSaude = { ...dto };
    const docRef = await this.collection.add(condicao);
    return { id: docRef.id, ...condicao };
  }

  // 🔹 Listar todas as condições
  async findAll() {
    const snapshot = await this.collection.get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  // 🔹 Buscar uma condição por ID
  async findOne(id: string) {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) throw new Error('Condição de saúde não encontrada');
    return { id: doc.id, ...doc.data() };
  }

  // 🔹 Atualizar uma condição
  async update(id: string, data: Partial<CondicaoSaude>) {
    await this.collection.doc(id).update(data);
    const updated = await this.findOne(id);
    return updated;
  }

  // 🔹 Deletar uma condição
  async delete(id: string) {
    await this.collection.doc(id).delete();
    return { message: 'Condição de saúde removida com sucesso' };
  }
}
