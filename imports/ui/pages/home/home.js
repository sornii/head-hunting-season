import {Template} from "meteor/templating";
import {FlowRouter} from "meteor/kadira:flow-router";
import {ActiveRoute} from "meteor/zimme:active-route";

import {Jogadores} from "../../../api/jogadores/jogadores";

import "./home.html";

Template.home.onRendered(function homeOnRendered() {

});

Template.home.onCreated(function homeOnCreated() {
  this.subscribe('meuperfil');
});

Template.home.helpers({
  meuPerfil() {
    return Jogadores.find({}).fetch()[0];
  }
});

Template.home.events({});
