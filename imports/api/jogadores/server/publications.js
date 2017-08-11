import {Meteor} from "meteor/meteor";
import {Jogadores} from "../jogadores";
import {Inventarios} from "../../inventarios/inventarios";

Meteor.publishComposite('meuperfil', function () {
  return {
    find() {
      const jogador = Jogadores.findOne({userId: this.userId});

      if (!jogador) {
        const jogadorId = Jogadores.insert({userId: this.userId});
        Inventarios.insert({jogadorId, nome: "Item X"});
        Inventarios.insert({jogadorId, nome: "Item Y"});
        Inventarios.insert({jogadorId, nome: "Item XY", quantidade: 2});
      }

      return Jogadores.find({userId: this.userId});
    },
    children: [
      {
        find(jogador) {
          return Inventarios.find({jogadorId: jogador._id});
        }
      }
    ]
  };
});