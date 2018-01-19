let homemModal = null;

class HomemModal {
  constructor(componente) {
    if (!homemModal) {
      homemModal = this;
    }

    if (!componente) {
      componente = '#homensDisponiveisModal';
    }

    this.componente = componente;
    this.funcao = null;

    return homemModal;
  }

  mostrar() {
    $(this.componente).modal('show');
  }

  identificar(componente) {
    this.componente = componente;
  }

  definir(funcao) {
    this.funcao = funcao;
  }

  aplicar(homem) {
    this.funcao(homem);
    this.funcao = null;
  }
}

export default HomemModal;
