import {Meteor} from "meteor/meteor";
import {Mercado} from "../mercado";
import {Itens} from "../../itens/itens";

Meteor.publishComposite('mercado', function () {
  return {
    find() {
      return Mercado.find({});
    },
    children: [
      {
        find(mercado) {
          return Itens.find({_id: mercado.itemId});
        }
      }
    ]
  }
});