import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ActiveRoute } from 'meteor/zimme:active-route';

import { Mensagens } from "../../../api/mensagens/mensagens";

import './mensagens.html';

Template.mensagens.onCreated(function mensagensOnCreated() {

});

Template.mensagens.helpers({
  mensagens() {
    return Mensagens.find({});
  }
});

Template.mensagens.events({

});