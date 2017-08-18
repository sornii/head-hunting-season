import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ActiveRoute } from 'meteor/zimme:active-route';

import { Jogadores } from '../../../api/jogadores/jogadores';

import './bando.html';

import gju from 'geojson-utils';

Template.bando.onCreated(function vendaOnCreated() {

});

Template.bando.helpers({
  distancia() {
    const jogador = Jogadores.findOne({userId: Meteor.userId()});
    return Math.round(gju.pointDistance(jogador.localizacao, this.localizacao) * 100) / 100;
  }
});

Template.bando.events({});