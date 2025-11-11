// src/modules/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { firestore } from '../../firebase.config';
import { Usuario } from './usuario.entity';
import { UsuariosDto } from './usuario.dto';
import { Timestamp } from 'firebase-admin/firestore';
@Injectable()
export class UsuariosService {
    private collection = firestore.collection('usuários');

    async create(dto: UsuariosDto) {
        const user = {
            ...dto,
            dataCadastro: dto.dataCadastro
                ? Timestamp.fromDate(new Date(dto.dataCadastro))
                : Timestamp.now(), // gera data atual se não vier
        };

        const docRef = await this.collection.add(user);
        return { id: docRef.id, ...user };
    }



    async findAll() {
        const snapshot = await this.collection.get();
        return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    }

    async findOne(id: string) {
        const doc = await this.collection.doc(id).get();
        if (!doc.exists) throw new Error('Usuário não encontrado');
        return { id: doc.id, ...doc.data() };
    }

    async update(id: string, user: Partial<Usuario>) {
        await this.collection.doc(id).update(user);
        const updated = await this.findOne(id);
        return updated;
    }

    async delete(id: string) {
        await this.collection.doc(id).delete();
        return { message: 'Usuário removido com sucesso' };
    }
}
