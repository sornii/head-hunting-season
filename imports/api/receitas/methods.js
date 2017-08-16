import {ValidatedMethod} from "meteor/mdg:validated-method";
import {SimpleSchema} from "meteor/aldeed:simple-schema";
import {Jogadores} from "../jogadores/jogadores";
import {Inventarios} from "../inventarios/inventarios";
import {adicionarInventario} from "../inventarios/methods";
import {Receitas} from "./receitas";

export const fabricarItem = new ValidatedMethod({
  name: 'receitas.fabricarItem',
  validate: new SimpleSchema({
    receitaId: {type: String, regEx: SimpleSchema.RegEx.Id},
    quantidade: {type: Number, min: 1}
  }).validator(),
  run({receitaId, quantidade}) {
    if (!this.userId) {
      throw new Meteor.Error('usuario.nao.logado', 'Usuário não está logado');
    }

    const receita = Receitas.findOne({_id: receitaId});

    if (!receita) {
      throw new Meteor.Error('receita.nao.existe', 'Receita não existe');
    }

    const jogador = Jogadores.findOne({userId: this.userId});

    const itensReceitaInventario = [];

    receita.itens.forEach(itemReceita => {
      itemReceita.quantidade = itemReceita.quantidade * quantidade;
      const inventario = Inventarios.findOne({itemId: itemReceita.itemId, jogadorId: jogador._id, quantidade: {$gte: itemReceita.quantidade}});
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

    adicionarInventario(jogador._id, receita.itemId, quantidade);
  }
});