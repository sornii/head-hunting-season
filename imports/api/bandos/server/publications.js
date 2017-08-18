import { Meteor } from 'meteor/meteor';

import { Bandos } from '../bandos';
import { Jogadores } from '../../jogadores/jogadores';
import { Criaturas } from '../../criaturas/criaturas';
import { Itens } from '../../itens/itens';

import { _ } from 'underscore';

import { checarUsuario } from '../../utils';

Meteor.publishComposite('bandos', function () {
  return {
    find() {
      checarUsuario(this);

      return Bandos.find({});
    },
    children: [
      {
        find(bando) {
          return Criaturas.find({_id: {$in: _.map(bando._criaturas, criatura => criatura.criaturaId)}});
        },
        children: [
          {
            find(criatura) {
              return Itens.find({_id: {$in: _.map(criatura._itens, item => item.itemId)}});
            }
          }
        ]
      }
    ]
  };
});

Meteor.publishComposite('bandos.proximos', function () {
  return {
    find() {
      checarUsuario(this);

      const jogador = Jogadores.findOne({userId: this.userId});

      return Bandos.find({
        localizacao: {
          $near: {
            $geometry: jogador.localizacao,
            $minDistance: 0,
            $maxDistance: 2000
          }
        }
      });
    },
    children: [
      {
        find(bando) {
          return Criaturas.find({_id: {$in: _.map(bando._criaturas, criatura => criatura.criaturaId)}});
        },
        children: [
          {
            find(criatura) {
              return Itens.find({_id: {$in: _.map(criatura._itens, item => item.itemId)}});
            }
          }
        ]
      }
    ]
  };
});