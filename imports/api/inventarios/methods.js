import Inventarios from './inventarios';

export const adicionarInventario = function (jogadorId, itemId, quantidade) {
  const inventario = Inventarios.findOne({jogadorId, itemId});
  if (inventario) {
    Inventarios.update({jogadorId, itemId}, {$inc: {quantidade}});
  } else {
    Inventarios.insert({jogadorId, itemId, quantidade});
  }
};