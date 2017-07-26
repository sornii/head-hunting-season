import {ValidatedMethod} from "meteor/mdg:validated-method";
import {SimpleSchema} from "meteor/aldeed:simple-schema";
import {Jogadores} from "../jogadores/jogadores";
import {Mercado} from "./mercado";
import {_} from "underscore";

export const colocarVenda = new ValidatedMethod({
  name: 'messages.colocarVenda',
  validate: new SimpleSchema({
    nome: {type: String, max: 140},
    preco: {type: Number, min: 1}
  }).validator(),
  run({nome, preco}) {
    if(!this.userId) {
      throw new Meteor.Error('usuario.nao.logado', 'Usuário não está logado');
    }

    const jogador = Jogadores.findOne({userId: this.userId});

    let inventarioIndex = _.findIndex(jogador.inventario, function (item) {
      return item.nome === nome;
    });

    if (inventarioIndex !== -1) {
      Jogadores.update({userId: this.userId}, {$pull : { inventario: { nome: {$eq: nome}}}});
      Mercado.insert({nome, preco});
    }
  }
});

export const comprar = new ValidatedMethod({
  name: 'messages.comprar',
  validate: new SimpleSchema({
    nome: {type: String, max: 140}
  }).validator(),
  run({nome}) {
    if(!this.userId) {
      throw new Meteor.Error('usuario.nao.logado', 'Usuário não está logado');
    }

    const jogador = Jogadores.findOne({userId: this.userId});

    const itemMercado = Mercado.findOne({nome});

    if(jogador.dinheiro < itemMercado.preco) {
      throw new Meteor.Error('usuario.nao.dinheiro', 'Usuário não tem dinheiro suficiente');
    }

    jogador.inventario.push({nome});

    Mercado.remove({nome});
  }
});