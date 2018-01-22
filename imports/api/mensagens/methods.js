import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Jogadores } from '../jogadores/jogadores';

import { checarUsuario } from '../utils';
import { Mensagens } from "./mensagens";

export const marcarLida = new ValidatedMethod({
  name: 'mensagens.marcarLida',
  validate: new SimpleSchema({
    mensagemId: { type: String, regEx: SimpleSchema.RegEx.Id }
  }).validator(),
  run({ mensagemId }) {
    checarUsuario(this);

    const jogador = Jogadores.findOne({ userId: this.userId });
    const mensagem = Mensagens.findOne({ _id: mensagemId, jogadorId: jogador._id, lida: false });

    if (mensagem) {
      Mensagens.update({ _id: mensagem._id }, { $set: { lida: true } });
    }
  }
});
