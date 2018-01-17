import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ActiveRoute } from 'meteor/zimme:active-route';

import { Jogadores } from '../../../api/jogadores/jogadores';

import gju from 'geojson-utils';

import './cidade.html';

Template.cidade.onCreated(function cidadeOnCreated() {

});

Template.cidade.helpers({
  distancia() {
    const jogador = Jogadores.findOne({userId: Meteor.userId()});
    return Math.round(gju.pointDistance(jogador.localizacao, this.localizacao) * 100) / 100;
  }
});

Template.cidade.events({});