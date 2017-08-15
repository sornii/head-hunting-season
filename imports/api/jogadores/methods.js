import {ValidatedMethod} from "meteor/mdg:validated-method";
import {SimpleSchema} from "meteor/aldeed:simple-schema";
import {Jogadores} from "../jogadores/jogadores";

export const trocarNome = new ValidatedMethod({
  name: 'jogadores.trocarNome',
  validate: new SimpleSchema({
    nome: {type: String}
  }).validator(),
  run({nome}) {
    if(!this.userId) {
      throw new Meteor.Error('usuario.nao.logado', 'Usuário não está logado');
    }

    const jogador = Jogadores.findOne({nome});
    if (jogador) {
      throw new Meteor.Error('jogador.nome.existente', 'Este nome está sendo usado por alguém');
    }

    Jogadores.update({userId: this.userId}, {$set: {nome, redefinirNome: false}});
  }
});