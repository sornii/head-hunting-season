import {Template} from "meteor/templating";
import {FlowRouter} from "meteor/kadira:flow-router";
import {ActiveRoute} from "meteor/zimme:active-route";
import {ReactiveVar} from 'meteor/reactive-var';
import {colocarVenda} from '../../../api/mercado/methods';

import "./venda.html";

Template.venda.onCreated(function vendaOnCreated() {
  this.preco = new ReactiveVar();
});

Template.venda.helpers({
  preco() {
    let instance = Template.instance();
    return instance.preco.get();
  }
});

Template.venda.events({
  'change input': function (event, instance) {
    instance.preco.set(event.target.value);
  },
  'click button': function (event, instance) {
    event.preventDefault();

    const inventarioId = this._id;
    const preco = Number(instance.preco.get());
    const quantidade = 1;

    colocarVenda.call({inventarioId, preco, quantidade});
  }
});