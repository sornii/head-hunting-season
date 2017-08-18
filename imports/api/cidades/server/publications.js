import { Meteor } from 'meteor/meteor';

import { Cidades } from '../cidades';
import { Jogadores } from '../../jogadores/jogadores';

import { checarUsuario } from '../../utils';

Meteor.publishComposite('cidades', function () {
  return {
    find() {
      checarUsuario(this);

      return Cidades.find({});
    }
  };
});

Meteor.publishComposite('cidades.proximos', function () {
  return {
    find() {
      checarUsuario(this);

      const jogador = Jogadores.findOne({userId: this.userId});

      return Cidades.find({
        localizacao: {
          $near: {
            $geometry: jogador.cidade().localizacao,
            $minDistance: 0,
            $maxDistance: 8000
          }
        }
      });
    }
  };
});