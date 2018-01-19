import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ActiveRoute } from 'meteor/zimme:active-route';

import './mensagensIcon.html';
import { Mensagens } from "../../../../api/mensagens/mensagens";
import MensagemModal from "../mensagemModal";

Template.mensagensIcon.onCreated(function mensagensIconOnCreated() {
  this.mensagemModal = new MensagemModal();
});

Template.mensagensIcon.helpers({
  mensagensLer() {
    return Mensagens.find({ lida: false }).count();
  }
});

Template.mensagensIcon.events({
  'click #mensagensIcon' (event, instance) {
    event.preventDefault();
    instance.mensagemModal.mostrar();
  }
});
