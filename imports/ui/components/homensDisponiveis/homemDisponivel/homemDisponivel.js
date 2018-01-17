import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ActiveRoute } from 'meteor/zimme:active-route';

import './homemDisponivel.html';
import HomemModal from "../homemModal";

Template.homemDisponivel.onCreated(function homemDisponivelOnCreated() {
  this.homemModal = new HomemModal();
});

Template.homemDisponivel.helpers({});

Template.homemDisponivel.events({
  'click button': function (event, instance) {
    event.preventDefault();

    instance.homemModal.aplicar(this);
  }
});
