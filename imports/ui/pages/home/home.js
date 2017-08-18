import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ActiveRoute } from 'meteor/zimme:active-route';
import { ReactiveVar } from 'meteor/reactive-var';
import { Tracker } from 'meteor/tracker';

import { Jogadores } from '../../../api/jogadores/jogadores';
import { trocarNome } from '../../../api/jogadores/methods';
import { Mercado } from '../../../api/mercado/mercado';
import { Receitas } from '../../../api/receitas/receitas';
import { Bandos } from '../../../api/bandos/bandos';

import '../../components/venda/venda';
import '../../components/compra/compra';
import '../../components/receita/receita';
import '../../components/bando/bando';

import './home.html';

Template.home.onRendered(function homeOnRendered() {

});

Template.home.onCreated(function homeOnCreated() {

  this.idGerado = new ReactiveVar();

  this.nomeJogador = '';

  Tracker.autorun(() => {
    const userId = Meteor.userId();
    this.subscribe('meuperfil');
  });

  this.subscribe('mercado');
  this.subscribe('receitas');
  this.subscribe('bandos.proximos');
});

Template.home.helpers({
  meuPerfil() {
    return Jogadores.findOne({userId: Meteor.userId()});
  },
  mercado() {
    return Mercado.find({});
  },
  receitas() {
    return Receitas.find({});
  },
  bandos() {
    return Bandos.find({});
  },
  idGerado() {
    return Template.instance().idGerado.get();
  }
});

Template.home.events({
  'change .meuNome': function (event, instance) {
    instance.nomeJogador = event.target.value;
  },
  'click .mudarNome': function (event, instance) {
    event.preventDefault();
    trocarNome.call({nome: instance.nomeJogador});
  },
  'click .gerador-id': function (event, instance) {
    event.preventDefault();
    let id = Random.id();
    instance.idGerado.set(id);
  }
});
