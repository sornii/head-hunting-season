let homemModal = null;

class HomemModal {
  constructor() {
    if (!homemModal) {
      homemModal = this;
    }

    /*this.params = null;*/
    this.componente = $('#homensDisponiveisModal');
    this.funcao = null;

    return homemModal;
  }

  mostrar() {
    this.componente.modal('show');
  }

  identificar(seletor) {
    this.componente = $(seletor);
  }

  definir(funcao/*, params*/) {
    this.funcao = funcao;
    /*this.params = params;*/
  }

  aplicar(homem) {
    this.funcao(homem/*, this.params*/);
    this.funcao = null;
  }
}

export default HomemModal;
