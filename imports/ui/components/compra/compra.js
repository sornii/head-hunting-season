import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ActiveRoute } from 'meteor/zimme:active-route';
import { ReactiveVar } from 'meteor/reactive-var';
import { comprar } from '../../../api/mercado/methods';

import './compra.html';

Template.compra.onCreated(function compraOnCreated() {
  this.quantidadeComprar = new ReactiveVar();
});

Template.compra.helpers({
  quantidadeComprar() {
    let instance = Template.instance();
    return instance.quantidadeComprar.get();
  }
});

Template.compra.events({
  'change input, keyup input': function (event, instance) {
    instance.quantidadeComprar.set(event.target.value);
  },
  'click button': function (event, instance) {
    event.preventDefault();

    const mercadoId = this._id;
    const quantidade = Number(instance.quantidadeComprar.get());

    comprar.call({mercadoId, quantidade});
  }
});