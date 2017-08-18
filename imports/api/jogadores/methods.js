import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Jogadores } from '../jogadores/jogadores';

import { checarUsuario } from '../utils';

const schema = Jogadores.simpleSchema().schema();

export const trocarNome = new ValidatedMethod({
  name: 'jogadores.trocarNome',
  validate: new SimpleSchema({
    nome: schema.nome
  }).validator(),
  run({nome}) {
    checarUsuario(this);

    const jogador = Jogadores.findOne({nome});
    if (jogador) {
      throw new Meteor.Error('jogador.nome.existente', 'Este nome está sendo usado por alguém');
    }

    Jogadores.update({userId: this.userId}, {$set: {nome, redefinirNome: false}});
  }
});