import { Meteor } from 'meteor/meteor';

import { Bandos } from '../bandos';
import { Criaturas } from '../../criaturas/criaturas';
import { Itens } from '../../itens/itens';

import { _ } from 'underscore';

Meteor.publishComposite('bandos', function () {
  return {
    find() {
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