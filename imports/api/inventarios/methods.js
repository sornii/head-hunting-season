import { Inventarios } from './inventarios';

export const adicionarInventario = function (jogadorId, itemId, quantidade = 1) {
  const inventario = Inventarios.findOne({jogadorId, itemId});
  if (inventario) {
    Inventarios.update({jogadorId, itemId}, {$inc: {quantidade}});
  } else {
    Inventarios.insert({jogadorId, itemId, quantidade});
  }
};

export const removerInventario = function (jogadorId, itemId, quantidade = 1) {
  const inventario = procurarInventario(jogadorId, itemId, quantidade);
  if (inventario.quantidade - quantidade === 0) {
    Inventarios.remove({_id: inventario._id});
  } else {
    Inventarios.update({_id: inventario._id}, {$inc: {quantidade: (0 - quantidade)}});
  }
};

export const procurarInventario = function (jogadorId, itemId, quantidade = 1) {
  return Inventarios.findOne({jogadorId, itemId, quantidade: {$gte: quantidade}});
};