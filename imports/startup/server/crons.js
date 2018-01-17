import { SyncedCron } from 'meteor/percolate:synced-cron';

import { Trabalhos } from "../../api/trabalhos/trabalhos";
import { Receitas } from "../../api/receitas/receitas";
import { Jogadores } from "../../api/jogadores/jogadores";

import moment from 'moment';
import { Homens } from "../../api/homens/homens";
import { adicionarInventario } from "../../api/inventarios/methods";

SyncedCron.config({
  collectionName: 'crons'
});

SyncedCron.add({
  name: 'Atualizar trabalhos',
  schedule(parser) {
    return parser.text('every 1 second');
  },
  job() {
    const trabalhos = Trabalhos.find({ finalizado: false }).fetch();

    trabalhos.forEach(function (trabalho) {
      if (trabalho.precisaFinalizar()) {
        const homem = trabalho.homem();

        Trabalhos.update({ _id: trabalho._id }, { $set: { finalizado: true } });
        Homens.update({ _id: homem._id }, { $set: { ocupado: false } });

        adicionarInventario(trabalho.jogadorId, trabalho.receita().itemId, trabalho.quantidade);
      }
    });
  }
});
