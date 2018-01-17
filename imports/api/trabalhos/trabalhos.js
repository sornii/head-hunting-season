import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

import { Jogadores } from "../jogadores/jogadores";
import { Homens } from "../homens/homens";
import { Receitas } from "../receitas/receitas";

import moment from 'moment';
import 'moment-duration-format';

export const Trabalhos = new Mongo.Collection('Trabalhos');

Trabalhos.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

const TrabalhoSchema = new SimpleSchema({
  jogadorId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  homemId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  receitaId: {
    type: String,
    regEx: SimpleSchema.RegEx.Id
  },
  quantidade: {
    type: Number
  },
  dataInicio: {
    type: Date
  },
  finalizado: {
    type: Boolean,
    defaultValue: false
  }
});

Trabalhos.helpers({
  jogador() {
    return Jogadores.findOne({ _id: this.jogadorId });
  },
  homem() {
    return Homens.findOne({ _id: this.homemId, jogadorId: this.jogadorId });
  },
  receita() {
    return Receitas.findOne({ _id: this.receitaId });
  },
  dataFinal() {
    return moment(this.dataInicio).add(this.receita().duracao());
  },
  tempoRestante() {
    return moment.duration(this.dataFinal().diff(moment()), 'ms').format('hh:mm:ss');
  },
  precisaFinalizar() {
    return !this.finalizado && this.dataFinal().isBefore(moment());
  }
});

Trabalhos.attachSchema(TrabalhoSchema);