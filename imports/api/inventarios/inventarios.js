import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Inventarios = new Mongo.Collection('Inventarios');

Inventarios.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

const InventarioSchema = new SimpleSchema({
  jogadorId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  nome: {
    type: String
  },
  quantidade: {
    type: Number,
    defaultValue: 1,
    min: 1
  }
});

Inventarios.helpers({
});

Inventarios.attachSchema(InventarioSchema);