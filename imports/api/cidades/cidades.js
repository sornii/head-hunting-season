import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { PointSchema } from '../geolocations/point';

export const Cidades = new Mongo.Collection('Cidades');

Cidades.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

const CidadeSchema = new SimpleSchema({
  nome: {
    type: String
  },
  localizacao: {
    type: PointSchema
  }
});

Cidades.helpers({
});

Cidades.attachSchema(CidadeSchema);