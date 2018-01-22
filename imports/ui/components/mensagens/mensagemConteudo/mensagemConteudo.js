import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ActiveRoute } from 'meteor/zimme:active-route';

import './mensagemConteudo.html';
import MensagemConteudoModal from "./mensagemConteudoModal";

const mensagem = () => Template.instance().mensagem.get();

Template.mensagemConteudo.onCreated(function mensagemConteudoOnCreated() {
  this.mensagemConteudoModal = new MensagemConteudoModal();
  this.mensagem = this.mensagemConteudoModal.mensagem;
});

Template.mensagemConteudo.helpers({
  topico() {
    return mensagem().topico;
  },
  conteudo() {
    return mensagem().conteudo;
  }
});

Template.mensagemConteudo.events({
});