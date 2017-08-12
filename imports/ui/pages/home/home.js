import {Template} from "meteor/templating";
import {FlowRouter} from "meteor/kadira:flow-router";
import {ActiveRoute} from "meteor/zimme:active-route";
import {Tracker} from "meteor/tracker";

import {Jogadores} from "../../../api/jogadores/jogadores";
import {Mercado} from "../../../api/mercado/mercado";

import {colocarVenda, comprar} from "../../../api/mercado/methods";

import "./home.html";

import $ from "jquery";

Template.home.onRendered(function homeOnRendered() {

});

Template.home.onCreated(function homeOnCreated() {

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
  'click .colocarVenda' (event) {
    event.preventDefault();

    const nome = this.nome;
    const preco = Number($('input[item=\'' + this.nome + '\']').val());

    colocarVenda.call({nome, preco});
  },
  'click .comprar' (event) {
    event.preventDefault();

    console.log(this);

    //comprar(nome);
  }
});
