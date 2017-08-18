import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { PointSchema } from '../geolocations/point';
import { Inventarios } from '../inventarios/inventarios';
import { Homens } from '../homens/homens';
import { Cidades } from '../cidades/cidades';

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
  redefinirNome: {
    type: Boolean,
    defaultValue: true
  },
  nome: {
    type: String,
    min: 4,
    max: 20
  },
  dinheiro: {
    type: Number,
    defaultValue: 50,
    min: 0
  },
  localizacao: {
    type: PointSchema
  },
  cidadeId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  }
});

Jogadores.helpers({
  inventario() {
    return Inventarios.find({jogadorId: this._id});
  },
  homens() {
    return Homens.find({jogadorId: this._id});
  },
  cidade() {
    return Cidades.findOne({_id: this.cidadeId});
  }
});

Jogadores.attachSchema(JogadorSchema);