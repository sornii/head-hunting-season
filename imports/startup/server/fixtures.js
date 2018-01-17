import { Meteor } from 'meteor/meteor';
import { SyncedCron } from 'meteor/percolate:synced-cron';
import { Itens } from '../../api/itens/itens';
import { Receitas } from '../../api/receitas/receitas';
import { Homens } from "../../api/homens/homens";
import Profissoes from "../../api/profissoes/profissoes";

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
      _itens: [{itemId: itemX._id, quantidade: 1}, {itemId: itemY._id, quantidade: 1}],
      _profissao: 'alquimista',
      segundos: 20
    });
  }

  if (!Homens.findOne({nome: 'Homem A'})) Homens.insert({ nome: 'Homem A', _profissao: 'alquimista'});
  SyncedCron.start();
});