import {Meteor} from 'meteor/meteor';
import {SyncedCron} from 'meteor/percolate:synced-cron';
import {Itens} from '../../api/itens/itens';

Meteor.startup(() => {
  if (!Itens.findOne({nome: 'Item X'})) Itens.insert({nome: 'Item X'});
  if (!Itens.findOne({nome: 'Item Y'})) Itens.insert({nome: 'Item Y'});
  if (!Itens.findOne({nome: 'Item XY'})) Itens.insert({nome: 'Item XY'});
  SyncedCron.start();
});