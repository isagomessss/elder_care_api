import { Injectable, NotFoundException } from '@nestjs/common';
import { firestore } from '../../firebase.config';
import { Idosos } from './idosos.entity';
import { IdososDto } from './idosos.dto';
import { Timestamp } from 'firebase-admin/firestore';

@Injectable()
export class IdososService {
  private collection = firestore.collection('idosos');

  // 🧩 Utilitário para converter qualquer tipo de valor para Timestamp
  private toTimestamp(value: any): Timestamp | undefined {
    if (!value) return undefined;
    if (value instanceof Timestamp) return value;
    if (typeof value === 'object' && value._seconds)
      return Timestamp.fromMillis(value._seconds * 1000);
    if (typeof value === 'string')
      return Timestamp.fromDate(new Date(value));
    return undefined;
  }

  async setFotoBase64(id: string, fotoBase64: string | null) {
    const ref = this.collection.doc(id);
    const snap = await ref.get();
    if (!snap.exists) throw new NotFoundException('Idoso não encontrado');

    const payload: Partial<Idosos> = {
      fotoBase64: fotoBase64 ?? null,
      dataAtualizacaoFoto: Timestamp.now(),
    };

    Object.keys(payload).forEach(
      key => (payload as any)[key] === undefined && delete (payload as any)[key]
    );

    await ref.update(payload);
    return this.findOne(id);
  }

  async gerarIdentificadorUnico(): Promise<number> {
    let identificador;
    let existe = true;

    while (existe) {
      identificador = Math.floor(10000 + Math.random() * 90000); // 5 dígitos
      const snapshot = await this.collection
        .where('identificador', '==', identificador)
        .limit(1)
        .get();
      existe = !snapshot.empty;
    }

    return identificador;
  }


  // 👇 Função auxiliar para calcular idade com base em data de nascimento
  private calcularIdade(dataNascimento: Date): number {
    const hoje = new Date();
    let idade = hoje.getFullYear() - dataNascimento.getFullYear();
    const mes = hoje.getMonth() - dataNascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < dataNascimento.getDate())) {
      idade--;
    }
    return idade;
  }

  // ✅ Criação de idoso com cálculo automático de idade
  // ✅ Criação de idoso com cálculo automático de idade e identificador gerado
  async create(dto: IdososDto) {
    // ⚙️ Gera identificador se não foi informado
    const identificador =
      dto.identificador && dto.identificador > 0
        ? dto.identificador
        : await this.gerarIdentificadorUnico();

    // 🔄 Converte formato brasileiro "DD/MM/YYYY" se vier assim
    let dataNascimentoStr = dto.dataNascimento;
    if (dataNascimentoStr.includes('/')) {
      const [dia, mes, ano] = dataNascimentoStr.split('/');
      dataNascimentoStr = `${ano}-${mes}-${dia}`;
    }

    const dataNascimentoDate = new Date(dataNascimentoStr);
    if (isNaN(dataNascimentoDate.getTime())) {
      throw new Error('Data de nascimento inválida');
    }

    // 🧮 Calcula idade automaticamente
    const idade = this.calcularIdade(dataNascimentoDate);

    // 🧩 Monta o objeto final do idoso
    const idoso: Idosos = {
      ...dto,
      identificador, // 👈 agora é automático!
      idade,
      dataCadastro: this.toTimestamp(dto.dataCadastro) ?? Timestamp.now(),
      dataNascimento: Timestamp.fromDate(dataNascimentoDate),
      fotoBase64: dto.fotoBase64 || null,
    };

    // 💾 Salva no Firestore
    const docRef = await this.collection.add(idoso);
    return { id: docRef.id, ...idoso };
  }

  // ✅ Busca idoso pelo identificador numérico
  async findByIdentificador(identificador: number) {
    const snapshot = await this.collection
      .where('identificador', '==', identificador)
      .limit(1)
      .get();

    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];
    const data = doc.data() as any;
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

  async findByCuidador(cuidadorId: string) {
    const snapshot = await this.collection
      .where('cuidadorId', '==', cuidadorId)
      .get();

    if (snapshot.empty) return [];

    return snapshot.docs.map(doc => {
      const data = doc.data() as any;
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

  // ✅ Retorna todos os idosos (convertendo timestamps para datas JS)
  async findAll() {
    const snapshot = await this.collection.get();
    return snapshot.docs.map(doc => {
      const data = doc.data() as any;
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

  // ✅ Busca individual
  async findOne(id: string) {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) throw new Error('Idoso não encontrado');

    const data = doc.data() as any;
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

  async findByResponsavel(responsavelId: string) {
    const snapshot = await this.collection
      .where("responsavelId", "==", responsavelId)
      .get();

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  }

  // ✅ Atualização com verificação de tipos e recálculo automático de idade
  async update(id: string, data: Partial<Idosos>) {
    data.dataCadastro = this.toTimestamp(data.dataCadastro);
    data.dataNascimento = this.toTimestamp(data.dataNascimento);

    if (data.dataNascimento instanceof Timestamp) {
      const dataNasc = data.dataNascimento.toDate();
      data.idade = this.calcularIdade(dataNasc);
    }

    // 🔥 remove todos os campos undefined antes do update
    Object.keys(data).forEach(
      key => data[key as keyof typeof data] === undefined && delete data[key as keyof typeof data]
    );

    await this.collection.doc(id).update(data);
    return this.findOne(id);
  }


  // ✅ Exclusão
  async delete(id: string) {
    await this.collection.doc(id).delete();
    return { message: 'Idoso removido com sucesso' };
  }
}
