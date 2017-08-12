import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Itens } from '../itens/itens';

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
  itemId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  quantidade: {
    type: Number,
    defaultValue: 1,
    min: 1
  }
});

Inventarios.helpers({
  item() {
    return Itens.findOne({_id: this.itemId});
  }
});

Inventarios.attachSchema(InventarioSchema);