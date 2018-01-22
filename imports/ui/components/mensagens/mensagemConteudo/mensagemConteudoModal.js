let mensagemConteudoModal = null;

class MensagemConteudoModal {
  constructor(componente) {
    if (!mensagemConteudoModal) {
      mensagemConteudoModal = this;

      if (!componente) {
        componente = '#mensagemConteudoModal';
      }

      this.componente = componente;
      this.mensagem = new ReactiveVar({});
    }

    return mensagemConteudoModal;
  }

  mostrar(mensagem) {
    this.mensagem.set(mensagem);
    $(this.componente).modal('show');
  }

  identificar(componente) {
    this.componente = componente;
  }
}

export default MensagemConteudoModal;
