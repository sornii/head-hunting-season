import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Itens } from '../itens/itens';

import { _ } from 'underscore';

export const Criaturas = new Mongo.Collection('Criaturas');

Criaturas.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

const CriaturaItemSchema = new SimpleSchema({
  itemId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  quantidade: {
    type: Number,
    min: 1
  },
  chance: {
    type: Number,
    min: 1,
    max: 100000
  }
});

const CriaturaSchema = new SimpleSchema({
  _itens: {
    type: [CriaturaItemSchema]
  },
  nome: {
    type: String
  }
});

Criaturas.helpers({
  itens() {
    return _.map(this._itens, item => ({
      item: Itens.findOne({_id: item.itemId}),
      quantidade: item.quantidade
    }));
  }
});

Criaturas.attachSchema(CriaturaSchema);