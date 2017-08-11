import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Mercado = new Mongo.Collection('Mercado');

Mercado.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

const MercadoSchema = new SimpleSchema({
  nome: {
    type: String
  },
  quantidade: {
    type: Number,
    defaultValue: 1,
    min: 1
  },
  preco: {
    type: Number,
    min: 1
  }
});

Mercado.helpers({
});

Mercado.attachSchema(MercadoSchema);