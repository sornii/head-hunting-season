import {Meteor} from "meteor/meteor";
import {Jogadores} from "../jogadores";

Meteor.publish('meuperfil', function () {
  const jogador = Jogadores.findOne({userId: this.userId}).fetch();

  if (!jogador) {
    Jogadores.insert({userId: this.userId, inventario: []});
  }

  return Jogadores.find({userId: this.userId});
});