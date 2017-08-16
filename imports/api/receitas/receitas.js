import { Mongo } from 'meteor/mongo';
import { Itens } from '../itens/itens';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import {_} from 'underscore';

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
  itemId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  itens: {
    type: [ReceitaItemSchema],
    minCount: 1
  }
});

Receitas.helpers({
  item() {
    return Itens.findOne({_id: this.itemId});
  },
  itensReceita() {
    return _.map(this.itens, item => ({item: Itens.findOne({_id: item.itemId}), quantidade: item.quantidade}));
  },
  quantidadeItens() {
    return this.itens.length;
  }
});

Receitas.attachSchema(ReceitaSchema);