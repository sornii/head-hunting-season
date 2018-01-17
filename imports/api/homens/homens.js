import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import Profissoes from '../profissoes/profissoes';
import { Jogadores } from "../jogadores/jogadores";

export const Homens = new Mongo.Collection('Homens');

Homens.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

const HomemSchema = new SimpleSchema({
  _profissao: {
    type: String
  },
  jogadorId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: true
  },
  nome: {
    type: String
  },
  ocupado: {
    type: Boolean,
    defaultValue: false
  }
});

Homens.helpers({
  jogador() {
    return Jogadores.findOne({ _id: this.jogadorId });
  },
  profissao() {
    return Profissoes[this._profissao];
  }
});

Homens.attachSchema(HomemSchema);
