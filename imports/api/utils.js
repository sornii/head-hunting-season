import { Meteor } from 'meteor/meteor';

export const checarUsuario = function (_this) {
  if (!_this.userId) {
    throw new Meteor.Error('usuario.nao.logado', 'Usuário não está logado');
  }
};