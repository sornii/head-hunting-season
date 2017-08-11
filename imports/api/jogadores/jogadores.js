import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Inventarios } from '../inventarios/inventarios';

export const Jogadores = new Mongo.Collection('Jogadores');

Jogadores.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

const JogadorSchema = new SimpleSchema({
  userId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  dinheiro: {
    type: Number,
    defaultValue: 50,
    min: 0
  }
});

Jogadores.helpers({
  inventario() {
    return Inventarios.find({jogadorId: this._id});
  }
});

Jogadores.attachSchema(JogadorSchema);