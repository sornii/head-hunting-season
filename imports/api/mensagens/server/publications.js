import { Meteor } from 'meteor/meteor';

import { Mensagens } from '../mensagens';
import { checarUsuario } from '../../utils';
import { Jogadores } from "../../jogadores/jogadores";

Meteor.publishComposite('homens.contratados', function () {
  return {
    find() {
      checarUsuario(this);

      const jogador = Jogadores.findOne({ userId: this.userId });
      return Mensagens.find({ jogadorId: jogador._id });
    }
  };
});
