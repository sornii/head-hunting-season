import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import Profissoes from '../profissoes/profissoes';

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
    regEx: SimpleSchema.RegEx.Id
  },
  nome: {
    type: String
  }
});

Homens.helpers({
  profissao() {
    return Profissoes[this._profissao];
  }
});

Homens.attachSchema(HomemSchema);