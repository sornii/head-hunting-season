import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Itens = new Mongo.Collection('Itens');

Itens.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

const ItemSchema = new SimpleSchema({
  nome: {
    type: String
  }
});

Itens.helpers({
});

Itens.attachSchema(ItemSchema);