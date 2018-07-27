
import {html, render} from 'lit-html';
class LitComponent {
  constructor() {
    this.container_ = document.createDocumentFragment();
    this.state = {};
    this.elements_ = [];
  }

  render() {
    render(this.getHtml(), this.container_);
    if (this.container_.childNodes.length !== 0) {
      this.onFirstCreation(this.container_);
      this.elements_ = Array.from(this.container_.childNodes);
    }
    return this.elements_;
  }

  getHtml() {
    throw new Error('Subclass has to implement getHtml()');
  }

  onFirstCreation(containerNode) {

  }

  setState(objOrCallback) {
    const newState = typeof objOrCallback === 'function' ?
        objOrCallback(this.state) :
        objOrCallback;
    this.state = Object.assign(this.state, newState);
    this.render();
  }
}

export default LitComponent;
