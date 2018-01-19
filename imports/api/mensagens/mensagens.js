import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Jogadores } from "../jogadores/jogadores";

export const Mensagens = new Mongo.Collection('Mensagens');

Mensagens.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

const MensagemSchema = new SimpleSchema({
  jogadorId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  remetente: {
    type: String
  },
  topico: {
    type: String
  },
  conteudo: {
    type: String
  },
  lida: {
    type: Boolean,
    defaultValue: false
  }
});

Mensagens.helpers({
  jogador() {
    return Jogadores.findOne({ _id: this.jogadorId });
  }
});

Mensagens.attachSchema(MensagemSchema);
