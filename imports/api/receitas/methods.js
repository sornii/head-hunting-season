import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Jogadores } from '../jogadores/jogadores';
import { Inventarios } from '../inventarios/inventarios';
import { adicionarInventario } from '../inventarios/methods';
import { Receitas } from './receitas';

import { checarUsuario } from '../utils';
import { Homens } from "../homens/homens";
import { Trabalhos } from "../trabalhos/trabalhos";

export const fabricarItem = new ValidatedMethod({
  name: 'receitas.fabricarItem',
  validate: new SimpleSchema({
    homemId: {type: String, regEx: SimpleSchema.RegEx.Id},
    receitaId: {type: String, regEx: SimpleSchema.RegEx.Id},
    quantidade: {type: Number, min: 1}
  }).validator(),
  run({homemId, receitaId, quantidade}) {
    checarUsuario(this);

    const dataInicio = new Date();
    const receita = Receitas.findOne({ _id: receitaId });

    if (!receita) {
      throw new Meteor.Error('receita.nao.existe', 'Receita não existe');
    }

    const jogador = Jogadores.findOne({ userId: this.userId });
    const jogadorId = jogador._id;
    const _profissao = receita._profissao;

    const homem = Homens.findOne({ _id: homemId, jogadorId, _profissao });

    if (!homem) {
      throw new Meteor.error('homem.nao.existe', 'Homem não existe');
    }

    if (homem.ocupado) {
      throw new Meteor.error('homem.ocupado', 'Homem ocupado');
    }

    const itensReceitaInventario = [];
    receita._itens.forEach(itemReceita => {
      itemReceita.quantidade = itemReceita.quantidade * quantidade;
      const inventario = Inventarios.findOne({
        itemId: itemReceita.itemId,
        jogadorId: jogador._id,
        quantidade: {$gte: itemReceita.quantidade}
      });
      if (!inventario) {
        throw new Meteor.Error('usuario.nao.itens', 'Usuário não possui os itens para a receita');
      }
      itensReceitaInventario.push({itemReceita, inventario});
    });

    itensReceitaInventario.forEach(irt => {
      const quantidadeRestante = irt.inventario.quantidade - irt.itemReceita.quantidade;
      if (quantidadeRestante === 0) {
        Inventarios.remove({_id: irt.inventario._id});
      } else {
        Inventarios.update({_id: irt.inventario._id}, {$inc: {quantidade: (0 - irt.itemReceita.quantidade)}});
      }
    });

    Homens.update({ _id: homemId }, { $set: { ocupado: true } });
    Trabalhos.insert({ jogadorId, dataInicio, homemId, receitaId, quantidade });
  }
});