import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Criaturas } from '../criaturas/criaturas';

import { _ } from 'underscore';

export const Bandos = new Mongo.Collection('Bandos');

Bandos.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

const BandoCriaturaSchema = new SimpleSchema({
  criaturaId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  quantidade: {
    type: Number,
    min: 1
  }
});

const BandoSchema = new SimpleSchema({
  nome: {
    type: String
  },
  _criaturas: {
    type: [BandoCriaturaSchema],
    minCount: 1
  }
});

Bandos.helpers({
  criaturas() {
    return _.map(this._criaturas, criatura => ({
      item: Criaturas.findOne({_id: criatura.criaturaId}),
      quantidade: criatura.quantidade
    }));
  }
});

Bandos.attachSchema(BandoSchema);