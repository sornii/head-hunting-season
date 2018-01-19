import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ActiveRoute } from 'meteor/zimme:active-route';

import { Mensagens } from "../../../api/mensagens/mensagens";

import './mensagem/mensagem';
import './mensagensModal.html';
import MensagemModal from "./mensagemModal";

Template.mensagensModal.onCreated(function mensagensModalOnCreated() {

});

Template.mensagensModal.onRendered(function mensagensModalOnRendered() {
  this.mensagemModal = new MensagemModal();
});

Template.mensagensModal.helpers({
  mensagens() {
    return Mensagens.find({});
  }
});

Template.mensagensModal.events({});
