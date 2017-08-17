import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import Profissoes from '../profissoes/profissoes';
import { Itens } from '../itens/itens';

import { _ } from 'underscore';

export const Receitas = new Mongo.Collection('Receitas');

Receitas.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

const ReceitaItemSchema = new SimpleSchema({
  itemId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  quantidade: {
    type: Number,
    min: 1
  }
});

const ReceitaSchema = new SimpleSchema({
  _profissao: {
    type: String
  },
  itemId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  _itens: {
    type: [ReceitaItemSchema],
    minCount: 1
  },
  segundos: {
    type: Number
  }
});

Receitas.helpers({
  profissao() {
    return Profissoes[this._profissao];
  },
  item() {
    return Itens.findOne({_id: this.itemId});
  },
  itens() {
    return _.map(this._itens, item => ({
      item: Itens.findOne({_id: item.itemId}),
      quantidade: item.quantidade
    }));
  }
});

Receitas.attachSchema(ReceitaSchema);