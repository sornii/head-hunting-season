let mensagemModal = null;

class MensagemModal {
  constructor(componente) {
    if (!mensagemModal) {
      mensagemModal = this;

      if (!componente) {
        componente = '#mensagemConteudoModal';
      }

      this.componente = componente;
    }

    return mensagemModal;
  }

  mostrar() {
    $(this.componente).modal('show');
  }

  identificar(componente) {
    this.componente = componente;
  }
}

export default MensagemModal;
