import {Template} from "meteor/templating";
import {FlowRouter} from "meteor/kadira:flow-router";
import {ActiveRoute} from "meteor/zimme:active-route";
import {Tracker} from "meteor/tracker";

import {Jogadores} from "../../../api/jogadores/jogadores";
import {trocarNome} from "../../../api/jogadores/methods";
import {Mercado} from "../../../api/mercado/mercado";

import "../../components/venda/venda";
import "../../components/compra/compra";

import "./home.html";

Template.home.onRendered(function homeOnRendered() {

});

Template.home.onCreated(function homeOnCreated() {

  this.nomeJogador = "";

  Tracker.autorun(() => {
    const userId = Meteor.userId();
    this.subscribe('meuperfil');
  });

  this.subscribe('mercado');
});

Template.home.helpers({
  meuPerfil() {
    return Jogadores.findOne({userId: Meteor.userId()});
  },
  mercado() {
    return Mercado.find({});
  }
});

Template.home.events({
  'change .meuNome': function (event, instance) {
    instance.nomeJogador = event.target.value;
  },
  'click .mudarNome': function (event, instance) {
    event.preventDefault();
    trocarNome.call({nome: instance.nomeJogador});
  }
});
