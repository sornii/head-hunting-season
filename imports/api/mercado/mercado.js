import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Itens } from '../itens/itens';

export const Mercado = new Mongo.Collection('Mercado');

Mercado.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

const MercadoSchema = new SimpleSchema({
  jogadorId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  itemId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
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
  item() {
    return Itens.findOne({_id: this.itemId});
  },
  precoTotal(quantidade) {
    if (quantidade) {
      return quantidade * this.preco;
    }
    return this.quantidade * this.preco;
  }
});

Mercado.attachSchema(MercadoSchema);