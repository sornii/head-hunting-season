import {Template} from "meteor/templating";
import {FlowRouter} from "meteor/kadira:flow-router";
import {ActiveRoute} from "meteor/zimme:active-route";
import {ReactiveVar} from 'meteor/reactive-var';
import {comprar} from '../../../api/mercado/methods';

import "./compra.html";

Template.compra.onCreated(function vendaOnCreated() {
  this.quantidade = new ReactiveVar();
});

Template.compra.helpers({
  quantidade() {
    let instance = Template.instance();
    return instance.quantidade.get();
  }
});

Template.compra.events({
  'change input': function (event, instance) {
    instance.quantidade.set(event.target.value);
  },
  'click button': function (event, instance) {
    event.preventDefault();

    const mercadoId = this._id;
    //const quantidade = Number(instance.quantidade.get());
    const quantidade = 1;

    comprar.call({mercadoId, quantidade});
  }
});