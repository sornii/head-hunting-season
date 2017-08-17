import { Meteor } from 'meteor/meteor';
import { Jogadores } from '../jogadores';
import { Inventarios } from '../../inventarios/inventarios';
import { Itens } from '../../itens/itens';

Meteor.publishComposite('meuperfil', function () {
  return {
    find() {
      const jogador = Jogadores.findOne({userId: this.userId});

      if (!jogador) {
        const user = Meteor.users.findOne({_id: this.userId});

        const jogadorId = Jogadores.insert({userId: this.userId, nome: user.username, localizacao: {coordinates: [0.0, 0.0]}});

        Inventarios.insert({jogadorId, itemId: Itens.findOne({nome: 'Item X'})._id});
        Inventarios.insert({jogadorId, itemId: Itens.findOne({nome: 'Item Y'})._id});
        Inventarios.insert({jogadorId, itemId: Itens.findOne({nome: 'Item XY'})._id, quantidade: 2});
      }

      return Jogadores.find({userId: this.userId});
    },
    children: [
      {
        find(jogador) {
          return Inventarios.find({jogadorId: jogador._id});
        },
        children: [
          {
            find(inventario) {
              return Itens.find({_id: inventario.itemId});
            }
          }
        ]
      }
    ]
  };
});