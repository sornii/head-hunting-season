import {Meteor} from "meteor/meteor";
import {Mercado} from "../mercado";

Meteor.publish('mercado', function () {
  return Mercado.find({});
});