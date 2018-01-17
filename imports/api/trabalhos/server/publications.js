import { Meteor } from 'meteor/meteor';
import { checarUsuario } from "../../utils";
import { Jogadores } from "../../jogadores/jogadores";
import { Trabalhos } from "../trabalhos";

Meteor.publishComposite('trabalhos.correntes', function () {
  return {
    find() {
      checarUsuario(this);

      const jogador = Jogadores.findOne({ userId: this.userId });
      return Trabalhos.find({ jogadorId: jogador._id, finalizado: false });
    }
  };
});
