import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Jogadores = new Mongo.Collection('Messages');

Jogadores.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

const InventarioSchema = new SimpleSchema({
  nome: {
    type: String
  }
});

const JogadorSchema = new SimpleSchema({
  userId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  dinheiro: {
    type: Number,
    defaultValue: 0
  },
  inventario: [InventarioSchema]
});

Jogadores.helpers({
});

Jogadores.attachSchema(JogadorSchema);