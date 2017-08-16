import {Template} from "meteor/templating";
import {FlowRouter} from "meteor/kadira:flow-router";
import {ActiveRoute} from "meteor/zimme:active-route";
import {ReactiveVar} from 'meteor/reactive-var';

import {fabricarItem} from '../../../api/receitas/methods';

import "./receita.html";

Template.receita.onCreated(function receitaOnCreated() {
});

Template.receita.helpers({});

Template.receita.events({
  'click button': function (event, instance) {
    event.preventDefault();

    const receitaId = this._id;
    const quantidade = 1;

    fabricarItem.call({receitaId, quantidade});
  }
});