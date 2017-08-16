import {ValidatedMethod} from "meteor/mdg:validated-method";
import {SimpleSchema} from "meteor/aldeed:simple-schema";
import {Jogadores} from "../jogadores/jogadores";
import {Inventarios} from "../inventarios/inventarios";
import {adicionarInventario} from "../inventarios/methods";
import {Mercado} from "./mercado";

export const colocarVenda = new ValidatedMethod({
  name: 'messages.colocarVenda',
  validate: new SimpleSchema({
    inventarioId: {type: String, regEx: SimpleSchema.RegEx.Id},
    preco: {type: Number, min: 1},
    quantidade: {type: Number, min: 1}
  }).validator(),
  run({inventarioId, preco, quantidade}) {
    if (!this.userId) {
      throw new Meteor.Error('usuario.nao.logado', 'Usuário não está logado');
    }

    const jogador = Jogadores.findOne({userId: this.userId});
    const inventario = Inventarios.findOne({_id: inventarioId, jogadorId: jogador._id});

    if (!inventario) {
      throw new Meteor.Error('usuario.nao.item', 'Usuário não possui o item');
    }

    const quantidadeRestante = inventario.quantidade - quantidade;
    if (quantidadeRestante < 0) {
      throw new Meteor.Error('usuario.nao.quantidade', 'Usuário não possui a quantidade');
    }

    if (quantidadeRestante === 0) {
      Inventarios.remove({_id: inventarioId});
    } else {
      Inventarios.update({_id: inventarioId}, {$inc: {quantidade: (0 - quantidade)}});
    }

    Mercado.insert({quantidade, preco, jogadorId: jogador._id, itemId: inventario.itemId});
  }
});

export const comprar = new ValidatedMethod({
  name: 'messages.comprar',
  validate: new SimpleSchema({
    mercadoId: {type: String, regEx: SimpleSchema.RegEx.Id},
    quantidade: {type: Number, min: 1}
  }).validator(),
  run({mercadoId, quantidade}) {
    if (!this.userId) {
      throw new Meteor.Error('usuario.nao.logado', 'Usuário não está logado');
    }

    const jogador = Jogadores.findOne({userId: this.userId});
    const mercado = Mercado.findOne({_id: mercadoId});

    if (!mercado) {
      throw new Meteor.Error('mercado.nao.existe', 'O item selecionado já foi vendido ou não existe');
    }

    const quantidadeRestante = mercado.quantidade - quantidade;

    if (quantidadeRestante < 0) {
      throw new Meteor.Error('mercado.nao.quantidade', 'Não está disponível essa quantidade de itens à venda');
    }

    let precoTotal = mercado.precoTotal(quantidade);

    if (jogador.dinheiro < precoTotal) {
      throw new Meteor.Error('usuario.nao.dinheiro', 'Usuário não tem dinheiro suficiente');
    }

    if (quantidadeRestante === 0) {
      Mercado.remove({_id: mercadoId});
    } else {
      Mercado.update({_id: mercadoId}, {$inc: {quantidade: (0 - quantidade)}});
    }

    adicionarInventario(jogador._id, mercado.itemId, quantidade);

    Jogadores.update({_id: jogador._id}, {$inc: {dinheiro: (0 - precoTotal)}});
    Jogadores.update({_id: mercado.jogadorId}, {$inc: {dinheiro: precoTotal}});
  }
});