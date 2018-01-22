import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ActiveRoute } from 'meteor/zimme:active-route';

import './mensagem.html';
import MensagemConteudoModal from "../mensagemConteudo/mensagemConteudoModal";
import { marcarLida } from "../../../../api/mensagens/methods";

Template.mensagem.onCreated(function mensagemOnCreated() {
  this.mensagemConteudoModal = new MensagemConteudoModal();
});

Template.mensagem.helpers({

});

Template.mensagem.events({
  'click .ler' (event, instance) {
    event.preventDefault();
    if (!this.lida) {
      const mensagemId = this._id;
      marcarLida.call({ mensagemId });
    }
    instance.mensagemConteudoModal.mostrar(this);
  },
  'click .excluir' (event, instance) {
    event.preventDefault();
  }
});