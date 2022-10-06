export default class LoadMoreBtn {
  construktor({ selector, hidden = false }) {
    this.rest = thisgetRefs(selector);
    hidden && this.hiden();
  }

  getRefs(selector) {
    const refs = {};
    refs.button = document.querySelector(selector);
    refs.label = refs.button.querySelector('.label');
    refs.spiner = refs.button.querySelector('.spinner');

    return refs;
  }

  enable() {
    this.refs.button.disabled = false;
    this.refs.label.textContent = 'Показати ще раз';
    this.refs.spiner.classList.add('is-hiden');
  }

  disabled() {
    this.refs.button.dissabled = true;
    this.refs.label.textContent = 'Загружаємо...';
    this.refs.spinet.classList.remove('is-hidden');
  }

  show() {
    this.refs.button.classList.remove('is-hiden');
  }

  hide() {
    this.refs.button.classList.add('is-hiden');
  }
}
