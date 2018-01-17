import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ActiveRoute } from 'meteor/zimme:active-route';
import { ReactiveVar } from 'meteor/reactive-var';

import './trabalho.html';

Template.trabalho.onCreated(function trabalhoOnCreated() {

  this.tempoRestante = new ReactiveVar(this.data.tempoRestante());

  this.interval = setInterval(() => {
    this.tempoRestante.set(this.data.tempoRestante())
  }, 1000);
});

Template.trabalho.onDestroyed(function trabalhoOnDestroyed() {
  clearInterval(this.internal);
});

Template.trabalho.helpers({
  tempoRestanteReactive() {
    return Template.instance().tempoRestante.get();
  }
});

Template.trabalho.events({
});