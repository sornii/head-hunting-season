import { Meteor } from 'meteor/meteor';
import { SyncedCron } from 'meteor/percolate:synced-cron';
import { Itens } from '../../api/itens/itens';
import { Receitas } from '../../api/receitas/receitas';

Meteor.startup(() => {
  if (!Itens.findOne({nome: 'Item X'})) Itens.insert({nome: 'Item X'});
  if (!Itens.findOne({nome: 'Item Y'})) Itens.insert({nome: 'Item Y'});
  if (!Itens.findOne({nome: 'Item XY'})) Itens.insert({nome: 'Item XY'});

  const itemXy = Itens.findOne({nome: 'Item XY'});
  if (!Receitas.findOne({itemId: itemXy._id})) {
    const itemX = Itens.findOne({nome: 'Item X'});
    const itemY = Itens.findOne({nome: 'Item Y'});
    Receitas.insert({
      itemId: itemXy._id,
      itens: [{itemId: itemX._id, quantidade: 1}, {itemId: itemY._id, quantidade: 1}]
    });
  }
  SyncedCron.start();
});