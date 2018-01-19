import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ActiveRoute } from 'meteor/zimme:active-route';

import './mensagem.html';

Template.mensagem.onCreated(function mensagemOnCreated() {

});

Template.mensagem.helpers({

});

Template.mensagem.events({
  'click .ler' (event, instance) {
    event.preventDefault();
  },
  'click .excluir' (event, instance) {
    event.preventDefault();
  }
});