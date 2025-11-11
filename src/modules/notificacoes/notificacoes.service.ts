import { Injectable, BadRequestException } from '@nestjs/common';
import { firestore } from '../../firebase.config';
import { Notificacoes } from './notificacoes.entity';
import { NotificacoesDto } from './notificacoes.dto';
import { Timestamp } from 'firebase-admin/firestore';

@Injectable()
export class NotificacoesService {
    private collection = firestore.collection('notificacoes');

    // 🔹 Mantém os métodos originais intactos
    async findAll() {
        const snapshot = await this.collection.get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    async findByUsuario(usuarioId: string) {
        const snapshot = await this.collection.where('usuarioId', '==', usuarioId).get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    async findOne(id: string) {
        const doc = await this.collection.doc(id).get();
        if (!doc.exists) throw new Error('Notificação não encontrada');
        return { id: doc.id, ...doc.data() };
    }

    async update(id: string, data: Partial<NotificacoesDto>) {
        const updateData: any = { ...data };

        if (data.dataEnvio && !(data.dataEnvio instanceof Timestamp)) {
            updateData.dataEnvio = Timestamp.fromDate(new Date(data.dataEnvio as any));
        }

        await this.collection.doc(id).update(updateData);
        return this.findOne(id);
    }

    async delete(id: string) {
        await this.collection.doc(id).delete();
        return { message: 'Notificação removida com sucesso' };
    }
}
