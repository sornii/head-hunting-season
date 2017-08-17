import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import Profissoes from '../profissoes/profissoes';

export const Cacadas = new Mongo.Collection('Cacadas');

Cacadas.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

const CacadaSchema = new SimpleSchema({
  homens: {
    type: Array
  },
  "homens.$": {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  bandoId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  }
});

Cacadas.helpers({
  profissao() {
    return Profissoes[this._profissao];
  }
});

Cacadas.attachSchema(CacadaSchema);